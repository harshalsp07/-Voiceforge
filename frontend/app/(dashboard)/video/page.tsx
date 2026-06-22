'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Play, Pause, Maximize2, Download, Settings, Type, Palette, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToastContext } from '@/components/ui/toast';

const aspectRatios = [
  { id: '16:9', label: '16:9', desc: 'YouTube', w: 16, h: 9 },
  { id: '9:16', label: '9:16', desc: 'Reels/TikTok', w: 9, h: 16 },
  { id: '1:1', label: '1:1', desc: 'Instagram', w: 1, h: 1 },
  { id: '4:5', label: '4:5', desc: 'Feed', w: 4, h: 5 },
];

const captionStyles = [
  { id: 'tiktok', label: 'TikTok', desc: 'Bold, centered, bounce animation' },
  { id: 'classic', label: 'Classic', desc: 'Bottom-third, serif font' },
  { id: 'minimal', label: 'Minimal', desc: 'Clean, subtle highlight' },
];

type GenerateState = 'idle' | 'generating' | 'done';

export default function VideoStudioPage() {
  const { toast } = useToastContext();
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [captionStyle, setCaptionStyle] = useState('tiktok');
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [generateState, setGenerateState] = useState<GenerateState>('idle');
  const [generateProgress, setGenerateProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentRatio = aspectRatios.find((r) => r.id === aspectRatio)!;

  useEffect(() => {
    if (generateState !== 'generating') return;
    const interval = setInterval(() => {
      setGenerateProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setGenerateState('done');
          toast('Video generated successfully!', 'success');
          setTimeout(() => {
            setGenerateState('idle');
            setGenerateProgress(0);
          }, 2000);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [generateState, toast]);

  const handleGenerate = () => {
    setGenerateState('generating');
    setGenerateProgress(0);
  };

  const previewText = 'In my younger and more vulnerable age my father gave me some advice';

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-ink">Video Studio</h1>
        <p className="font-body text-copper-600 mt-1">Create captioned videos with word-by-word text highlighting</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Preview */}
        <div className="lg:col-span-2">
          <div className="card-vintage overflow-hidden">
            <div
              className="relative flex items-center justify-center transition-all duration-500"
              style={{
                backgroundColor,
                aspectRatio: `${currentRatio.w} / ${currentRatio.h}`,
                maxHeight: '480px',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={captionStyle}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-center px-8 max-w-2xl"
                >
                  {captionStyle === 'tiktok' && (
                    <p className="font-display text-3xl lg:text-4xl text-white leading-relaxed font-bold">
                      In my younger and more{' '}
                      <motion.span
                        animate={isPlaying ? { scale: [1, 1.15, 1] } : {}}
                        transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 0.5 }}
                        className="text-amber-400 bg-amber-400/20 px-2 py-0.5 rounded inline-block"
                      >
                        vulnerable
                      </motion.span>{' '}
                      age my father gave me some advice
                    </p>
                  )}
                  {captionStyle === 'classic' && (
                    <p className="font-display text-2xl lg:text-3xl text-white/90 leading-relaxed italic" style={{ borderBottom: '2px solid rgba(200,149,108,0.4)', paddingBottom: '8px' }}>
                      In my younger and more{' '}
                      <span className="text-amber-400 font-semibold not-italic">vulnerable</span>{' '}
                      age my father gave me some advice
                    </p>
                  )}
                  {captionStyle === 'minimal' && (
                    <p className="font-ui text-2xl lg:text-3xl text-white/80 leading-relaxed font-light">
                      In my younger and more{' '}
                      <span className="text-white font-medium underline decoration-amber-400 decoration-2 underline-offset-4">vulnerable</span>{' '}
                      age my father gave me some advice
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Overlay controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white/80 hover:text-white hover:bg-white/10"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <span className="text-xs font-mono text-white/60">0:00 / 3:52</span>
                </div>
                <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10">
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Timeline */}
            <div className="p-4 border-t border-cream/50">
              <div className="h-12 bg-surface-secondary rounded-lg relative overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 bottom-0 bg-amber-200/50 border-r-2 border-amber-500"
                  animate={{ width: isPlaying ? '35%' : '0%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                />
                <div className="absolute inset-0 flex items-center px-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-0.5 bg-copper-300/50 rounded-full"
                        style={{ height: `${8 + Math.sin(i * 0.4) * 6}px` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              <Button variant="secondary">
                <Type className="h-4 w-4" />
                Edit Captions
              </Button>
              <Button variant="secondary">
                <Palette className="h-4 w-4" />
                Background
              </Button>
            </div>
            <Button
              className={cn(generateState !== 'done' && 'btn-vintage', 'min-w-[160px]')}
              onClick={handleGenerate}
              disabled={generateState !== 'idle'}
            >
              <AnimatePresence mode="wait">
                {generateState === 'idle' && (
                  <motion.span key="idle" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Download className="h-4 w-4" />
                    Generate Video
                  </motion.span>
                )}
                {generateState === 'generating' && (
                  <motion.span key="generating" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {generateProgress}%
                  </motion.span>
                )}
                {generateState === 'done' && (
                  <motion.span key="done" className="flex items-center gap-2 text-green-600" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                    <Check className="h-4 w-4" />
                    Video Ready!
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </div>

          {generateState === 'generating' && (
            <div className="mt-3 progress-vintage">
              <motion.div
                className="progress-vintage-fill"
                animate={{ width: `${generateProgress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          )}
        </div>

        {/* Controls sidebar */}
        <div className="space-y-6">
          {/* Aspect Ratio */}
          <div className="card-vintage p-5">
            <h3 className="font-ui font-semibold text-ink mb-4 flex items-center gap-2">
              <Video className="h-4 w-4 text-amber-500" />
              Aspect Ratio
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {aspectRatios.map((ratio) => (
                <motion.button
                  key={ratio.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setAspectRatio(ratio.id)}
                  className={cn(
                    'relative p-3 rounded-lg border text-left transition-all duration-200 overflow-hidden',
                    aspectRatio === ratio.id
                      ? 'border-amber-400 shadow-sm'
                      : 'border-cream hover:border-amber-200'
                  )}
                >
                  {aspectRatio === ratio.id && (
                    <motion.div
                      layoutId="ratio-active"
                      className="absolute inset-0 bg-amber-50"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <div className="relative flex items-center gap-2 mb-1">
                    <div
                      className="border-2 border-copper-400 rounded"
                      style={{
                        width: `${ratio.w * 4}px`,
                        height: `${ratio.h * 4}px`,
                        maxWidth: '24px',
                        maxHeight: '24px',
                      }}
                    />
                    <p className="font-mono text-sm font-medium text-ink">{ratio.label}</p>
                  </div>
                  <p className="relative text-xs font-ui text-copper-400">{ratio.desc}</p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Caption Style */}
          <div className="card-vintage p-5">
            <h3 className="font-ui font-semibold text-ink mb-4 flex items-center gap-2">
              <Type className="h-4 w-4 text-amber-500" />
              Caption Style
            </h3>
            <div className="space-y-2">
              {captionStyles.map((style) => (
                <motion.button
                  key={style.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setCaptionStyle(style.id)}
                  className={cn(
                    'relative w-full p-3 rounded-lg border text-left transition-all duration-200 overflow-hidden',
                    captionStyle === style.id
                      ? 'border-amber-400 shadow-sm'
                      : 'border-cream hover:border-amber-200'
                  )}
                >
                  {captionStyle === style.id && (
                    <motion.div
                      layoutId="caption-active"
                      className="absolute inset-0 bg-amber-50"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <p className="relative font-ui text-sm font-medium text-ink">{style.label}</p>
                  <p className="relative text-xs font-ui text-copper-400 mt-0.5">{style.desc}</p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Background */}
          <div className="card-vintage p-5">
            <h3 className="font-ui font-semibold text-ink mb-4 flex items-center gap-2">
              <Palette className="h-4 w-4 text-amber-500" />
              Background
            </h3>
            <div className="flex items-center gap-3 mb-3">
              {['#000000', '#1A1410', '#F7F3EC', '#C8956C', '#5A7D8C'].map((color) => (
                <motion.button
                  key={color}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setBackgroundColor(color)}
                  className={cn(
                    'h-8 w-8 rounded-lg border-2 transition-all',
                    backgroundColor === color ? 'border-amber-500 scale-110' : 'border-cream'
                  )}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <Button variant="secondary" size="sm" className="w-full">
              Upload Custom Background
            </Button>
          </div>

          {/* Export Settings */}
          <div className="card-vintage p-5">
            <h3 className="font-ui font-semibold text-ink mb-4 flex items-center gap-2">
              <Settings className="h-4 w-4 text-amber-500" />
              Export Settings
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-ui text-copper-500 mb-1 block">Quality</label>
                <select className="input-vintage text-sm py-2">
                  <option>1080p (Full HD)</option>
                  <option>720p (HD)</option>
                  <option>4K (Ultra HD)</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-ui text-copper-500 mb-1 block">Format</label>
                <select className="input-vintage text-sm py-2">
                  <option>MP4 (H.264)</option>
                  <option>WebM (VP9)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
