import { Client, Account, Databases, Storage, Functions, ID, Permission, Role, Query } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://sgp.cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '6a381e4c0004226eb0dd');

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);
const functions = new Functions(client);

export { client, account, databases, storage, functions, ID, Permission, Role, Query };

export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'voiceforge-db';

export const COLLECTIONS = {
  books: process.env.NEXT_PUBLIC_APPWRITE_BOOKS_COLLECTION || 'books',
  voices: process.env.NEXT_PUBLIC_APPWRITE_VOICES_COLLECTION || 'voices',
  audiobooks: process.env.NEXT_PUBLIC_APPWRITE_AUDIOBOOKS_COLLECTION || 'audiobooks',
  chapters: process.env.NEXT_PUBLIC_APPWRITE_CHAPTERS_COLLECTION || 'chapters',
  videos: process.env.NEXT_PUBLIC_APPWRITE_VIDEOS_COLLECTION || 'videos',
  llmProviders: process.env.NEXT_PUBLIC_APPWRITE_LLM_COLLECTION || 'llm_providers',
};

export const BUCKETS = {
  books: process.env.NEXT_PUBLIC_APPWRITE_BOOKS_BUCKET || 'books',
  voices: process.env.NEXT_PUBLIC_APPWRITE_VOICES_BUCKET || 'voices',
  audio: process.env.NEXT_PUBLIC_APPWRITE_AUDIO_BUCKET || 'audio',
  videos: process.env.NEXT_PUBLIC_APPWRITE_VIDEOS_BUCKET || 'videos',
};

export function userPermissions(userId: string) {
  return [
    Permission.read(Role.user(userId)),
    Permission.update(Role.user(userId)),
    Permission.delete(Role.user(userId)),
  ];
}

export function getFilePreview(bucketId: string, fileId: string): string {
  return storage.getFilePreview(bucketId, fileId);
}

export function getFileDownload(bucketId: string, fileId: string): string {
  return storage.getFileDownload(bucketId, fileId);
}

export function getFileView(bucketId: string, fileId: string): string {
  return storage.getFileView(bucketId, fileId);
}
