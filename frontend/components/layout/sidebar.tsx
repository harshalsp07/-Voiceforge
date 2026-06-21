'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Mic, Video, Settings, Plus, Headphones } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'My Books', href: '/books', icon: BookOpen },
  { name: 'Voice Cloning', href: '/voice-cloning', icon: Mic },
  { name: 'Video Studio', href: '/video', icon: Video },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-gradient-dark text-white border-r border-amber-900/30">
      <div className="flex-1 flex flex-col p-4">
        <div className="mb-6">
          <Link href="/books">
            <Button className="w-full btn-vintage gap-2">
              <Plus className="h-4 w-4" />
              New Audiobook
            </Button>
          </Link>
        </div>

        <nav className="flex-1 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-ui font-medium transition-all duration-200',
                  isActive
                    ? 'bg-amber-500/20 text-amber-300 shadow-sm'
                    : 'text-amber-100/60 hover:text-amber-100 hover:bg-white/5'
                )}
              >
                <item.icon className={cn('h-5 w-5', isActive ? 'text-amber-400' : 'text-amber-100/40')} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-amber-900/30 pt-4 mt-4">
          <div className="px-3 mb-2">
            <p className="text-xs font-ui text-amber-100/40 uppercase tracking-wider">Usage</p>
          </div>
          <div className="px-3">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <Headphones className="h-3.5 w-3.5 text-amber-400" />
                <span className="text-xs font-ui text-amber-100/60">Audiobooks</span>
              </div>
              <span className="text-xs font-mono text-amber-300">3 / 10</span>
            </div>
            <div className="h-1.5 bg-amber-900/30 rounded-full overflow-hidden">
              <div className="h-full w-[30%] bg-gradient-gold rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
