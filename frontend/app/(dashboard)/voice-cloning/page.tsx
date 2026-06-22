'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Upload, Play, Pause, Trash2, Save, AudioLines, Loader2, Check, FileAudio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { WaveformVisualizer } from '@/components/audio/waveform-visualizer';
import { StaggerContainer, StaggerItem } from '@/components/animations/stagger';
import { useToastContext } from '@/components/ui/toast';
import { cn } from '@/lib/utils';

const mockVoices = [
  { id: '1', name: 'Warm Narrator', created: '2 days ago', duration: '0:45' },
  { id: '2', name: 'Deep Male', created: '1 week ago', duration: '0:32' },
  { id: '3', name: 'Soft Female', created: '2 weeks ago', duration: '0:28' },
];

type SaveState = 'idle' | 'saving' | 'saved';

export default function VoiceCloningPage() {
  const { toast } = useToastContext();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [voiceName, setVoiceName] = useState('');
  const [referenceText, setReferenceText] = useState('');
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isRecording) return;
    const interval = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${String(sec).padStart(2, '0')}`;
  };

  const handleSave = async () => {
    if (!voiceName.trim()) {
      toast('Please enter a voice name', 'warning');
      return;
    }
    setSaveState('saving');
    await new Promise((r) => setTimeout(r, 1500));
    setSaveState('saved');
    toast('Voice saved successfully!', 'success');
    setTimeout(() => {
      setSaveState('idle');
      setVoiceName('');
      setReferenceText('');
      setUploadedFile(null);
    }, 1500);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setUploadedFile(file.name);
      toast('Audio file loaded', 'info');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-ink">Voice Cloning Studio</h1>
        <p className="font-body text-copper-600 mt-1">Create custom voices from reference audio recordings</p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".wav,.mp3,.flac,audio/wav,audio/mpeg,audio/flac"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setUploadedFile(file.name);
            toast('Audio file loaded', 'info');
          }
          e.target.value = '';
        }}
      />

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Upload / Record */}
        <div>
          <div className="card-vintage p-6">
            <h3 className="font-ui font-semibold text-ink mb-4 flex items-center gap-2">
              <Mic className="h-4 w-4 text-amber-500" />
              Reference Audio
            </h3>

            {/* Drop zone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={cn(
                'border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer mb-6',
                isDragging
                  ? 'border-amber-400 bg-amber-50/40 scale-[1.02]'
                  : 'border-cream hover:border-amber-300 hover:bg-amber-50/20'
              )}
            >
              {uploadedFile ? (
                <div className="flex items-center justify-center gap-2">
                  <FileAudio className="h-8 w-8 text-amber-500" />
                  <p className="font-ui text-sm text-ink">{uploadedFile}</p>
                </div>
              ) : (
                <>
                  <Upload className={cn('h-10 w-10 mx-auto mb-3', isDragging ? 'text-amber-500' : 'text-copper-300')} />
                  <p className="font-ui font-medium text-ink mb-1">
                    {isDragging ? 'Drop audio here' : 'Drop audio file here'}
                  </p>
                  <p className="text-sm font-ui text-copper-400">WAV, MP3, or FLAC (max 30s recommended)</p>
                </>
              )}
            </div>

            <div className="text-center mb-6">
              <span className="text-sm font-ui text-copper-400">or</span>
            </div>

            {/* Record button */}
            <div className="text-center mb-6">
              <div className="relative inline-flex">
                <AnimatePresence>
                  {isRecording && (
                    <>
                      <motion.div
                        initial={{ opacity: 0.8, scale: 1 }}
                        animate={{ opacity: 0, scale: 2.4 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                        className="absolute inset-0 rounded-full bg-red-500"
                      />
                      <motion.div
                        initial={{ opacity: 0.6, scale: 1 }}
                        animate={{ opacity: 0, scale: 2 }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5, ease: 'easeOut' }}
                        className="absolute inset-0 rounded-full bg-red-500"
                      />
                    </>
                  )}
                </AnimatePresence>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsRecording(!isRecording);
                    if (!isRecording) {
                      setRecordingTime(0);
                      setUploadedFile(null);
                    }
                  }}
                  className={cn(
                    'relative h-20 w-20 rounded-full flex items-center justify-center transition-colors z-10',
                    isRecording
                      ? 'bg-red-500 shadow-lg shadow-red-500/30'
                      : 'bg-gradient-gold shadow-glow-amber'
                  )}
                >
                  {isRecording ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="h-6 w-6 bg-white rounded-sm"
                    />
                  ) : (
                    <Mic className="h-8 w-8 text-white" />
                  )}
                </motion.button>
              </div>
              <p className="text-sm font-ui text-copper-500 mt-3">
                {isRecording ? (
                  <span className="font-mono text-red-500 font-medium">{formatTime(recordingTime)} — Click to stop</span>
                ) : (
                  'Click to record'
                )}
              </p>
            </div>

            {/* Waveform preview */}
            <div className="bg-ink rounded-xl p-4 mb-6">
              <WaveformVisualizer bars={32} className="h-10" isPlaying={isRecording} />
              {isRecording && (
                <p className="text-center text-xs font-mono text-red-400 mt-2">
                  {formatTime(recordingTime)}
                </p>
              )}
            </div>

            {/* Voice name */}
            <div className="mb-4">
              <label className="block text-sm font-ui font-medium text-ink mb-2">Voice Name</label>
              <Input
                placeholder="e.g., Warm Narrator"
                value={voiceName}
                onChange={(e) => setVoiceName(e.target.value)}
              />
            </div>

            {/* Reference text */}
            <div className="mb-6">
              <label className="block text-sm font-ui font-medium text-ink mb-2">
                Reference Text <span className="text-copper-400">(what was spoken in the audio)</span>
              </label>
              <textarea
                className="input-vintage min-h-[100px] resize-none"
                placeholder="Enter the text that was spoken in the reference recording..."
                value={referenceText}
                onChange={(e) => setReferenceText(e.target.value)}
              />
            </div>

            <Button
              className={cn('w-full', saveState !== 'saved' && 'btn-vintage')}
              onClick={handleSave}
              disabled={saveState !== 'idle'}
            >
              <AnimatePresence mode="wait">
                {saveState === 'idle' && (
                  <motion.span key="idle" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Save className="h-4 w-4" />
                    Save Voice
                  </motion.span>
                )}
                {saveState === 'saving' && (
                  <motion.span key="saving" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </motion.span>
                )}
                {saveState === 'saved' && (
                  <motion.span key="saved" className="flex items-center gap-2 text-green-600" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                    <Check className="h-4 w-4" />
                    Saved!
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>

        {/* Right: Saved voices */}
        <div>
          <div className="card-vintage">
            <div className="p-4 border-b border-cream/50">
              <h3 className="font-ui font-semibold text-ink flex items-center gap-2">
                <AudioLines className="h-4 w-4 text-amber-500" />
                Saved Voices
              </h3>
            </div>
            <StaggerContainer className="divide-y divide-cream/50">
              {mockVoices.map((voice) => (
                <StaggerItem key={voice.id}>
                  <div className="p-4 flex items-center gap-4 hover:bg-amber-50/20 transition-colors group">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setPlayingId(playingId === voice.id ? null : voice.id)}
                      className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center hover:bg-amber-200 transition-colors"
                    >
                      {playingId === voice.id ? (
                        <Pause className="h-4 w-4 text-amber-600" />
                      ) : (
                        <Play className="h-4 w-4 text-amber-600 ml-0.5" />
                      )}
                    </motion.button>
                    <div className="flex-1 min-w-0">
                      <p className="font-ui font-medium text-ink truncate">{voice.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-ui text-copper-400">{voice.created}</span>
                        <span className="text-xs font-mono text-copper-400">{voice.duration}</span>
                      </div>
                    </div>
                    {playingId === voice.id && (
                      <WaveformVisualizer bars={12} className="h-6 flex-1 max-w-[80px]" />
                    )}
                    <Button variant="ghost" size="icon" className="text-copper-400 hover:text-error opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Info card */}
          <div className="card-vintage p-6 mt-6 bg-amber-50/30 border-amber-200/50">
            <h4 className="font-ui font-semibold text-ink mb-2">Tips for Best Results</h4>
            <ul className="space-y-2 text-sm font-body text-copper-600">
              {[
                'Use 10-30 seconds of clean audio without background noise',
                'Speak naturally with consistent pacing',
                'Include the reference text for better voice matching',
                'WAV format at 44.1kHz produces the best results',
              ].map((tip, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-2"
                >
                  <span className="text-amber-500 mt-1">•</span>
                  {tip}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
