'use client';

import { cn } from '@/lib/utils';

interface WaveformVisualizerProps {
  bars?: number;
  className?: string;
  isPlaying?: boolean;
  color?: string;
}

export function WaveformVisualizer({
  bars = 24,
  className,
  isPlaying = true,
  color = 'bg-amber-400',
}: WaveformVisualizerProps) {
  return (
    <div className={cn('flex items-end justify-center gap-[3px]', className)}>
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'w-[3px] rounded-full transition-all duration-300',
            color,
            isPlaying ? 'animate-waveform' : 'h-1'
          )}
          style={{
            height: isPlaying ? undefined : `${4 + Math.sin(i * 0.5) * 4}px`,
            animationDelay: isPlaying ? `${i * 0.05}s` : undefined,
            animationPlayState: isPlaying ? 'running' : 'paused',
            opacity: 0.4 + (Math.sin(i * 0.3) * 0.3 + 0.3),
          }}
        />
      ))}
    </div>
  );
}
