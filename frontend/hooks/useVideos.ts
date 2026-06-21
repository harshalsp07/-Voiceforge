'use client';

import { useState, useEffect, useCallback } from 'react';
import { databases, ID, Query, Permission, Role, DATABASE_ID, COLLECTIONS } from '@/lib/appwrite';

export interface Video {
  $id: string;
  userId: string;
  audiobookId: string;
  aspectRatio: string;
  captionStyle: string;
  backgroundColor: string;
  videoFileId: string;
  status: 'pending' | 'processing' | 'completed';
  $createdAt: string;
}

export function useVideos(userId: string | undefined) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVideos = useCallback(async () => {
    if (!userId) {
      setVideos([]);
      setLoading(false);
      return;
    }

    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.videos,
        [Query.equal('userId', userId), Query.orderDesc('$createdAt')]
      );
      setVideos(response.documents as Video[]);
    } catch (error) {
      console.error('Failed to fetch videos:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const createVideo = async (
    audiobookId: string,
    aspectRatio: string,
    captionStyle: string,
    backgroundColor: string
  ) => {
    if (!userId) throw new Error('Not authenticated');

    const video = await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.videos,
      ID.unique(),
      {
        userId,
        audiobookId,
        aspectRatio,
        captionStyle,
        backgroundColor,
        videoFileId: '',
        status: 'pending',
      }
    );

    setVideos((prev) => [video as unknown as Video, ...prev]);
    return video;
  };

  const updateVideoStatus = async (videoId: string, status: string, videoFileId?: string) => {
    const updateData: Record<string, string> = { status };
    if (videoFileId) updateData.videoFileId = videoFileId;

    await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.videos,
      videoId,
      updateData
    );

    setVideos((prev) =>
      prev.map((v) =>
        v.$id === videoId
          ? { ...v, status: status as Video['status'], videoFileId: videoFileId || v.videoFileId }
          : v
      )
    );
  };

  const deleteVideo = async (videoId: string) => {
    await databases.deleteDocument(DATABASE_ID, COLLECTIONS.videos, videoId);
    setVideos((prev) => prev.filter((v) => v.$id !== videoId));
  };

  return {
    videos,
    loading,
    createVideo,
    updateVideoStatus,
    deleteVideo,
    refetch: fetchVideos,
  };
}
