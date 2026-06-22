'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Pause, Download, Settings, Mic, BookOpen, CheckCircle2, Loader2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WaveformVisualizer } from '@/components/audio/waveform-visualizer';
import { StaggerContainer, StaggerItem } from '@/components/animations/stagger';
import { cn } from '@/lib/utils';

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

const captionText = 'In my younger and more vulnerable age my father gave me some advice that I have been turning over in my mind ever since. Whenever you feel like criticizing anyone, just remember that all the people in this world have not had the advantages that you have had.';

const speedOptions = ['0.75x', '1.0x', '1.25x', '1.5x'];

function StatusBadge({ status }: { status: string }) {
  if (status === 'completed') {
    return (
      <Badge variant="success" className="gap-1">
        <CheckCircle2 className="h-3 w-3" />
        completed
      </Badge>
    );
  }
  if (status === 'processing') {
    return (
      <Badge variant="warning" className="gap-1">
        <span className="flex gap-0.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              className="h-1 w-1 rounded-full bg-yellow-700"
            />
          ))}
        </span>
        processing
      </Badge>
    );
  }
  return <Badge variant="default">pending</Badge>;
}

export default function AudiobookEditorPage() {
  const params = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [activeChapter, setActiveChapter] = useState(1);
  const [speed, setSpeed] = useState('1.0x');
  const [currentWord, setCurrentWord] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const words = captionText.split(' ');

  useEffect(() => {
    if (!isPlaying) return;
    const wordInterval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 400 / parseFloat(speed));
    return () => clearInterval(wordInterval);
  }, [isPlaying, speed, words.length]);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = progressRef.current?.getBoundingClientRect();
    if (!rect) return;
    const percent = ((e.clientX - rect.left) / rect.width) * 100;
    setProgress(Math.max(0, Math.min(100, percent)));
  };

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
            <StaggerContainer className="divide-y divide-cream/50">
              {mockBook.chapters.map((chapter) => (
                <StaggerItem key={chapter.id}>
                  <button
                    onClick={() => setActiveChapter(chapter.id)}
                    className={cn(
                      'w-full px-4 py-3 flex items-center justify-between transition-colors text-left relative',
                      activeChapter === chapter.id
                        ? 'bg-amber-50/50'
                        : 'hover:bg-amber-50/30'
                    )}
                  >
                    {activeChapter === chapter.id && (
                      <motion.div
                        layoutId="active-chapter"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-gold rounded-r-full"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    <div>
                      <p className="font-ui text-sm font-medium text-ink">{chapter.title}</p>
                      <p className="text-xs font-ui text-copper-400 mt-0.5 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {chapter.duration}
                      </p>
                    </div>
                    <StatusBadge status={chapter.status} />
                  </button>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>

        {/* Audio preview */}
        <div className="lg:col-span-2">
          <div className="card-vintage overflow-hidden">
            <div className="p-6 border-b border-cream/50">
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="h-14 w-14 rounded-xl bg-gradient-gold flex items-center justify-center shadow-glow-amber"
                >
                  <AnimatePresence mode="wait">
                    {isPlaying ? (
                      <motion.div
                        key="pause"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Pause className="h-6 w-6 text-white" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="play"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Play className="h-6 w-6 text-white ml-0.5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
                <div className="flex-1">
                  <p className="font-display text-lg font-semibold text-ink">
                    Chapter {activeChapter}
                  </p>
                  <div
                    ref={progressRef}
                    onClick={handleSeek}
                    className="progress-vintage mt-2 cursor-pointer"
                  >
                    <motion.div
                      className="progress-vintage-fill"
                      animate={{ width: `${progress}%` }}
                      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs font-mono text-copper-400">
                      {Math.floor(progress * 0.039)}:{String(Math.floor((progress * 2.34) % 60)).padStart(2, '0')}
                    </span>
                    <span className="text-xs font-mono text-copper-400">3:52</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <WaveformVisualizer bars={64} className="h-16 mb-6" isPlaying={isPlaying} />

              <div className="bg-ink rounded-xl p-5">
                <p className="font-mono text-sm leading-relaxed">
                  {words.map((word, i) => (
                    <span
                      key={i}
                      className={cn(
                        'transition-colors duration-200',
                        i === currentWord && isPlaying
                          ? 'text-amber-400 bg-amber-400/20 px-1 rounded'
                          : i < currentWord && isPlaying
                          ? 'text-amber-200/40'
                          : 'text-amber-200/80'
                      )}
                    >
                      {word}{' '}
                    </span>
                  ))}
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
                  {speedOptions.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSpeed(s)}
                      className={cn(
                        'px-2.5 py-1 rounded-md font-mono text-xs transition-all',
                        speed === s
                          ? 'bg-amber-100 text-amber-700 font-medium'
                          : 'text-copper-400 hover:text-ink hover:bg-surface-secondary'
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
