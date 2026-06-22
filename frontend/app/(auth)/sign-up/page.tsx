'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Loader2, BookOpen, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { WaveformVisualizer } from '@/components/audio/waveform-visualizer';
import { Brand } from '@/components/layout/brand';
import { useAuth } from '@/hooks/useAuth';
import { useToastContext } from '@/components/ui/toast';
import { cn } from '@/lib/utils';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { toast } = useToastContext();
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const passwordStrength = useMemo(() => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }, [password]);

  const strengthLabels = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-lime-400', 'bg-green-500'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(email, password, name);
      toast('Account created! Welcome to VoiceForge.', 'success');
      router.push('/books');
    } catch (err: any) {
      const msg = err.message || 'Failed to create account';
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
            animate={shouldReduceMotion ? {} : { y: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-32 right-16 h-56 w-56 rounded-full bg-amber-400 blur-3xl"
          />
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-32 left-16 h-40 w-40 rounded-full bg-gold-400 blur-3xl"
          />
        </div>
        <div className="relative z-10 text-center px-12">
          <motion.div
            initial={{ scale: 0, rotate: 20 }}
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
            Start Creating
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="font-body text-lg text-amber-100/60 mb-8"
          >
            Transform books into immersive audiobooks
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

      {/* Right: Sign Up form */}
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
            Create Account
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-body text-copper-600 mb-8"
          >
            Join thousands of creators making audiobooks
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
              <label className="block text-sm font-ui font-medium text-ink mb-1.5">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-copper-400" />
                <Input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </motion.div>

            <motion.div custom={1} variants={fieldVariants} initial="hidden" animate="visible">
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

            <motion.div custom={2} variants={fieldVariants} initial="hidden" animate="visible">
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
                  minLength={8}
                />
              </div>
              {password.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2"
                >
                  <div className="flex gap-1">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={cn(
                          'h-1 flex-1 rounded-full transition-colors duration-300',
                          i < passwordStrength ? strengthColors[passwordStrength - 1] : 'bg-cream'
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-xs font-ui text-copper-400 mt-1">
                    {strengthLabels[Math.max(0, passwordStrength - 1)]}
                  </p>
                </motion.div>
              )}
            </motion.div>

            <motion.div custom={3} variants={fieldVariants} initial="hidden" animate="visible">
              <Button type="submit" className="w-full btn-vintage group" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </Button>
            </motion.div>
          </form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center text-sm font-ui text-copper-500 mt-6"
          >
            Already have an account?{' '}
            <Link href="/sign-in" className="text-amber-600 hover:text-amber-700 font-medium">
              Sign in
            </Link>
          </motion.p>
        </div>
      </div>
    </div>
  );
}
