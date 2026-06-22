'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Mic, Video, Settings, Plus, Headphones, X, Menu } from 'lucide-react';
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
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <>
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
              onClick={() => setMobileOpen(false)}
              className={cn(
                'relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-ui font-medium transition-all duration-200',
                isActive
                  ? 'text-amber-300'
                  : 'text-amber-100/60 hover:text-amber-100 hover:bg-white/5'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-amber-500/20 rounded-lg shadow-sm"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <item.icon className={cn('relative h-5 w-5', isActive ? 'text-amber-400' : 'text-amber-100/40')} />
              <span className="relative">{item.name}</span>
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
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '30%' }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
              className="h-full bg-gradient-gold rounded-full"
            />
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <aside className="hidden lg:flex flex-col w-64 bg-gradient-dark text-white border-r border-amber-900/30">
        <div className="flex-1 flex flex-col p-4">
          {sidebarContent}
        </div>
      </aside>

      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 h-10 w-10 rounded-lg bg-surface-elevated shadow-warm flex items-center justify-center"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5 text-ink" />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 350, damping: 35 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-64 bg-gradient-dark text-white border-r border-amber-900/30 flex flex-col p-4"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 h-8 w-8 rounded-lg hover:bg-white/10 flex items-center justify-center"
                aria-label="Close menu"
              >
                <X className="h-4 w-4 text-amber-100/60" />
              </button>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
