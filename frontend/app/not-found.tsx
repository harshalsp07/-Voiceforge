'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Brand } from '@/components/layout/brand';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-amber pointer-events-none" />
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-amber-200/20 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center"
      >
        <Brand size="lg" showText={false} className="justify-center mb-8" />

        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
          className="font-display text-8xl font-bold gradient-text mb-4"
        >
          404
        </motion.h1>

        <h2 className="font-display text-2xl font-semibold text-ink mb-2">Page Not Found</h2>
        <p className="font-body text-copper-600 mb-8 max-w-md mx-auto">
          This chapter seems to be missing from the book. Let&apos;s get you back to the library.
        </p>

        <Link href="/">
          <Button className="btn-vintage group">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Home
          </Button>
        </Link>
      </motion.div>

      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-12 right-12 opacity-10 pointer-events-none"
      >
        <BookOpen className="h-32 w-32 text-amber-600" />
      </motion.div>
    </div>
  );
}
