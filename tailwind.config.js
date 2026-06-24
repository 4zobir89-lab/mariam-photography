/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Instrument Serif'", 'serif'],
        body: ["'Barlow'", 'sans-serif'],
        arabicHeading: ["'Amiri'", 'serif'],
        arabicBody: ["'Noto Kufi Arabic'", 'sans-serif'],
      },
      colors: {
        bg: 'var(--bg)',
        bg2: 'var(--bg2)',
        bg3: 'var(--bg3)',
        fg: 'var(--fg)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
        'accent-dim': 'var(--accent-dim)',
        line: 'var(--line)',
      },
      animation: {
        'float-particle': 'floatP 8s ease-in-out infinite',
      },
      keyframes: {
        floatP: {
          '0%, 100%': { transform: 'translateY(0) scale(1)', opacity: '0.2' },
          '50%': { transform: 'translateY(-30px) scale(1.3)', opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
};
