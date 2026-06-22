'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BrandProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  href?: string;
  dark?: boolean;
}

const sizes = {
  sm: { box: 'h-8 w-8', icon: 'h-4 w-4', text: 'text-lg' },
  md: { box: 'h-10 w-10', icon: 'h-5 w-5', text: 'text-2xl' },
  lg: { box: 'h-16 w-16', icon: 'h-8 w-8', text: 'text-4xl' },
};

export function Brand({ size = 'md', showText = true, className, href, dark = false }: BrandProps) {
  const s = sizes[size];
  const content = (
    <>
      <motion.div
        animate={{ boxShadow: ['0 0 0px rgba(200,149,108,0)', '0 0 20px rgba(200,149,108,0.3)', '0 0 0px rgba(200,149,108,0)'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className={cn('flex items-center justify-center rounded-xl bg-gradient-gold', s.box)}
      >
        <BookOpen className={cn('text-white', s.icon)} />
      </motion.div>
      {showText && (
        <span className={cn('font-display font-bold', s.text, dark ? 'text-white' : 'text-ink')}>
          VoiceForge
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn('flex items-center gap-2.5', className)}>
        {content}
      </Link>
    );
  }

  return <div className={cn('flex items-center gap-2.5', className)}>{content}</div>;
}
