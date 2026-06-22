'use client';

import { useState, useEffect, useCallback } from 'react';
import { databases, storage, ID, Query, Permission, Role, userPermissions, DATABASE_ID, COLLECTIONS, BUCKETS } from '@/lib/appwrite';

export interface Voice {
  $id: string;
  userId: string;
  name: string;
  audioFileId: string;
  voiceTokens: string;
  $createdAt: string;
}

export function useVoices(userId: string | undefined) {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVoices = useCallback(async () => {
    if (!userId) {
      setVoices([]);
      setLoading(false);
      return;
    }

    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.voices,
        [Query.equal('userId', userId), Query.orderDesc('$createdAt')]
      );
      setVoices(response.documents as unknown as Voice[]);
    } catch (error) {
      console.error('Failed to fetch voices:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchVoices();
  }, [fetchVoices]);

  const cloneVoice = async (audioFile: File, name: string, referenceText: string) => {
    if (!userId) throw new Error('Not authenticated');

    // Upload reference audio to Appwrite Storage
    const uploadedFile = await storage.createFile(
      BUCKETS.voices,
      ID.unique(),
      audioFile,
      [
        Permission.read(Role.user(userId)),
        Permission.write(Role.user(userId)),
      ]
    );

    // Create voice document
    const voice = await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.voices,
      ID.unique(),
      {
        userId,
        name,
        audioFileId: uploadedFile.$id,
        voiceTokens: JSON.stringify({ status: 'pending' }),
      },
      userPermissions(userId)
    );

    setVoices((prev) => [voice as unknown as Voice, ...prev]);
    return voice;
  };

  const updateVoiceTokens = async (voiceId: string, tokens: object) => {
    await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.voices,
      voiceId,
      { voiceTokens: JSON.stringify(tokens) }
    );
    setVoices((prev) =>
      prev.map((v) =>
        v.$id === voiceId ? { ...v, voiceTokens: JSON.stringify(tokens) } : v
      )
    );
  };

  const deleteVoice = async (voiceId: string) => {
    const voice = voices.find((v) => v.$id === voiceId);
    if (voice?.audioFileId) {
      await storage.deleteFile(BUCKETS.voices, voice.audioFileId);
    }
    await databases.deleteDocument(DATABASE_ID, COLLECTIONS.voices, voiceId);
    setVoices((prev) => prev.filter((v) => v.$id !== voiceId));
  };

  const getVoiceAudioUrl = (fileId: string) => {
    return storage.getFileView(BUCKETS.voices, fileId);
  };

  return {
    voices,
    loading,
    cloneVoice,
    updateVoiceTokens,
    deleteVoice,
    getVoiceAudioUrl,
    refetch: fetchVoices,
  };
}
