/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0B0F17',
        'surface-card': '#121824',
        'surface-elevator': '#1A2332',
        border: '#1E293B',
        'shield-cyan': '#00F0FF',
        'terminal-green': '#10B981',
        'warning-orange': '#F59E0B',
        'threat-crimson': '#EF4444',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'cyan-glow': '0 0 25px -5px rgba(0, 240, 255, 0.35)',
        'crimson-glow': '0 0 25px -5px rgba(239, 68, 68, 0.4)',
        'green-glow': '0 0 25px -5px rgba(16, 185, 129, 0.35)',
      }
    },
  },
  plugins: [],
}
