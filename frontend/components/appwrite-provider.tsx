'use client';

import { useEffect } from 'react';
import { client } from '@/lib/appwrite';

export function AppwriteProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Ping Appwrite backend to verify setup on app load
    client.ping().then((response) => {
      console.log('Appwrite connected:', response);
    }).catch((error) => {
      console.error('Appwrite connection failed:', error);
    });
  }, []);

  return <>{children}</>;
}
