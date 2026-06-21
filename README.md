# VoiceForge

AI-powered audiobook creation platform. Transform books into immersive audiobooks with voice cloning, then generate captioned videos with text highlighting.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    APPWRITE (Free BaaS)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │     AUTH     │  │   DATABASE   │  │   STORAGE    │   │
│  │ Email/Pass   │  │  Documents   │  │ Audio/Video  │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
└──────────────────────────┬──────────────────────────────┘
                           │
┌──────────────┐    ┌──────┴───────┐    ┌──────────────┐
│   VERCEL     │◀──▶│   APPWRITE   │◀──▶│   KAGGLE     │
│   Frontend   │    │   Backend    │    │  TTS + Video │
│   (Next.js)  │    │   (BaaS)    │    │  (Free GPU)  │
└──────────────┘    └──────────────┘    └──────────────┘
```

**Total cost: $0/month** (all free tiers)

## Quick Start

```bash
# 1. Clone
git clone https://github.com/youruser/voiceforge.git
cd voiceforge

# 2. Install frontend
cd frontend
npm install

# 3. Set up environment
cp ../.env.example ../.env.local
# Edit .env.local with your Appwrite credentials

# 4. Run development
npm run dev
```

## Setup Guide

### 1. Appwrite (Free)
1. Create account at [cloud.appwrite.io](https://cloud.appwrite.io)
2. Create project "VoiceForge"
3. Add Web platform (localhost for dev, your domain for prod)
4. Create database with collections: books, voices, audiobooks, chapters, videos
5. Create storage buckets: books, voices, audio, videos
6. Generate API key with databases + files + users scopes

### 2. Kaggle (Free GPU)
1. Upload `kaggle-notebook/tts_engine.py` as a notebook
2. Enable GPU (Settings -> Accelerator -> GPU T4 x2)
3. Set environment variable: `HF_TOKEN` = your HuggingFace token
4. Update Appwrite credentials in notebook cells
5. Run all cells
6. Copy ngrok URL to your `.env.local` as `KAGGLE_ENGINE_URL`

### 3. Vercel (Free)
1. Push to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Set environment variables
4. Deploy

## Tech Stack

- **Frontend**: Next.js 14, Tailwind CSS, Appwrite SDK
- **Backend**: Appwrite (Auth, Database, Storage)
- **TTS**: Fish Audio S2 Pro (via Kaggle GPU)
- **Video**: Remotion (via Kaggle GPU)
- **Hosting**: Vercel (frontend), Kaggle (compute)
