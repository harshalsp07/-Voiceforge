'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserButton } from '@/components/ui/user-button';
import { Brand } from '@/components/layout/brand';
import { Search, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-cream bg-surface-elevated/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Brand size="sm" href="/books" />

          <nav className="hidden md:flex items-center gap-1">
            <Link href="/books">
              <Button variant="ghost" size="sm">Books</Button>
            </Link>
            <Link href="/voice-cloning">
              <Button variant="ghost" size="sm">Voices</Button>
            </Link>
            <Link href="/video">
              <Button variant="ghost" size="sm">Video</Button>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
            <Bell className="h-4 w-4" />
          </Button>
          <div className="h-8 w-px bg-cream" />
          <UserButton />
        </div>
      </div>
    </header>
  );
}
