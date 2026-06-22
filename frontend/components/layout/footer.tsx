'use client';

import { Github, Twitter } from 'lucide-react';
import Link from 'next/link';
import { Brand } from '@/components/layout/brand';

export function Footer() {
  return (
    <footer className="border-t border-cream bg-surface-secondary">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Brand size="sm" href="/" className="mb-4" />
            <p className="text-sm text-copper-600 font-body">
              Transform books into immersive audiobooks with AI voice cloning.
            </p>
          </div>

          <div>
            <h4 className="font-ui font-semibold text-sm text-ink mb-3">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/books" className="text-sm text-copper-600 hover:text-amber-600 transition-colors">Books</Link></li>
              <li><Link href="/voice-cloning" className="text-sm text-copper-600 hover:text-amber-600 transition-colors">Voice Cloning</Link></li>
              <li><Link href="/video" className="text-sm text-copper-600 hover:text-amber-600 transition-colors">Video Studio</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-ui font-semibold text-sm text-ink mb-3">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-copper-600 hover:text-amber-600 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm text-copper-600 hover:text-amber-600 transition-colors">API Reference</a></li>
              <li><a href="#" className="text-sm text-copper-600 hover:text-amber-600 transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-ui font-semibold text-sm text-ink mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-copper-600 hover:text-amber-600 transition-colors">Privacy</a></li>
              <li><a href="#" className="text-sm text-copper-600 hover:text-amber-600 transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="divider-vintage my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-copper-500 font-ui">
            &copy; {new Date().getFullYear()} VoiceForge. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-copper-400 hover:text-amber-500 transition-colors">
              <Github className="h-4 w-4" />
            </a>
            <a href="#" className="text-copper-400 hover:text-amber-500 transition-colors">
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
