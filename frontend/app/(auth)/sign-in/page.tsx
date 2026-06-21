'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BookOpen, Mail, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      router.push('/books');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-warm flex">
      {/* Left: Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-dark relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 h-64 w-64 rounded-full bg-amber-400 blur-3xl" />
          <div className="absolute bottom-20 right-20 h-48 w-48 rounded-full bg-gold-400 blur-3xl" />
        </div>
        <div className="relative z-10 text-center px-12">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-gold mx-auto mb-6 shadow-glow-gold">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="font-display text-4xl font-bold text-white mb-4">Welcome Back</h1>
          <p className="font-body text-lg text-amber-100/60">
            Continue creating your audiobooks
          </p>
        </div>
      </div>

      {/* Right: Sign In form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-gold">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-2xl font-bold text-ink">VoiceForge</span>
          </div>

          <h2 className="font-display text-3xl font-bold text-ink mb-2">Sign In</h2>
          <p className="font-body text-copper-600 mb-8">
            Enter your credentials to access your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-ui font-medium text-ink mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-copper-400" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-ui font-medium text-ink mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-copper-400" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full btn-vintage" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <p className="text-center text-sm font-ui text-copper-500 mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/sign-up" className="text-amber-600 hover:text-amber-700 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
