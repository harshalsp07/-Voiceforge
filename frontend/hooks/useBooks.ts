'use client';

import { useState, useEffect, useCallback } from 'react';
import { databases, storage, ID, Query, Permission, Role, DATABASE_ID, COLLECTIONS, BUCKETS } from '@/lib/appwrite';

export interface Book {
  $id: string;
  userId: string;
  title: string;
  author: string;
  fileType: string;
  fileId: string;
  totalChapters: number;
  $createdAt: string;
}

export function useBooks(userId: string | undefined) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = useCallback(async () => {
    if (!userId) {
      setBooks([]);
      setLoading(false);
      return;
    }

    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.books,
        [Query.equal('userId', userId), Query.orderDesc('$createdAt')]
      );
      setBooks(response.documents as Book[]);
    } catch (error) {
      console.error('Failed to fetch books:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const uploadBook = async (file: File, title: string, author: string) => {
    if (!userId) throw new Error('Not authenticated');

    // Upload file to Appwrite Storage
    const uploadedFile = await storage.createFile(
      BUCKETS.books,
      ID.unique(),
      file,
      [
        Permission.read(Role.user(userId)),
        Permission.write(Role.user(userId)),
      ]
    );

    // Create book document
    const book = await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.books,
      ID.unique(),
      {
        userId,
        title,
        author,
        fileType: file.type.split('/').pop() || 'txt',
        fileId: uploadedFile.$id,
        totalChapters: 0,
      }
    );

    setBooks((prev) => [book as unknown as Book, ...prev]);
    return book;
  };

  const deleteBook = async (bookId: string) => {
    const book = books.find((b) => b.$id === bookId);
    if (book?.fileId) {
      await storage.deleteFile(BUCKETS.books, book.fileId);
    }
    await databases.deleteDocument(DATABASE_ID, COLLECTIONS.books, bookId);
    setBooks((prev) => prev.filter((b) => b.$id !== bookId));
  };

  const getBookFileUrl = (fileId: string) => {
    return storage.getFileView(BUCKETS.books, fileId);
  };

  return {
    books,
    loading,
    uploadBook,
    deleteBook,
    getBookFileUrl,
    refetch: fetchBooks,
  };
}
