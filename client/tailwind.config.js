/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          DEFAULT: "#7EAFD0",
          400: "#98C1DC",
          500: "#7EAFD0",
          600: "#6093B5",
        },
        void: {
          DEFAULT: "#08080C",
          dark: "#050508",
          surface: "#0E131F",
          card: "#121927",
        },
        neon: {
          cyan: "#00F0FF",
          purple: "#9D4EDD",
          ice: "#D4E9F7",
        }
      },
      fontFamily: {
        display: ['"Bebas Neue"', '"Syne"', 'sans-serif'],
        mono: ['"Space Grotesk"', '"JetBrains Mono"', 'monospace'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      letterSpacing: {
        widest: "0.25em",
        mega: "0.35em",
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
      }
    },
  },
  plugins: [],
}
