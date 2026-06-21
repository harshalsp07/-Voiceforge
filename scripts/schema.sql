-- VoiceForge Database Schema for Aiven PostgreSQL

-- Users (synced from Clerk via webhooks)
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    subscription_tier TEXT DEFAULT 'free',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Books
CREATE TABLE IF NOT EXISTS books (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    author TEXT,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL,
    total_chapters INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Voices (cloned voices)
CREATE TABLE IF NOT EXISTS voices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    reference_audio_url TEXT NOT NULL,
    voice_tokens JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audiobooks
CREATE TABLE IF NOT EXISTS audiobooks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    book_id UUID REFERENCES books(id) ON DELETE CASCADE,
    voice_id UUID REFERENCES voices(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'pending',
    total_duration_seconds INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audiobook Chapters
CREATE TABLE IF NOT EXISTS audiobook_chapters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    audiobook_id UUID REFERENCES audiobooks(id) ON DELETE CASCADE,
    chapter_number INTEGER NOT NULL,
    title TEXT,
    text_content TEXT,
    audio_url TEXT,
    duration_seconds INTEGER,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Videos
CREATE TABLE IF NOT EXISTS videos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    audiobook_id UUID REFERENCES audiobooks(id) ON DELETE CASCADE,
    aspect_ratio TEXT DEFAULT '16:9',
    background_url TEXT,
    background_color TEXT DEFAULT '#ffffff',
    caption_style TEXT DEFAULT 'tiktok',
    status TEXT DEFAULT 'pending',
    video_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- LLM API Keys (user-provided)
CREATE TABLE IF NOT EXISTS llm_providers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
    provider TEXT NOT NULL,
    api_key_encrypted TEXT NOT NULL,
    base_url TEXT,
    model_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_books_user_id ON books(user_id);
CREATE INDEX IF NOT EXISTS idx_voices_user_id ON voices(user_id);
CREATE INDEX IF NOT EXISTS idx_audiobooks_book_id ON audiobooks(book_id);
CREATE INDEX IF NOT EXISTS idx_audiobook_chapters_audiobook_id ON audiobook_chapters(audiobook_id);
CREATE INDEX IF NOT EXISTS idx_videos_audiobook_id ON videos(audiobook_id);
CREATE INDEX IF NOT EXISTS idx_llm_providers_user_id ON llm_providers(user_id);
