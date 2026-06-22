'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Settings, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export function UserButton() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = async () => {
    setOpen(false);
    await logout();
    router.push('/');
  };

  if (!user) {
    return null;
  }

  const initial = user.name?.charAt(0)?.toUpperCase() || user.email.charAt(0).toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="h-9 w-9 rounded-lg bg-gradient-to-br from-amber-400 to-copper-600 flex items-center justify-center text-white font-ui font-semibold text-sm hover:shadow-glow-amber transition-all"
        aria-label="User menu"
        aria-expanded={open}
      >
        {initial}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-full mt-2 w-56 bg-surface-elevated rounded-lg shadow-warm-lg border border-cream z-50 overflow-hidden"
          >
            <div className="p-3 border-b border-cream/50">
              <p className="font-ui font-medium text-ink text-sm truncate">{user.name || 'User'}</p>
              <p className="text-xs font-ui text-copper-400 truncate">{user.email}</p>
            </div>
            <div className="p-1.5">
              <button
                onClick={() => {
                  setOpen(false);
                  router.push('/settings');
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm font-ui text-ink hover:bg-amber-50 rounded-md transition-colors"
              >
                <Settings className="h-4 w-4 text-copper-400" />
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm font-ui text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
