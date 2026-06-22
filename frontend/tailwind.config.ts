import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#1A1410',
        parchment: '#F7F3EC',
        cream: '#EDE6D8',
        amber: {
          DEFAULT: '#C8956C',
          50: '#FBF4EE',
          100: '#F5E5D5',
          200: '#ECCBAA',
          300: '#DCAA78',
          400: '#C8956C',
          500: '#B57D4F',
          600: '#9A6340',
          700: '#7D4D33',
          800: '#5F3926',
          900: '#42271A',
        },
        gold: {
          DEFAULT: '#B8924F',
          50: '#FBF6EC',
          100: '#F3E8CF',
          200: '#E7D19F',
          300: '#D4B56A',
          400: '#B8924F',
          500: '#9A7640',
          600: '#7C5C33',
          700: '#5E4427',
          800: '#422F1C',
          900: '#2A1E12',
        },
        copper: {
          DEFAULT: '#A67C52',
          50: '#F9F3ED',
          100: '#F0E0D0',
          200: '#E1C2A3',
          300: '#CDA075',
          400: '#A67C52',
          500: '#8A6544',
          600: '#6E4F37',
          700: '#533B2A',
          800: '#3A2A1E',
          900: '#241A13',
        },
        surface: {
          primary: '#FAF8F4',
          secondary: '#F0EBE1',
          elevated: '#FFFFFF',
        },
        success: '#6B8F5E',
        warning: '#D4A54A',
        error: '#B85450',
        info: '#5A7D8C',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['Crimson Text', 'serif'],
        ui: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px rgba(26, 20, 16, 0.06)',
        'warm': '0 4px 20px rgba(26, 20, 16, 0.08)',
        'warm-md': '0 6px 30px rgba(26, 20, 16, 0.10)',
        'warm-lg': '0 8px 40px rgba(26, 20, 16, 0.12)',
        'warm-xl': '0 16px 60px rgba(26, 20, 16, 0.16)',
        'glow-amber': '0 0 40px rgba(200, 149, 108, 0.3)',
        'glow-gold': '0 0 40px rgba(184, 146, 79, 0.3)',
        'inner-warm': 'inset 0 2px 8px rgba(26, 20, 16, 0.04)',
      },
      backgroundImage: {
        'gradient-warm': 'linear-gradient(135deg, #F7F3EC 0%, #EDE6D8 50%, #E4D9C8 100%)',
        'gradient-gold': 'linear-gradient(135deg, #C8956C 0%, #B8924F 50%, #A67C52 100%)',
        'gradient-dark': 'linear-gradient(180deg, #1A1410 0%, #2D2318 100%)',
        'gradient-amber-subtle': 'linear-gradient(135deg, rgba(200,149,108,0.1) 0%, rgba(184,146,79,0.05) 100%)',
        'gradient-radial-amber': 'radial-gradient(circle at 50% 50%, rgba(200,149,108,0.15) 0%, transparent 70%)',
        'shimmer': 'linear-gradient(90deg, transparent 0%, rgba(200,149,108,0.08) 50%, transparent 100%)',
      },
      animation: {
        'waveform': 'waveform 1.5s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.5s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'scale-in': 'scale-in 0.3s ease-out forwards',
        'slide-up-fade': 'slide-up-fade 0.5s ease-out forwards',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-ring': 'pulse-ring 1.5s ease-out infinite',
      },
      keyframes: {
        'waveform': {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(1.3)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(200, 149, 108, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(200, 149, 108, 0.4)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-up-fade': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
      },
      perspective: {
        '1000': '1000px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
