# VoiceForge - TTS + Video Engine (Kaggle)
# 
# This notebook runs the complete VoiceForge inference pipeline:
# - Fish Audio S2 Pro for voice cloning + TTS
# - Remotion for video rendering with caption highlighting
# - Appwrite for file storage
#
# Steps:
# 1. Upload this file to Kaggle as a notebook
# 2. Enable GPU (Settings -> Accelerator -> GPU T4 x2)
# 3. Run all cells
# 4. Copy the ngrok URL to your .env as KAGGLE_ENGINE_URL

# =============================================================================
# Cell 1: Install Dependencies
# =============================================================================
!git clone https://github.com/fishaudio/fish-speech.git
!cd fish-speech && pip install -e .[cu129]
!pip install remotion @remotion/cli @remotion/captions
!pip install fastapi uvicorn pyngrok httpx numpy soundfile Pillow
!pip install appwrite
!apt-get update && apt-get install -y ffmpeg

# =============================================================================
# Cell 2: Download Model Weights
# =============================================================================
import os

HF_TOKEN = os.environ.get('HF_TOKEN', '')
!huggingface-cli login --token {HF_TOKEN}
!cd fish-speech && hf download fishaudio/s2-pro --local-dir checkpoints/s2-pro

# =============================================================================
# Cell 3: Configure Appwrite
# =============================================================================
from appwrite import Client, Storage, Permission, Role, ID

appwrite_client = Client()
appwrite_client.set_endpoint('https://cloud.appwrite.io/v1')
appwrite_client.set_project('YOUR_PROJECT_ID')  # Replace
appwrite_client.set_key('YOUR_API_KEY')  # Replace

appwrite_storage = Storage(appwrite_client)

BUCKETS = {
    'audio': 'audio',
    'videos': 'videos',
}

print('Appwrite configured')

# =============================================================================
# Cell 4: Upload Helper
# =============================================================================
def upload_to_appwrite(bucket_id, file_path, user_id):
    with open(file_path, 'rb') as f:
        result = appwrite_storage.create_file(
            bucket_id=bucket_id,
            file_id=ID.unique(),
            file=f,
            permissions=[
                Permission.read(Role.user(user_id)),
                Permission.write(Role.user(user_id))
            ]
        )
    return result['$id']

# =============================================================================
# Cell 5: TTS Functions
# =============================================================================
import subprocess
import numpy as np
from pathlib import Path

WORK_DIR = Path('/kaggle/working/voiceforge')
WORK_DIR.mkdir(exist_ok=True)

FISH_DIR = Path('/kaggle/working/fish-speech')
CHECKPOINT = FISH_DIR / 'checkpoints/s2-pro'

def extract_voice_tokens(audio_path):
    output_npy = WORK_DIR / 'ref_tokens.npy'
    subprocess.run([
        'python', str(FISH_DIR / 'fish_speech/models/dac/inference.py'),
        '-i', audio_path,
        '--checkpoint-path', str(CHECKPOINT / 'codec.pth'),
        '--output', str(output_npy)
    ], capture_output=True, text=True, cwd=str(FISH_DIR))
    return {'tokens_path': str(output_npy), 'status': 'success'}

def generate_tts(text, tokens_path, chapter_num):
    codes_path = WORK_DIR / f'codes_{chapter_num}.npy'
    output_wav = WORK_DIR / f'chapter_{chapter_num}.wav'
    
    subprocess.run([
        'python', str(FISH_DIR / 'fish_speech/models/text2semantic/inference.py'),
        '--text', text,
        '--prompt-tokens', tokens_path,
        '--output', str(codes_path)
    ], capture_output=True, text=True, cwd=str(FISH_DIR))
    
    subprocess.run([
        'python', str(FISH_DIR / 'fish_speech/models/dac/inference.py'),
        '-i', str(codes_path),
        '--output', str(output_wav)
    ], capture_output=True, text=True, cwd=str(FISH_DIR))
    
    return {'status': 'success', 'audio_path': str(output_wav), 'chapter_number': chapter_num}

# =============================================================================
# Cell 6: Video Rendering
# =============================================================================
import json

def render_video(audio_path, captions, aspect_ratio='16:9', background_color='#ffffff',
                 caption_style='tiktok', title='Chapter 1', subtitle=''):
    ratios = {'16:9': (1920, 1080), '9:16': (1080, 1920), '1:1': (1080, 1080)}
    width, height = ratios.get(aspect_ratio, (1920, 1080))
    
    props = {
        'audioUrl': audio_path, 'captions': captions,
        'aspectRatio': aspect_ratio, 'backgroundColor': background_color,
        'captionStyle': caption_style, 'title': title, 'subtitle': subtitle,
    }
    
    props_file = WORK_DIR / 'remotion_props.json'
    with open(props_file, 'w') as f:
        json.dump(props, f)
    
    output_video = WORK_DIR / f'video_{aspect_ratio.replace(":", "-")}.mp4'
    comp_id = f'AudiobookVideo-{aspect_ratio.replace(":", "-")}'
    
    subprocess.run([
        'npx', 'remotion', 'render', 'src/index.ts', comp_id,
        str(output_video), '--props', str(props_file), '--gl', 'angle',
    ], capture_output=True, text=True, cwd=str(WORK_DIR / 'video-service'))
    
    return {'status': 'success', 'video_path': str(output_video), 'aspect_ratio': aspect_ratio}

# =============================================================================
# Cell 7: Start Fish Audio Server (background)
# =============================================================================
import threading
import time

def start_fish_server():
    subprocess.run([
        'python', str(FISH_DIR / 'tools/api_server.py'),
        '--llama-checkpoint-path', str(CHECKPOINT),
        '--decoder-checkpoint-path', str(CHECKPOINT / 'codec.pth'),
        '--decoder-config-name', 'modded_dac_vq',
        '--listen', '0.0.0.0:8888', '--compile'
    ])

fish_thread = threading.Thread(target=start_fish_server, daemon=True)
fish_thread.start()
time.sleep(15)
print('Fish Audio S2 server started')

# =============================================================================
# Cell 8: API Server
# =============================================================================
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
import uuid

app = FastAPI(title='VoiceForge Engine')
voice_store = {}

@app.post('/api/voice/extract-tokens')
async def api_extract_tokens(
    reference_audio: UploadFile = File(...),
    name: str = Form('default'),
    user_id: str = Form(...),
):
    audio_path = WORK_DIR / f'ref_{uuid.uuid4()}.wav'
    with open(audio_path, 'wb') as f:
        f.write(await reference_audio.read())
    
    result = extract_voice_tokens(str(audio_path))
    voice_id = str(uuid.uuid4())
    voice_store[voice_id] = result['tokens_path']
    
    return {'voice_id': voice_id, 'status': 'success'}

@app.post('/api/tts/generate')
async def api_generate_tts(
    text: str = Form(...),
    voice_id: str = Form(...),
    chapter_number: int = Form(1),
    user_id: str = Form(''),
):
    if voice_id not in voice_store:
        raise HTTPException(404, 'Voice not found')
    
    result = generate_tts(text, voice_store[voice_id], chapter_number)
    
    audio_file_id = ''
    if user_id:
        try:
            audio_file_id = upload_to_appwrite('audio', result['audio_path'], user_id)
        except Exception as e:
            print(f'Upload failed: {e}')
    
    return {'audio_path': result['audio_path'], 'audio_file_id': audio_file_id, 'status': 'success'}

@app.post('/api/video/render')
async def api_render_video(
    audio_path: str = Form(...),
    captions_json: str = Form('[]'),
    aspect_ratio: str = Form('16:9'),
    background_color: str = Form('#ffffff'),
    caption_style: str = Form('tiktok'),
    title: str = Form('Chapter 1'),
    user_id: str = Form(''),
):
    captions = json.loads(captions_json)
    result = render_video(audio_path, captions, aspect_ratio, background_color, caption_style, title)
    
    video_file_id = ''
    if user_id:
        try:
            video_file_id = upload_to_appwrite('videos', result['video_path'], user_id)
        except Exception as e:
            print(f'Upload failed: {e}')
    
    return {'video_path': result['video_path'], 'video_file_id': video_file_id, 'status': 'success'}

@app.get('/api/health')
async def health():
    return {'status': 'healthy', 'services': {'tts': 'fish-audio-s2-pro', 'video': 'remotion'}}

# =============================================================================
# Cell 9: Expose via ngrok
# =============================================================================
!pip install pyngrok

from pyngrok import ngrok

ngrok.kill()
public_url = ngrok.connect(8889)
print(f'\n========================================')
print(f'  VoiceForge Engine URL:')
print(f'  {public_url}')
print(f'========================================')
print(f'\nAdd to your .env:')
print(f'  KAGGLE_ENGINE_URL={public_url}')

# =============================================================================
# Cell 10: Start Server
# =============================================================================
import uvicorn
uvicorn.run(app, host='0.0.0.0', port=8889)
