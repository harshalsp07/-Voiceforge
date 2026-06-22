'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { BookOpen, Mic, Video, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Books', href: '/books', icon: BookOpen },
  { name: 'Voices', href: '/voice-cloning', icon: Mic },
  { name: 'Video', href: '/video', icon: Video },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface-elevated/90 backdrop-blur-xl border-t border-cream">
      <div className="flex items-center justify-around h-16 px-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'relative flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors',
                isActive ? 'text-amber-600' : 'text-copper-400'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-active"
                  className="absolute inset-0 bg-amber-100 rounded-lg"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <item.icon className="relative h-5 w-5" />
              <span className="relative text-xs font-ui font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
