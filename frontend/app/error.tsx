'use client';

import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="h-16 w-16 rounded-2xl bg-red-100 flex items-center justify-center mb-6"
      >
        <AlertCircle className="h-8 w-8 text-red-500" />
      </motion.div>

      <h2 className="font-display text-2xl font-bold text-ink mb-2">Something went wrong</h2>
      <p className="font-body text-copper-600 mb-6 max-w-md">
        {error.message || 'An unexpected error occurred. Please try again.'}
      </p>

      <Button className="btn-vintage" onClick={reset}>
        <RefreshCw className="h-4 w-4" />
        Try Again
      </Button>
    </div>
  );
}
