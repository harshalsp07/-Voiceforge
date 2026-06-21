'use client';

import { useRouter } from 'next/navigation';
import { LogOut, Settings, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export function UserButton() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="relative group">
      <button className="h-9 w-9 rounded-lg bg-gradient-to-br from-amber-400 to-copper-600 flex items-center justify-center text-white font-ui font-semibold text-sm hover:shadow-glow-amber transition-all">
        {user.name?.charAt(0)?.toUpperCase() || user.email.charAt(0).toUpperCase()}
      </button>

      {/* Dropdown */}
      <div className="absolute right-0 top-full mt-2 w-56 bg-surface-elevated rounded-lg shadow-warm-lg border border-cream opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-3 border-b border-cream/50">
          <p className="font-ui font-medium text-ink text-sm truncate">{user.name || 'User'}</p>
          <p className="text-xs font-ui text-copper-400 truncate">{user.email}</p>
        </div>
        <div className="p-1.5">
          <button
            onClick={() => router.push('/settings')}
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
      </div>
    </div>
  );
}
