'use client';

import { useState } from 'react';
import { Video, Play, Maximize2, Download, Settings, Type, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const aspectRatios = [
  { id: '16:9', label: '16:9', desc: 'YouTube', width: 1920, height: 1080 },
  { id: '9:16', label: '9:16', desc: 'Reels/TikTok', width: 1080, height: 1920 },
  { id: '1:1', label: '1:1', desc: 'Instagram', width: 1080, height: 1080 },
  { id: '4:5', label: '4:5', desc: 'Feed', width: 1080, height: 1350 },
];

const captionStyles = [
  { id: 'tiktok', label: 'TikTok', desc: 'Bold, centered, bounce animation' },
  { id: 'classic', label: 'Classic', desc: 'Bottom-third, serif font' },
  { id: 'minimal', label: 'Minimal', desc: 'Clean, subtle highlight' },
];

export default function VideoStudioPage() {
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [captionStyle, setCaptionStyle] = useState('tiktok');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

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
            <div className="aspect-video bg-ink relative flex items-center justify-center">
              {/* Preview content */}
              <div className="text-center px-8">
                <p className="font-display text-3xl text-white leading-relaxed">
                  In my younger and more{' '}
                  <span className="text-amber-400 bg-amber-400/20 px-2 py-0.5 rounded">vulnerable</span>{' '}
                  age my father gave me some advice
                </p>
              </div>

              {/* Overlay controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="text-white/80 hover:text-white">
                    <Play className="h-4 w-4" />
                  </Button>
                  <span className="text-xs font-mono text-white/60">0:00 / 3:52</span>
                </div>
                <Button variant="ghost" size="icon" className="text-white/80 hover:text-white">
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Timeline */}
            <div className="p-4 border-t border-cream/50">
              <div className="h-12 bg-surface-secondary rounded-lg relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-[35%] bg-amber-200/50 border-r-2 border-amber-500" />
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
            <Button className="btn-vintage">
              <Download className="h-4 w-4" />
              Generate Video
            </Button>
          </div>
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
                <button
                  key={ratio.id}
                  onClick={() => setAspectRatio(ratio.id)}
                  className={cn(
                    'p-3 rounded-lg border text-left transition-all duration-200',
                    aspectRatio === ratio.id
                      ? 'border-amber-400 bg-amber-50 shadow-sm'
                      : 'border-cream hover:border-amber-200'
                  )}
                >
                  <p className="font-mono text-sm font-medium text-ink">{ratio.label}</p>
                  <p className="text-xs font-ui text-copper-400 mt-0.5">{ratio.desc}</p>
                </button>
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
                <button
                  key={style.id}
                  onClick={() => setCaptionStyle(style.id)}
                  className={cn(
                    'w-full p-3 rounded-lg border text-left transition-all duration-200',
                    captionStyle === style.id
                      ? 'border-amber-400 bg-amber-50 shadow-sm'
                      : 'border-cream hover:border-amber-200'
                  )}
                >
                  <p className="font-ui text-sm font-medium text-ink">{style.label}</p>
                  <p className="text-xs font-ui text-copper-400 mt-0.5">{style.desc}</p>
                </button>
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
              {['#ffffff', '#000000', '#1A1410', '#F7F3EC', '#C8956C'].map((color) => (
                <button
                  key={color}
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
