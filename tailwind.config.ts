import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './stories/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Lumen Night Foundry — OKLCH Palette
        paper: {
          DEFAULT: 'oklch(13% 0.014 265)',
          2: 'oklch(16% 0.016 265)',
          3: 'oklch(19% 0.018 265)',
        },
        rule: {
          DEFAULT: 'oklch(28% 0.012 265)',
          2: 'oklch(34% 0.010 265)',
        },
        neutral: 'oklch(52% 0.008 265)',
        muted: 'oklch(62% 0.006 262)',
        ink: {
          DEFAULT: 'oklch(96% 0.006 262)',
          2: 'oklch(82% 0.006 262)',
        },
        accent: {
          DEFAULT: 'oklch(76% 0.17 50)',
          hover: 'oklch(82% 0.18 50)',
          2: 'oklch(68% 0.16 18)',
        },
        glow: {
          DEFAULT: 'oklch(80% 0.16 50 / 0.42)',
          2: 'oklch(80% 0.14 50 / 0.12)',
        },
        'paper-emit': 'oklch(76% 0.17 50 / 0.04)',
        focus: 'oklch(76% 0.17 50)',
        'rule-blueprint': 'oklch(96% 0.006 262 / 0.04)',
        'card-radial': {
          rest: 'oklch(76% 0.17 50 / 0.04)',
          hover: 'oklch(76% 0.17 50 / 0.10)',
        },
        danger: 'oklch(62% 0.22 25)',
        // Semantic aliases
        background: 'var(--color-paper)',
        foreground: 'var(--color-ink-2)',
        primary: 'var(--color-accent)',
        'primary-hover': 'var(--color-accent-hover)',
        secondary: 'var(--color-paper-2)',
        'secondary-foreground': 'var(--color-ink-2)',
        border: 'var(--color-rule)',
        ring: 'var(--color-focus)',
        muted: 'var(--color-paper-2)',
        'muted-foreground': 'var(--color-muted)',
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"Geist"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        label: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        display: ['clamp(3rem, 5vw + 1rem, 5.5rem)', { lineHeight: '1.02', letterSpacing: '-0.032em' }],
        'display-s': ['clamp(1.8rem, 3vw + 0.6rem, 2.8rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        '2xl': ['2rem', { lineHeight: '1.2' }],
        xl: ['1.5rem', { lineHeight: '1.3' }],
        lg: ['1.125rem', { lineHeight: '1.5' }],
        md: ['1rem', { lineHeight: '1.55' }],
        sm: ['0.875rem', { lineHeight: '1.5' }],
        xs: ['0.75rem', { lineHeight: '1.5' }],
        micro: ['0.6875rem', { lineHeight: '1.4' }],
      },
      letterSpacing: {
        tight: '-0.032em',
        display: '-0.02em',
        micro: '0.10em',
      },
      spacing: {
        '3xs': '0.125rem',
        '2xs': '0.25rem',
        xs: '0.5rem',
        sm: '0.75rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2.5rem',
        '2xl': '4rem',
        '3xl': '6rem',
        '4xl': '9rem',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
        xl: '20px',
        pill: '9999px',
      },
      transitionDuration: {
        micro: '120ms',
        short: '220ms',
        long: '420ms',
        pulse: '4s',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
        in: 'cubic-bezier(0.7, 0, 0.84, 0)',
        'in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
        soft: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      boxShadow: {
        base: '0 4px 16px oklch(0% 0 0 / 0.4)',
        raised: '0 10px 30px oklch(0% 0 0 / 0.4), 0 0 24px oklch(76% 0.17 50 / 0.12)',
        glow: '0 0 24px oklch(76% 0.17 50 / 0.6)',
        'glow-strong': '0 0 36px oklch(82% 0.18 50 / 0.8)',
      },
      zIndex: {
        base: '1',
        raised: '10',
        dropdown: '100',
        sticky: '200',
        modal: '400',
        toast: '500',
        5: '5',
        10: '10',
        20: '20',
        30: '30',
        40: '40',
        50: '50',
      },
      width: {
        '8.5': '2.125rem',
        '17': '4.25rem',
      },
      height: {
        '8.5': '2.125rem',
        '17': '4.25rem',
      },
      maxWidth: {
        page: '1240px',
      },
      keyframes: {
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pivot-underline': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'spin-gimbal-outer': {
          '0%': { transform: 'rotateX(65deg) rotateY(15deg) rotateZ(0deg)' },
          '100%': { transform: 'rotateX(65deg) rotateY(15deg) rotateZ(360deg)' },
        },
        'spin-gimbal-mid': {
          '0%': { transform: 'rotateX(-40deg) rotateY(55deg) rotateZ(0deg)' },
          '100%': { transform: 'rotateX(-40deg) rotateY(55deg) rotateZ(360deg)' },
        },
        'spin-gimbal-inner': {
          '0%': { transform: 'rotateX(30deg) rotateY(-45deg) rotateZ(0deg)' },
          '100%': { transform: 'rotateX(30deg) rotateY(-45deg) rotateZ(360deg)' },
        },
        'spin-concentric': {
          '0%': { transform: 'translateZ(12px) rotate(0deg)' },
          '100%': { transform: 'translateZ(12px) rotate(360deg)' },
        },
        'flare-breathe': {
          '0%': { transform: 'scale(0.9)', opacity: '0.4' },
          '100%': { transform: 'scale(1.25)', opacity: '0.85' },
        },
        'shockwave-expand': {
          '0%': { transform: 'translateZ(24px) scale(1)', opacity: '0.9' },
          '100%': { transform: 'translateZ(24px) scale(4.8)', opacity: '0' },
        },
        'conduit-flow': {
          '0%': { strokeDashoffset: '0' },
          '100%': { strokeDashoffset: '-64' },
        },
        'icon-flip-3d': {
          '0%': { transform: 'rotateY(0deg) scale(1)' },
          '50%': { transform: 'rotateY(90deg) scale(1.25)' },
          '100%': { transform: 'rotateY(0deg) scale(1)' },
        },
      },
      animation: {
        reveal: 'reveal 420ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pivot-underline': 'pivot-underline 320ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 900ms backwards',
        'spin-gimbal-outer': 'spin-gimbal-outer 28s linear infinite',
        'spin-gimbal-mid': 'spin-gimbal-mid 18s linear infinite reverse',
        'spin-gimbal-inner': 'spin-gimbal-inner 12s linear infinite',
        'spin-concentric': 'spin-concentric 8s linear infinite',
        'flare-breathe': 'flare-breathe 3s ease-in-out infinite alternate',
        'shockwave-expand': 'shockwave-expand 800ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'conduit-flow': 'conduit-flow 16s linear infinite',
        'icon-flip-3d': 'icon-flip-3d 340ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;