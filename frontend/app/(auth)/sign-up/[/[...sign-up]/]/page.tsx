import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-warm flex">
      {/* Left: Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-dark relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-32 right-16 h-56 w-56 rounded-full bg-amber-400 blur-3xl" />
          <div className="absolute bottom-32 left-16 h-40 w-40 rounded-full bg-gold-400 blur-3xl" />
        </div>
        <div className="relative z-10 text-center px-12">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-gold mx-auto mb-6 shadow-glow-gold">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="font-display text-4xl font-bold text-white mb-4">Start Creating</h1>
          <p className="font-body text-lg text-amber-100/60">
            Transform books into immersive audiobooks
          </p>
        </div>
      </div>

      {/* Right: Sign Up form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-gold">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-2xl font-bold text-ink">VoiceForge</span>
          </div>

          <h2 className="font-display text-3xl font-bold text-ink mb-2">Create Account</h2>
          <p className="font-body text-copper-600 mb-8">
            Join thousands of creators making audiobooks
          </p>

          <SignUp
            appearance={{
              elements: {
                rootBox: 'w-full',
                card: 'shadow-none border-none bg-transparent',
                formButtonPrimary: 'btn-vintage w-full',
                socialButtonsBlockButton: 'btn-secondary w-full',
                formFieldInput: 'input-vintage',
                footerActionLink: 'text-amber-600 hover:text-amber-700',
              },
            }}
          />

          <p className="text-center text-sm font-ui text-copper-500 mt-6">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-amber-600 hover:text-amber-700 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
