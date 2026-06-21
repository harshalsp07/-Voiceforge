import Link from 'next/link';
import { Mic, BookOpen, Video, Sparkles, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WaveformVisualizer } from '@/components/audio/waveform-visualizer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-warm relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-amber-200/20 blur-3xl" />
        <div className="absolute top-1/2 -left-20 h-72 w-72 rounded-full bg-gold-200/15 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-copper-200/10 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-gold shadow-warm-sm">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <span className="font-display text-2xl font-bold text-ink">VoiceForge</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/sign-in">
            <Button variant="ghost" className="font-ui">Sign In</Button>
          </Link>
          <Link href="/sign-up">
            <Button className="btn-vintage">Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10">
        <section className="px-6 lg:px-12 pt-16 lg:pt-24 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Text */}
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100/60 border border-amber-200 mb-6">
                  <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                  <span className="text-xs font-ui font-medium text-amber-700">Powered by Fish Audio S2</span>
                </div>

                <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl font-bold text-ink leading-[1.05] mb-6">
                  Transform Books Into{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-gold">
                    Living Audio
                  </span>
                </h1>

                <p className="font-body text-lg lg:text-xl text-copper-700 leading-relaxed mb-8">
                  Clone any voice, generate immersive audiobooks chapter by chapter, 
                  and create captioned videos with word-by-word text highlighting.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/sign-up">
                    <Button size="lg" className="btn-vintage text-base px-8">
                      Start Creating
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="secondary" size="lg" className="text-base px-8">
                    <Play className="h-4 w-4" />
                    Watch Demo
                  </Button>
                </div>

                <div className="flex items-center gap-6 mt-10">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[0.4, 0.6, 0.8, 1.0].map((opacity, i) => (
                        <div
                          key={i}
                          className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-amber-300 to-copper-500"
                          style={{ opacity }}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-ui text-copper-600">2,400+ creators</span>
                  </div>
                  <div className="h-4 w-px bg-amber-200" />
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="h-4 w-4 text-gold fill-gold" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-sm font-ui text-copper-600 ml-1">4.9/5</span>
                  </div>
                </div>
              </div>

              {/* Right: Visual */}
              <div className="relative">
                <div className="relative bg-surface-elevated rounded-2xl shadow-warm-xl border border-cream overflow-hidden">
                  {/* Player UI mock */}
                  <div className="p-6 border-b border-cream/50">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-400 to-copper-600 flex items-center justify-center">
                        <Play className="h-5 w-5 text-white ml-0.5" />
                      </div>
                      <div>
                        <p className="font-display text-lg font-semibold text-ink">Chapter 1: The Beginning</p>
                        <p className="text-sm font-ui text-copper-500">The Great Gatsby</p>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mb-3">
                      <div className="progress-vintage">
                        <div className="progress-vintage-fill" style={{ width: '35%' }} />
                      </div>
                      <div className="flex justify-between mt-1.5">
                        <span className="text-xs font-mono text-copper-400">1:24</span>
                        <span className="text-xs font-mono text-copper-400">3:52</span>
                      </div>
                    </div>

                    {/* Waveform */}
                    <WaveformVisualizer bars={48} className="h-12" />
                  </div>

                  {/* Caption preview */}
                  <div className="p-6 bg-ink">
                    <p className="font-mono text-sm text-amber-200/80 leading-relaxed">
                      In my younger and more vulnerable age my father gave me some advice that I&aposve been turning over in my mind ever since.
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                      <span className="text-xs font-ui text-amber-400/60">Voice: Warm Narrator</span>
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 bg-surface-elevated rounded-xl shadow-warm-lg border border-cream p-3 flex items-center gap-3 animate-fade-in-up">
                  <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <Video className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-ui font-semibold text-ink">Video Ready</p>
                    <p className="text-xs font-ui text-copper-500">16:9 with captions</p>
                  </div>
                </div>

                {/* Floating badge 2 */}
                <div className="absolute -top-3 -right-3 bg-surface-elevated rounded-xl shadow-warm-lg border border-cream p-3 animate-fade-in-up animate-delay-200">
                  <div className="flex items-center gap-2">
                    <Mic className="h-4 w-4 text-amber-500" />
                    <span className="text-sm font-ui font-medium text-ink">Voice Cloned</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-6 lg:px-12 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink mb-4">
                Everything You Need
              </h2>
              <p className="font-body text-lg text-copper-600 max-w-2xl mx-auto">
                From text to immersive audio experiences, VoiceForge handles the entire pipeline.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Mic,
                  title: 'Voice Cloning',
                  description: 'Upload a reference recording and clone any voice with Fish Audio S2 Pro. Supports 80+ languages.',
                },
                {
                  icon: BookOpen,
                  title: 'Audiobook Generation',
                  description: 'Convert books chapter by chapter with natural pacing, emotion, and prosody control.',
                },
                {
                  icon: Video,
                  title: 'Video Creation',
                  description: 'Generate captioned videos with word-by-word text highlighting in multiple aspect ratios.',
                },
              ].map((feature, i) => (
                <div
                  key={feature.title}
                  className="card-vintage p-8 group hover:shadow-glow-amber"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center mb-5 group-hover:bg-amber-200 transition-colors">
                    <feature.icon className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-ink mb-2">{feature.title}</h3>
                  <p className="font-body text-copper-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-cream bg-surface-elevated/50 px-6 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-ui text-copper-500">
            &copy; {new Date().getFullYear()} VoiceForge. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm font-ui text-copper-400">
            <a href="#" className="hover:text-amber-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-amber-500 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
