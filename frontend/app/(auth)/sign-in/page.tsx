'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader2, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { WaveformVisualizer } from '@/components/audio/waveform-visualizer';
import { Brand } from '@/components/layout/brand';
import { useAuth } from '@/hooks/useAuth';
import { useToastContext } from '@/components/ui/toast';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToastContext();
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      toast('Welcome back!', 'success');
      router.push('/books');
    } catch (err: any) {
      const msg = err.message || 'Failed to sign in';
      setError(msg);
      toast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-warm flex">
      {/* Left: Branding */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { x: -60, opacity: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex lg:w-1/2 bg-gradient-dark relative overflow-hidden items-center justify-center"
      >
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-20 left-20 h-64 w-64 rounded-full bg-amber-400 blur-3xl"
          />
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-20 right-20 h-48 w-48 rounded-full bg-gold-400 blur-3xl"
          />
        </div>
        <div className="relative z-10 text-center px-12">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
            className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-gold mx-auto mb-6 shadow-glow-gold"
          >
            <BookOpen className="h-8 w-8 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="font-display text-4xl font-bold text-white mb-4"
          >
            Welcome Back
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="font-body text-lg text-amber-100/60 mb-8"
          >
            Continue creating your audiobooks
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <WaveformVisualizer bars={32} className="h-10 opacity-60" />
          </motion.div>
        </div>
      </motion.div>

      {/* Right: Sign In form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden mb-8"
          >
            <Brand size="md" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl font-bold text-ink mb-2"
          >
            Sign In
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-body text-copper-600 mb-8"
          >
            Enter your credentials to access your account
          </motion.p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700"
              >
                {error}
              </motion.div>
            )}

            <motion.div custom={0} variants={fieldVariants} initial="hidden" animate="visible">
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
            </motion.div>

            <motion.div custom={1} variants={fieldVariants} initial="hidden" animate="visible">
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
            </motion.div>

            <motion.div custom={2} variants={fieldVariants} initial="hidden" animate="visible">
              <Button type="submit" className="w-full btn-vintage group" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </Button>
            </motion.div>
          </form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-sm font-ui text-copper-500 mt-6"
          >
            Don&apos;t have an account?{' '}
            <Link href="/sign-up" className="text-amber-600 hover:text-amber-700 font-medium">
              Sign up
            </Link>
          </motion.p>
        </div>
      </div>
    </div>
  );
}
