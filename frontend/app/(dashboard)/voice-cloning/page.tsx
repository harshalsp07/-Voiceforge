'use client';

import { useState } from 'react';
import { Mic, Upload, Play, Pause, Trash2, Save, AudioLines } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { WaveformVisualizer } from '@/components/audio/waveform-visualizer';

const mockVoices = [
  { id: '1', name: 'Warm Narrator', created: '2 days ago', duration: '0:45' },
  { id: '2', name: 'Deep Male', created: '1 week ago', duration: '0:32' },
  { id: '3', name: 'Soft Female', created: '2 weeks ago', duration: '0:28' },
];

export default function VoiceCloningPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [voiceName, setVoiceName] = useState('');
  const [referenceText, setReferenceText] = useState('');

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-ink">Voice Cloning Studio</h1>
        <p className="font-body text-copper-600 mt-1">Create custom voices from reference audio recordings</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Upload / Record */}
        <div>
          <div className="card-vintage p-6">
            <h3 className="font-ui font-semibold text-ink mb-4 flex items-center gap-2">
              <Mic className="h-4 w-4 text-amber-500" />
              Reference Audio
            </h3>

            {/* Drop zone */}
            <div className="border-2 border-dashed border-cream rounded-xl p-8 text-center hover:border-amber-300 hover:bg-amber-50/20 transition-all duration-300 cursor-pointer mb-6">
              <Upload className="h-10 w-10 text-copper-300 mx-auto mb-3" />
              <p className="font-ui font-medium text-ink mb-1">Drop audio file here</p>
              <p className="text-sm font-ui text-copper-400">WAV, MP3, or FLAC (max 30s recommended)</p>
            </div>

            <div className="text-center mb-6">
              <span className="text-sm font-ui text-copper-400">or</span>
            </div>

            {/* Record button */}
            <div className="text-center mb-6">
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`h-20 w-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isRecording
                    ? 'bg-red-500 shadow-lg shadow-red-500/30 animate-pulse'
                    : 'bg-gradient-gold shadow-glow-amber hover:scale-105'
                }`}
              >
                {isRecording ? (
                  <div className="h-6 w-6 bg-white rounded-sm" />
                ) : (
                  <Mic className="h-8 w-8 text-white" />
                )}
              </button>
              <p className="text-sm font-ui text-copper-500 mt-3">
                {isRecording ? 'Recording... Click to stop' : 'Click to record'}
              </p>
            </div>

            {/* Waveform preview */}
            <div className="bg-ink rounded-xl p-4 mb-6">
              <WaveformVisualizer bars={32} className="h-10" isPlaying={false} />
            </div>

            {/* Voice name */}
            <div className="mb-4">
              <label className="block text-sm font-ui font-medium text-ink mb-2">Voice Name</label>
              <Input
                placeholder="e.g., Warm Narrator"
                value={voiceName}
                onChange={(e) => setVoiceName(e.target.value)}
              />
            </div>

            {/* Reference text */}
            <div className="mb-6">
              <label className="block text-sm font-ui font-medium text-ink mb-2">
                Reference Text <span className="text-copper-400">(what was spoken in the audio)</span>
              </label>
              <textarea
                className="input-vintage min-h-[100px] resize-none"
                placeholder="Enter the text that was spoken in the reference recording..."
                value={referenceText}
                onChange={(e) => setReferenceText(e.target.value)}
              />
            </div>

            <Button className="w-full btn-vintage">
              <Save className="h-4 w-4" />
              Save Voice
            </Button>
          </div>
        </div>

        {/* Right: Saved voices */}
        <div>
          <div className="card-vintage">
            <div className="p-4 border-b border-cream/50">
              <h3 className="font-ui font-semibold text-ink flex items-center gap-2">
                <AudioLines className="h-4 w-4 text-amber-500" />
                Saved Voices
              </h3>
            </div>
            <div className="divide-y divide-cream/50">
              {mockVoices.map((voice) => (
                <div key={voice.id} className="p-4 flex items-center gap-4 hover:bg-amber-50/20 transition-colors">
                  <button className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center hover:bg-amber-200 transition-colors">
                    <Play className="h-4 w-4 text-amber-600 ml-0.5" />
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="font-ui font-medium text-ink truncate">{voice.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-ui text-copper-400">{voice.created}</span>
                      <span className="text-xs font-mono text-copper-400">{voice.duration}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-copper-400 hover:text-error">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Info card */}
          <div className="card-vintage p-6 mt-6 bg-amber-50/30 border-amber-200/50">
            <h4 className="font-ui font-semibold text-ink mb-2">Tips for Best Results</h4>
            <ul className="space-y-2 text-sm font-body text-copper-600">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                Use 10-30 seconds of clean audio without background noise
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                Speak naturally with consistent pacing
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                Include the reference text for better voice matching
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                WAV format at 44.1kHz produces the best results
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
