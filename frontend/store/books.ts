import { create } from 'zustand';

export interface Book {
  id: string;
  title: string;
  author: string;
  fileUrl: string;
  fileType: string;
  totalChapters: number;
  createdAt: string;
}

export interface Voice {
  id: string;
  name: string;
  referenceAudioUrl: string;
  createdAt: string;
}

export interface Audiobook {
  id: string;
  bookId: string;
  voiceId: string;
  status: 'pending' | 'processing' | 'completed';
  chapters: AudiobookChapter[];
}

export interface AudiobookChapter {
  id: string;
  chapterNumber: number;
  title: string;
  textContent: string;
  audioUrl?: string;
  durationSeconds?: number;
  status: 'pending' | 'processing' | 'completed';
}

interface BooksState {
  books: Book[];
  voices: Voice[];
  currentBook: Book | null;
  currentAudiobook: Audiobook | null;
  isLoading: boolean;
  
  setBooks: (books: Book[]) => void;
  addBook: (book: Book) => void;
  removeBook: (id: string) => void;
  setCurrentBook: (book: Book | null) => void;
  
  setVoices: (voices: Voice[]) => void;
  addVoice: (voice: Voice) => void;
  removeVoice: (id: string) => void;
  
  setCurrentAudiobook: (audiobook: Audiobook | null) => void;
  updateChapter: (chapterId: string, updates: Partial<AudiobookChapter>) => void;
  
  setLoading: (loading: boolean) => void;
}

export const useBooksStore = create<BooksState>((set) => ({
  books: [],
  voices: [],
  currentBook: null,
  currentAudiobook: null,
  isLoading: false,

  setBooks: (books) => set({ books }),
  addBook: (book) => set((state) => ({ books: [...state.books, book] })),
  removeBook: (id) => set((state) => ({ books: state.books.filter((b) => b.id !== id) })),
  setCurrentBook: (book) => set({ currentBook: book }),

  setVoices: (voices) => set({ voices }),
  addVoice: (voice) => set((state) => ({ voices: [...state.voices, voice] })),
  removeVoice: (id) => set((state) => ({ voices: state.voices.filter((v) => v.id !== id) })),

  setCurrentAudiobook: (audiobook) => set({ currentAudiobook: audiobook }),
  updateChapter: (chapterId, updates) =>
    set((state) => {
      if (!state.currentAudiobook) return state;
      return {
        currentAudiobook: {
          ...state.currentAudiobook,
          chapters: state.currentAudiobook.chapters.map((ch) =>
            ch.id === chapterId ? { ...ch, ...updates } : ch
          ),
        },
      };
    }),

  setLoading: (isLoading) => set({ isLoading }),
}));
