import { Client, Account, Databases, Storage, Functions } from 'appwrite';

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const functions = new Functions(client);

export { client, ID, Permission, Role, Query } from 'appwrite';

// Database and Collection IDs
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';
export const COLLECTIONS = {
  books: process.env.NEXT_PUBLIC_APPWRITE_BOOKS_COLLECTION || 'books',
  voices: process.env.NEXT_PUBLIC_APPWRITE_VOICES_COLLECTION || 'voices',
  audiobooks: process.env.NEXT_PUBLIC_APPWRITE_AUDIOBOOKS_COLLECTION || 'audiobooks',
  chapters: process.env.NEXT_PUBLIC_APPWRITE_CHAPTERS_COLLECTION || 'chapters',
  videos: process.env.NEXT_PUBLIC_APPWRITE_VIDEOS_COLLECTION || 'videos',
  llmProviders: process.env.NEXT_PUBLIC_APPWRITE_LLM_COLLECTION || 'llm_providers',
};

// Storage Bucket IDs
export const BUCKETS = {
  books: process.env.NEXT_PUBLIC_APPWRITE_BOOKS_BUCKET || 'books',
  voices: process.env.NEXT_PUBLIC_APPWRITE_VOICES_BUCKET || 'voices',
  audio: process.env.NEXT_PUBLIC_APPWRITE_AUDIO_BUCKET || 'audio',
  videos: process.env.NEXT_PUBLIC_APPWRITE_VIDEOS_BUCKET || 'videos',
};

// Helper to get file preview URL
export function getFilePreview(bucketId: string, fileId: string): string {
  return storage.getFilePreview(bucketId, fileId);
}

// Helper to get file download URL
export function getFileDownload(bucketId: string, fileId: string): string {
  return storage.getFileDownload(bucketId, fileId);
}

// Helper to get file view URL
export function getFileView(bucketId: string, fileId: string): string {
  return storage.getFileView(bucketId, fileId);
}
