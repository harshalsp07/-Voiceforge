'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Brand } from '@/components/layout/brand';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function MarketingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 20);
  });

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-surface-elevated/80 backdrop-blur-xl border-b border-cream shadow-warm-sm' : 'bg-transparent'
      )}
    >
      <div className="flex items-center justify-between px-6 lg:px-12 py-4">
        <Brand size="md" href="/" />

        <nav className="hidden md:flex items-center gap-1">
          {['Features', 'How it Works', 'Showcase'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-4 py-2 text-sm font-ui font-medium text-copper-600 hover:text-ink transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/sign-in">
            <Button variant="ghost" className="font-ui">Sign In</Button>
          </Link>
          <Link href="/sign-up">
            <Button className="btn-vintage group">
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
