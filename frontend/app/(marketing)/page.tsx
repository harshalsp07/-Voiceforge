'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Mic, BookOpen, Video, Sparkles, ArrowRight, Play, Upload, Wand2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WaveformVisualizer } from '@/components/audio/waveform-visualizer';
import { Reveal } from '@/components/animations/reveal';
import { StaggerContainer, StaggerItem } from '@/components/animations/stagger';
import { TiltCard } from '@/components/animations/tilt-card';

function AnimatedCounter({ value, suffix = '', duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView || shouldReduceMotion) {
      if (inView) setDisplay(value);
      return;
    }
    let start = 0;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(start + (value - start) * eased));
      if (progress < 1) requestAnimationFrame(animate);
      else setDisplay(value);
    };
    requestAnimationFrame(animate);
  }, [inView, value, duration, shouldReduceMotion]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}{suffix}
    </span>
  );
}

const showcaseTabs = [
  { id: 'audiobook', label: 'Audiobook Player' },
  { id: 'video', label: 'Video Studio' },
];

export default function LandingPage() {
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState('audiobook');
  const { scrollY } = useScroll();
  const heroBlob1Y = useTransform(scrollY, [0, 500], [0, shouldReduceMotion ? 0 : 100]);
  const heroBlob2Y = useTransform(scrollY, [0, 500], [0, shouldReduceMotion ? 0 : -60]);
  const heroBlob3X = useTransform(scrollY, [0, 500], [0, shouldReduceMotion ? 0 : 40]);

  return (
    <div className="min-h-screen bg-gradient-warm relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-amber pointer-events-none" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div style={{ y: heroBlob1Y }} className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-amber-200/20 blur-3xl" />
        <motion.div style={{ y: heroBlob2Y }} className="absolute top-1/2 -left-20 h-72 w-72 rounded-full bg-gold-200/15 blur-3xl" />
        <motion.div style={{ x: heroBlob3X }} className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-copper-200/10 blur-3xl" />
      </div>

      <div className="h-20" />

      {/* Hero */}
      <section className="relative z-10 px-6 lg:px-12 pt-12 lg:pt-20 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100/60 border border-amber-200 mb-6"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                <span className="text-xs font-ui font-medium text-amber-700">Powered by Fish Audio S2</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-5xl lg:text-6xl xl:text-7xl font-bold text-ink leading-[1.05] mb-6"
              >
                Transform Books Into{' '}
                <span className="gradient-text">Living Audio</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-body text-lg lg:text-xl text-copper-700 leading-relaxed mb-8"
              >
                Clone any voice, generate immersive audiobooks chapter by chapter,
                and create captioned videos with word-by-word text highlighting.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Link href="/sign-up">
                  <Button size="lg" className="btn-vintage text-base px-8 group">
                    Start Creating
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </Link>
                <Button variant="secondary" size="lg" className="text-base px-8 group">
                  <Play className="h-4 w-4 transition-transform group-hover:scale-110" />
                  Watch Demo
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-6 mt-10"
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[0.4, 0.6, 0.8, 1.0].map((opacity, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.08, type: 'spring', stiffness: 300, damping: 20 }}
                        className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-amber-300 to-copper-500"
                        style={{ opacity }}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-ui text-copper-600">
                    <AnimatedCounter value={2400} suffix="+" /> creators
                  </span>
                </div>
                <div className="h-4 w-px bg-amber-200" />
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.svg
                      key={star}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + star * 0.06, type: 'spring', stiffness: 300, damping: 20 }}
                      className="h-4 w-4 text-gold fill-gold"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </motion.svg>
                  ))}
                  <span className="text-sm font-ui text-copper-600 ml-1">4.9/5</span>
                </div>
              </motion.div>
            </div>

            {/* Right: Floating player card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative bg-surface-elevated rounded-2xl shadow-warm-xl border border-cream overflow-hidden"
              >
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

                  <div className="mb-3">
                    <div className="progress-vintage">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '35%' }}
                        transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
                        className="progress-vintage-fill"
                      />
                    </div>
                    <div className="flex justify-between mt-1.5">
                      <span className="text-xs font-mono text-copper-400">1:24</span>
                      <span className="text-xs font-mono text-copper-400">3:52</span>
                    </div>
                  </div>

                  <WaveformVisualizer bars={48} className="h-12" />
                </div>

                <div className="p-6 bg-ink">
                  <p className="font-mono text-sm text-amber-200/80 leading-relaxed">
                    In my younger and more vulnerable age my father gave me some advice that I&apos;ve been turning over in my mind ever since.
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-xs font-ui text-amber-400/60">Voice: Warm Narrator</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -bottom-4 -left-4 bg-surface-elevated rounded-xl shadow-warm-lg border border-cream p-3 flex items-center gap-3"
              >
                <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <Video className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-ui font-semibold text-ink">Video Ready</p>
                  <p className="text-xs font-ui text-copper-500">16:9 with captions</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -top-3 -right-3 bg-surface-elevated rounded-xl shadow-warm-lg border border-cream p-3"
              >
                <div className="flex items-center gap-2">
                  <Mic className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-ui font-medium text-ink">Voice Cloned</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="relative z-10 px-6 lg:px-12 py-24 bg-surface-secondary/50">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink mb-4">
              From Page to Audio in Three Steps
            </h2>
            <p className="font-body text-lg text-copper-600 max-w-2xl mx-auto">
              A seamless pipeline from raw text to polished, narrated audio with synchronized captions.
            </p>
          </Reveal>

          <StaggerContainer className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-amber-200 via-gold-300 to-amber-200" />

            {[
              { icon: Upload, step: '01', title: 'Upload Your Book', desc: 'Drag in a PDF, EPUB, or TXT file. We automatically detect chapters and parse the text.' },
              { icon: Mic, step: '02', title: 'Clone a Voice', desc: 'Record 10-30 seconds of reference audio, or choose from your saved voice library.' },
              { icon: Wand2, step: '03', title: 'Generate & Export', desc: 'Produce chapter-by-chapter audio with natural pacing, then export captioned videos.' },
            ].map((item) => (
              <StaggerItem key={item.step}>
                <div className="relative text-center">
                  <div className="relative inline-flex h-24 w-24 items-center justify-center rounded-2xl bg-surface-elevated border border-cream shadow-warm mb-6">
                    <item.icon className="h-8 w-8 text-amber-600" />
                    <span className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-gradient-gold text-white text-xs font-mono font-bold flex items-center justify-center shadow-warm-sm">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-ink mb-2">{item.title}</h3>
                  <p className="font-body text-copper-600 leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 px-6 lg:px-12 py-24">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink mb-4">
              Everything You Need
            </h2>
            <p className="font-body text-lg text-copper-600 max-w-2xl mx-auto">
              From text to immersive audio experiences, VoiceForge handles the entire pipeline.
            </p>
          </Reveal>

          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Mic, title: 'Voice Cloning', description: 'Upload a reference recording and clone any voice with Fish Audio S2 Pro. Supports 80+ languages.' },
              { icon: BookOpen, title: 'Audiobook Generation', description: 'Convert books chapter by chapter with natural pacing, emotion, and prosody control.' },
              { icon: Video, title: 'Video Creation', description: 'Generate captioned videos with word-by-word text highlighting in multiple aspect ratios.' },
            ].map((feature) => (
              <StaggerItem key={feature.title}>
                <TiltCard className="h-full">
                  <div className="card-vintage p-8 group hover:shadow-glow-amber h-full">
                    <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center mb-5 group-hover:bg-amber-200 transition-colors">
                      <feature.icon className="h-6 w-6 text-amber-600" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-ink mb-2">{feature.title}</h3>
                    <p className="font-body text-copper-600 leading-relaxed">{feature.description}</p>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Showcase */}
      <section id="showcase" className="relative z-10 px-6 lg:px-12 py-24 bg-surface-secondary/50">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink mb-4">
              See It In Action
            </h2>
            <p className="font-body text-lg text-copper-600 max-w-2xl mx-auto">
              Experience the player and studio interface before you sign up.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex justify-center gap-2 mb-8">
              {showcaseTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-5 py-2.5 rounded-lg text-sm font-ui font-medium transition-colors ${
                    activeTab === tab.id ? 'text-amber-700' : 'text-copper-500 hover:text-ink'
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="showcase-tab"
                      className="absolute inset-0 bg-amber-100 rounded-lg"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative">{tab.label}</span>
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                {activeTab === 'audiobook' ? (
                  <motion.div
                    key="audiobook"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-surface-elevated rounded-2xl shadow-warm-xl border border-cream overflow-hidden"
                  >
                    <div className="p-6 border-b border-cream/50">
                      <div className="flex items-center gap-4">
                        <button className="h-14 w-14 rounded-xl bg-gradient-gold flex items-center justify-center shadow-glow-amber hover:scale-105 transition-transform">
                          <Play className="h-6 w-6 text-white ml-0.5" />
                        </button>
                        <div className="flex-1">
                          <p className="font-display text-lg font-semibold text-ink">Chapter 1: The Beginning</p>
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
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="video"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-surface-elevated rounded-2xl shadow-warm-xl border border-cream overflow-hidden"
                  >
                    <div className="aspect-video bg-ink relative flex items-center justify-center">
                      <div className="text-center px-8">
                        <p className="font-display text-3xl text-white leading-relaxed">
                          In my younger and more{' '}
                          <span className="text-amber-400 bg-amber-400/20 px-2 py-0.5 rounded">vulnerable</span>{' '}
                          age my father gave me some advice
                        </p>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="text-white/80 hover:text-white">
                            <Play className="h-4 w-4" />
                          </Button>
                          <span className="text-xs font-mono text-white/60">0:00 / 3:52</span>
                        </div>
                      </div>
                    </div>
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 lg:px-12 py-24">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="relative rounded-3xl bg-gradient-dark overflow-hidden p-12 lg:p-16 text-center">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-1/4 h-48 w-48 rounded-full bg-amber-400 blur-3xl animate-float" />
                <div className="absolute bottom-0 right-1/4 h-40 w-40 rounded-full bg-gold-400 blur-3xl animate-float-slow" />
              </div>
              <div className="relative z-10">
                <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
                  Ready to Forge Your Voice?
                </h2>
                <p className="font-body text-lg text-amber-100/70 mb-8 max-w-xl mx-auto">
                  Join thousands of creators turning books into immersive audio experiences.
                </p>
                <Link href="/sign-up">
                  <Button size="xl" className="btn-vintage text-base px-10 group">
                    Start Creating Free
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <div className="flex items-center justify-center gap-6 mt-8">
                  {['No credit card required', '3 free audiobooks', 'Cancel anytime'].map((item) => (
                    <div key={item} className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-amber-400" />
                      <span className="text-sm font-ui text-amber-100/60">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
