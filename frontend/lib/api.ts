const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    path: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Request failed' }));
      throw new Error(error.detail || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Books
  async getBooks() {
    return this.request<any[]>('/api/books');
  }

  async getBook(id: string) {
    return this.request<any>(`/api/books/${id}`);
  }

  async uploadBook(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${this.baseUrl}/api/books/upload`, {
      method: 'POST',
      body: formData,
    });
    return response.json();
  }

  async deleteBook(id: string) {
    return this.request<void>(`/api/books/${id}`, { method: 'DELETE' });
  }

  // Voices
  async getVoices() {
    return this.request<any[]>('/api/voice');
  }

  async cloneVoice(referenceAudio: File, name: string, referenceText: string) {
    const formData = new FormData();
    formData.append('reference_audio', referenceAudio);
    formData.append('name', name);
    formData.append('reference_text', referenceText);
    const response = await fetch(`${this.baseUrl}/api/voice/clone`, {
      method: 'POST',
      body: formData,
    });
    return response.json();
  }

  async deleteVoice(id: string) {
    return this.request<void>(`/api/voice/${id}`, { method: 'DELETE' });
  }

  // TTS (routed to Kaggle via backend)
  async generateTTS(bookId: string, voiceId: string, chapterNumber: number, text: string) {
    return this.request<any>('/api/tts/generate', {
      method: 'POST',
      body: JSON.stringify({
        book_id: bookId,
        voice_id: voiceId,
        chapter_number: chapterNumber,
        text: text,
      }),
    });
  }

  async batchTTS(bookId: string, voiceId: string, chapters: Array<{ number: number; text: string }>) {
    return this.request<any>('/api/tts/batch', {
      method: 'POST',
      body: JSON.stringify({
        book_id: bookId,
        voice_id: voiceId,
        chapters: chapters,
      }),
    });
  }

  // Video (routed to Kaggle via backend)
  async createVideo(params: {
    audiobook_id: string;
    audio_path: string;
    captions: any[];
    aspect_ratio: string;
    background_color: string;
    caption_style: string;
    title: string;
    subtitle: string;
  }) {
    return this.request<any>('/api/video/create', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async renderFullVideo(params: {
    audiobook_id: string;
    audio_paths: string[];
    captions: any[];
    aspect_ratio: string;
    background_color: string;
    caption_style: string;
    title: string;
    subtitle: string;
  }) {
    return this.request<any>('/api/video/render-full', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async getVideoStatus(id: string) {
    return this.request<any>(`/api/video/status/${id}`);
  }
}

export const api = new ApiClient(API_BASE);
