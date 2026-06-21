'use client';

import { useState, useEffect, useCallback } from 'react';
import { databases, storage, ID, Query, Permission, Role, DATABASE_ID, COLLECTIONS, BUCKETS } from '@/lib/appwrite';

export interface Audiobook {
  $id: string;
  userId: string;
  bookId: string;
  voiceId: string;
  status: 'pending' | 'processing' | 'completed';
  totalDuration: number;
  $createdAt: string;
}

export interface Chapter {
  $id: string;
  audiobookId: string;
  chapterNumber: number;
  title: string;
  textContent: string;
  audioFileId: string;
  duration: number;
  status: 'pending' | 'processing' | 'completed';
  $createdAt: string;
}

export function useAudiobooks(userId: string | undefined) {
  const [audiobooks, setAudiobooks] = useState<Audiobook[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAudiobooks = useCallback(async () => {
    if (!userId) {
      setAudiobooks([]);
      setLoading(false);
      return;
    }

    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.audiobooks,
        [Query.equal('userId', userId), Query.orderDesc('$createdAt')]
      );
      setAudiobooks(response.documents as Audiobook[]);
    } catch (error) {
      console.error('Failed to fetch audiobooks:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchAudiobooks();
  }, [fetchAudiobooks]);

  const createAudiobook = async (bookId: string, voiceId: string) => {
    if (!userId) throw new Error('Not authenticated');

    const audiobook = await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.audiobooks,
      ID.unique(),
      {
        userId,
        bookId,
        voiceId,
        status: 'pending',
        totalDuration: 0,
      }
    );

    setAudiobooks((prev) => [audiobook as unknown as Audiobook, ...prev]);
    return audiobook;
  };

  const updateAudiobookStatus = async (audiobookId: string, status: string) => {
    await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.audiobooks,
      audiobookId,
      { status }
    );
    setAudiobooks((prev) =>
      prev.map((a) =>
        a.$id === audiobookId ? { ...a, status: status as Audiobook['status'] } : a
      )
    );
  };

  const deleteAudiobook = async (audiobookId: string) => {
    // Delete all chapters first
    const chaptersResponse = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.chapters,
      [Query.equal('audiobookId', audiobookId)]
    );

    for (const chapter of chaptersResponse.documents) {
      if (chapter.audioFileId) {
        await storage.deleteFile(BUCKETS.audio, chapter.audioFileId);
      }
      await databases.deleteDocument(DATABASE_ID, COLLECTIONS.chapters, chapter.$id);
    }

    await databases.deleteDocument(DATABASE_ID, COLLECTIONS.audiobooks, audiobookId);
    setAudiobooks((prev) => prev.filter((a) => a.$id !== audiobookId));
  };

  return {
    audiobooks,
    loading,
    createAudiobook,
    updateAudiobookStatus,
    deleteAudiobook,
    refetch: fetchAudiobooks,
  };
}

// Chapter operations
export function useChapters(audiobookId: string | undefined) {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchChapters = useCallback(async () => {
    if (!audiobookId) {
      setChapters([]);
      setLoading(false);
      return;
    }

    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.chapters,
        [
          Query.equal('audiobookId', audiobookId),
          Query.orderAsc('chapterNumber'),
        ]
      );
      setChapters(response.documents as Chapter[]);
    } catch (error) {
      console.error('Failed to fetch chapters:', error);
    } finally {
      setLoading(false);
    }
  }, [audiobookId]);

  useEffect(() => {
    fetchChapters();
  }, [fetchChapters]);

  const createChapter = async (
    audiobookId: string,
    chapterNumber: number,
    title: string,
    textContent: string
  ) => {
    const chapter = await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.chapters,
      ID.unique(),
      {
        audiobookId,
        chapterNumber,
        title,
        textContent,
        audioFileId: '',
        duration: 0,
        status: 'pending',
      }
    );

    setChapters((prev) => [...prev, chapter as unknown as Chapter]);
    return chapter;
  };

  const updateChapterAudio = async (
    chapterId: string,
    audioFileId: string,
    duration: number
  ) => {
    await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.chapters,
      chapterId,
      { audioFileId, duration, status: 'completed' }
    );
    setChapters((prev) =>
      prev.map((c) =>
        c.$id === chapterId
          ? { ...c, audioFileId, duration, status: 'completed' }
          : c
      )
    );
  };

  const getChapterAudioUrl = (fileId: string) => {
    if (!fileId) return '';
    return storage.getFileView(BUCKETS.audio, fileId);
  };

  return {
    chapters,
    loading,
    createChapter,
    updateChapterAudio,
    getChapterAudioUrl,
    refetch: fetchChapters,
  };
}
