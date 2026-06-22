/**
 * Provisions VoiceForge database, collections, and storage buckets on Appwrite Cloud.
 *
 * Usage:
 *   1. Create an API key at https://cloud.appwrite.io with scopes:
 *      databases.read/write, collections.read/write, attributes.read/write,
 *      indexes.read/write, buckets.read/write, files.read/write
 *   2. Set APPWRITE_API_KEY in .env.local
 *   3. Run: npm run setup-appwrite
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Client, Databases, Storage, Permission, Role, IndexType } from 'node-appwrite';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

function loadEnv() {
  for (const file of ['.env.local', '.env']) {
    const path = resolve(rootDir, file);
    if (!existsSync(path)) continue;
    for (const line of readFileSync(path, 'utf8').split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    }
  }
}

loadEnv();

const ENDPOINT = process.env.APPWRITE_ENDPOINT || process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://sgp.cloud.appwrite.io/v1';
const PROJECT_ID = process.env.APPWRITE_PROJECT_ID || process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '6a381e4c0004226eb0dd';
const API_KEY = process.env.APPWRITE_API_KEY;
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'voiceforge-db';

if (!API_KEY) {
  console.error('\nMissing APPWRITE_API_KEY.');
  console.error('Create one in Appwrite Console → Project → API Keys');
  console.error('Add it to .env.local: APPWRITE_API_KEY=your-key-here\n');
  process.exit(1);
}

const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID).setKey(API_KEY);
const databases = new Databases(client);
const storage = new Storage(client);

const userCreate = [Permission.create(Role.users())];

const COLLECTIONS = {
  books: {
    name: 'Books',
    attributes: [
      { type: 'string', key: 'userId', size: 36, required: true },
      { type: 'string', key: 'title', size: 512, required: true },
      { type: 'string', key: 'author', size: 256, required: false },
      { type: 'string', key: 'fileType', size: 32, required: false },
      { type: 'string', key: 'fileId', size: 36, required: false },
      { type: 'integer', key: 'totalChapters', required: false },
    ],
    indexes: [{ key: 'userId_idx', type: IndexType.Key, attributes: ['userId'] }],
  },
  voices: {
    name: 'Voices',
    attributes: [
      { type: 'string', key: 'userId', size: 36, required: true },
      { type: 'string', key: 'name', size: 128, required: true },
      { type: 'string', key: 'audioFileId', size: 36, required: false },
      { type: 'string', key: 'voiceTokens', size: 65535, required: false },
    ],
    indexes: [{ key: 'userId_idx', type: IndexType.Key, attributes: ['userId'] }],
  },
  audiobooks: {
    name: 'Audiobooks',
    attributes: [
      { type: 'string', key: 'userId', size: 36, required: true },
      { type: 'string', key: 'bookId', size: 36, required: true },
      { type: 'string', key: 'voiceId', size: 36, required: true },
      { type: 'string', key: 'status', size: 32, required: false },
      { type: 'integer', key: 'totalDuration', required: false },
    ],
    indexes: [{ key: 'userId_idx', type: IndexType.Key, attributes: ['userId'] }],
  },
  chapters: {
    name: 'Chapters',
    attributes: [
      { type: 'string', key: 'audiobookId', size: 36, required: true },
      { type: 'integer', key: 'chapterNumber', required: true },
      { type: 'string', key: 'title', size: 512, required: false },
      { type: 'string', key: 'textContent', size: 65535, required: false },
      { type: 'string', key: 'audioFileId', size: 36, required: false },
      { type: 'integer', key: 'duration', required: false },
      { type: 'string', key: 'status', size: 32, required: false },
    ],
    indexes: [{ key: 'audiobookId_idx', type: IndexType.Key, attributes: ['audiobookId'] }],
  },
  videos: {
    name: 'Videos',
    attributes: [
      { type: 'string', key: 'userId', size: 36, required: true },
      { type: 'string', key: 'audiobookId', size: 36, required: true },
      { type: 'string', key: 'aspectRatio', size: 16, required: false },
      { type: 'string', key: 'captionStyle', size: 64, required: false },
      { type: 'string', key: 'backgroundColor', size: 16, required: false },
      { type: 'string', key: 'videoFileId', size: 36, required: false },
      { type: 'string', key: 'status', size: 32, required: false },
    ],
    indexes: [{ key: 'userId_idx', type: IndexType.Key, attributes: ['userId'] }],
  },
  llm_providers: {
    name: 'LLM Providers',
    attributes: [
      { type: 'string', key: 'userId', size: 36, required: true },
      { type: 'string', key: 'provider', size: 64, required: true },
      { type: 'string', key: 'apiKeyEncrypted', size: 1024, required: false },
      { type: 'string', key: 'baseUrl', size: 512, required: false },
      { type: 'string', key: 'modelName', size: 128, required: false },
    ],
    indexes: [{ key: 'userId_idx', type: IndexType.Key, attributes: ['userId'] }],
  },
};

const BUCKETS = {
  books: { name: 'Books', maxSize: 50 * 1024 * 1024, extensions: ['pdf', 'epub', 'txt'] },
  voices: { name: 'Voices', maxSize: 10 * 1024 * 1024, extensions: ['wav', 'mp3', 'flac', 'ogg'] },
  audio: { name: 'Audio', maxSize: 100 * 1024 * 1024, extensions: ['wav', 'mp3', 'flac', 'ogg'] },
  videos: { name: 'Videos', maxSize: 500 * 1024 * 1024, extensions: ['mp4', 'webm', 'mov'] },
};

const bucketPermissions = [
  Permission.read(Role.users()),
  Permission.create(Role.users()),
  Permission.update(Role.users()),
  Permission.delete(Role.users()),
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function ensureDatabase() {
  try {
    await databases.get(DATABASE_ID);
    console.log(`  Database "${DATABASE_ID}" already exists`);
  } catch {
    await databases.create(DATABASE_ID, 'VoiceForge');
    console.log(`  Created database "${DATABASE_ID}"`);
  }
}

async function createAttribute(databaseId, collectionId, attr) {
  if (attr.type === 'string') {
    await databases.createStringAttribute(databaseId, collectionId, attr.key, attr.size, attr.required ?? false);
  } else if (attr.type === 'integer') {
    await databases.createIntegerAttribute(databaseId, collectionId, attr.key, attr.required ?? false);
  }
}

async function waitForAttributes(databaseId, collectionId, expectedKeys) {
  for (let i = 0; i < 30; i++) {
    const { attributes } = await databases.listAttributes(databaseId, collectionId);
    const ready = expectedKeys.every((key) => {
      const attr = attributes.find((a) => a.key === key);
      return attr && attr.status === 'available';
    });
    if (ready) return;
    await sleep(1000);
  }
  console.warn(`  Warning: attributes may still be processing for ${collectionId}`);
}

async function ensureCollection(collectionId, config) {
  try {
    await databases.getCollection(DATABASE_ID, collectionId);
    console.log(`  Collection "${collectionId}" already exists`);
    return;
  } catch {
    // create below
  }

  await databases.createCollection(DATABASE_ID, collectionId, config.name, userCreate, true, true);
  console.log(`  Created collection "${collectionId}"`);

  for (const attr of config.attributes) {
    try {
      await createAttribute(DATABASE_ID, collectionId, attr);
    } catch (err) {
      if (!String(err.message).includes('already exists')) throw err;
    }
  }

  await waitForAttributes(
    DATABASE_ID,
    collectionId,
    config.attributes.map((a) => a.key)
  );

  for (const index of config.indexes) {
    try {
      await databases.createIndex(DATABASE_ID, collectionId, index.key, index.type, index.attributes);
    } catch (err) {
      if (!String(err.message).includes('already exists')) throw err;
    }
  }
}

async function ensureBucket(bucketId, config) {
  try {
    await storage.getBucket(bucketId);
    console.log(`  Bucket "${bucketId}" already exists`);
    return;
  } catch {
    // create below
  }

  await storage.createBucket(
    bucketId,
    config.name,
    bucketPermissions,
    true,
    true,
    config.maxSize,
    config.extensions,
    'none',
    false,
    true
  );
  console.log(`  Created bucket "${bucketId}"`);
}

async function main() {
  console.log('\nVoiceForge Appwrite Setup');
  console.log(`Endpoint:  ${ENDPOINT}`);
  console.log(`Project:   ${PROJECT_ID}`);
  console.log(`Database:  ${DATABASE_ID}\n`);

  console.log('[1/3] Database');
  await ensureDatabase();

  console.log('\n[2/3] Collections');
  for (const [id, config] of Object.entries(COLLECTIONS)) {
    await ensureCollection(id, config);
  }

  console.log('\n[3/3] Storage Buckets');
  for (const [id, config] of Object.entries(BUCKETS)) {
    await ensureBucket(id, config);
  }

  console.log('\nSetup complete!\n');
  console.log('Manual steps in Appwrite Console:');
  console.log('  1. Auth → Settings → enable Email/Password');
  console.log('  2. Auth → Settings → disable email verification (for dev) or configure SMTP');
  console.log('  3. Platforms → add Web app with hostname localhost and your production domain\n');
}

main().catch((err) => {
  console.error('\nSetup failed:', err.message || err);
  process.exit(1);
});
