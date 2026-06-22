import type { Metadata, Viewport } from 'next';
import { GrainOverlay } from '@/components/ui/grain-overlay';
import { AppwriteProvider } from '@/components/appwrite-provider';
import { ToastProvider } from '@/components/ui/toast';
import '../styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://voiceforge.app'),
  title: {
    default: 'VoiceForge - AI Audiobook Creation',
    template: '%s | VoiceForge',
  },
  description: 'Transform books into immersive audiobooks with voice cloning and captioned videos.',
  keywords: ['audiobook', 'AI', 'voice cloning', 'text-to-speech', 'Fish Audio', 'captioned video'],
  authors: [{ name: 'VoiceForge' }],
  creator: 'VoiceForge',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'VoiceForge - AI Audiobook Creation',
    description: 'Transform books into immersive audiobooks with voice cloning and captioned videos.',
    siteName: 'VoiceForge',
    images: [{ url: '/icon.svg', width: 512, height: 512 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VoiceForge - AI Audiobook Creation',
    description: 'Transform books into immersive audiobooks with voice cloning and captioned videos.',
    images: ['/icon.svg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#C8956C',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppwriteProvider>
          <ToastProvider>
            <GrainOverlay />
            {children}
          </ToastProvider>
        </AppwriteProvider>
      </body>
    </html>
  );
}
