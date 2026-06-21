'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserButton } from '@/components/ui/user-button';
import { BookOpen, Search, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-cream bg-surface-elevated/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-gold">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-ink">
              VoiceForge
            </span>
          </Link>

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
