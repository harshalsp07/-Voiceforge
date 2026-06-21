import type { Metadata } from 'next';
import { GrainOverlay } from '@/components/ui/grain-overlay';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'VoiceForge - AI Audiobook Creation',
  description: 'Transform books into immersive audiobooks with voice cloning and captioned videos.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GrainOverlay />
        {children}
      </body>
    </html>
  );
}
