'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Play, Pause, Download, Settings, Mic, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WaveformVisualizer } from '@/components/audio/waveform-visualizer';

const mockBook = {
  id: '1',
  title: 'The Great Gatsby',
  author: 'F. Scott Fitzgerald',
  chapters: [
    { id: 1, number: 1, title: 'Chapter 1', duration: '3:52', status: 'completed' },
    { id: 2, number: 2, title: 'Chapter 2', duration: '4:15', status: 'completed' },
    { id: 3, number: 3, title: 'Chapter 3', duration: '3:28', status: 'processing' },
    { id: 4, number: 4, title: 'Chapter 4', duration: '-', status: 'pending' },
    { id: 5, number: 5, title: 'Chapter 5', duration: '-', status: 'pending' },
  ],
};

export default function AudiobookEditorPage() {
  const params = useParams();

  return (
    <div className="max-w-7xl mx-auto">
      <Link href="/books" className="inline-flex items-center gap-2 text-sm font-ui text-copper-500 hover:text-amber-600 mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to Library
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink">{mockBook.title}</h1>
          <p className="font-body text-copper-600 mt-1">{mockBook.author}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
          <Button className="btn-vintage">
            <Mic className="h-4 w-4" />
            Select Voice
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chapter list */}
        <div className="lg:col-span-1">
          <div className="card-vintage">
            <div className="p-4 border-b border-cream/50">
              <h3 className="font-ui font-semibold text-ink flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-amber-500" />
                Chapters
              </h3>
            </div>
            <div className="divide-y divide-cream/50">
              {mockBook.chapters.map((chapter) => (
                <button
                  key={chapter.id}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-amber-50/30 transition-colors text-left"
                >
                  <div>
                    <p className="font-ui text-sm font-medium text-ink">{chapter.title}</p>
                    <p className="text-xs font-ui text-copper-400 mt-0.5">{chapter.duration}</p>
                  </div>
                  <Badge
                    variant={
                      chapter.status === 'completed' ? 'success' :
                      chapter.status === 'processing' ? 'warning' : 'default'
                    }
                  >
                    {chapter.status}
                  </Badge>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Audio preview */}
        <div className="lg:col-span-2">
          <div className="card-vintage overflow-hidden">
            <div className="p-6 border-b border-cream/50">
              <div className="flex items-center gap-4">
                <button className="h-14 w-14 rounded-xl bg-gradient-gold flex items-center justify-center shadow-glow-amber hover:scale-105 transition-transform">
                  <Play className="h-6 w-6 text-white ml-0.5" />
                </button>
                <div className="flex-1">
                  <p className="font-display text-lg font-semibold text-ink">Chapter 1</p>
                  <div className="progress-vintage mt-2">
                    <div className="progress-vintage-fill" style={{ width: '35%' }} />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs font-mono text-copper-400">1:24</span>
                    <span className="text-xs font-mono text-copper-400">3:52</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <WaveformVisualizer bars={64} className="h-16 mb-6" />
              
              <div className="bg-ink rounded-xl p-5">
                <p className="font-mono text-sm text-amber-200/80 leading-relaxed">
                  In my younger and more vulnerable age my father gave me some advice that I&apos;ve been turning over in my mind ever since.
                  &ldquo;Whenever you feel like criticizing anyone,&rdquo; he told me, &ldquo;just remember that all the people in this world haven&apos;t had the advantages that you&apos;ve had.&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-3">
                  <Button variant="secondary" size="sm">
                    <Download className="h-4 w-4" />
                    Download Audio
                  </Button>
                  <Button variant="ghost" size="sm">Download Transcript</Button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-ui text-copper-400">Speed:</span>
                  <Button variant="ghost" size="sm" className="font-mono text-xs">0.75x</Button>
                  <Button variant="ghost" size="sm" className="font-mono text-xs bg-amber-100">1.0x</Button>
                  <Button variant="ghost" size="sm" className="font-mono text-xs">1.25x</Button>
                  <Button variant="ghost" size="sm" className="font-mono text-xs">1.5x</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
