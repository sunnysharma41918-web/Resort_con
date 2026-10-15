/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: {
          DEFAULT: '#FAED26',
          light: '#FFF36D',
          dark: '#E5D715',
          glow: 'rgba(250, 237, 38, 0.42)',
        },
        obsidian: {
          DEFAULT: '#46344E',
          dark: '#322538',
          darkest: '#221827',
        },
        deepteal: {
          DEFAULT: '#5A5560',
          hover: '#48444E',
          light: '#6E6975',
        },
        teal: {
          DEFAULT: '#FAED26',
          light: '#FFF36D',
          dark: '#E5D715',
          glow: 'rgba(250, 237, 38, 0.42)',
        },
        mint: {
          DEFAULT: '#F4F0F2',
          50: '#FAF8F9',
          100: '#F4F0F2',
          200: '#ECE6E9',
          300: '#DDD5D9',
        },
        snow: {
          DEFAULT: '#FEFFFF',
        },
        // Backwards compatibility mappings for existing classes
        cream: {
          DEFAULT: '#F5F1F3',
          50: '#FEFFFF',
          100: '#FAF8F9',
          200: '#F4F0F2',
          300: '#ECE6E9',
          400: '#DDD5D9',
        },
        sand: {
          DEFAULT: '#ECE6E9',
          light: '#FAF8F9',
          dark: '#5A5560',
        },
        coral: {
          DEFAULT: '#FAED26',
          soft: '#FFF36D',
          dark: '#E5D715',
          glow: 'rgba(250, 237, 38, 0.42)',
        },
        taupe: {
          DEFAULT: '#9D8D8F',
          dark: '#5A5560',
          light: '#B4A7A9',
        },
        terracotta: {
          DEFAULT: '#9B786F',
          dark: '#7D5F57',
          light: '#B4938B',
        },
        plum: {
          DEFAULT: '#46344E',
          dark: '#322538',
          darkest: '#221827',
        },
        slate: {
          DEFAULT: '#5A5560',
          dark: '#46344E',
          light: '#9D8D8F',
        },
      },
      fontFamily: {
        sans: ['"Satoshi"', '"Plus Jakarta Sans"', '"Noto Sans Devanagari"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        satoshi: ['"Satoshi"', '"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Canicule Display"', '"Playfair Display"', 'serif'],
        heading: ['"Canicule Display"', '"Playfair Display"', 'serif'],
        champ: ['"Champ"', '"Syne"', '"Outfit"', 'sans-serif'],
        rader: ['"Rader"', '"PP Rader"', '"Syne"', 'sans-serif'],
        editorial: ['"Rader"', '"Canicule Display"', '"Playfair Display"', 'serif'],
        canicule: ['"Canicule Display"', 'serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        devanagari: ['"Noto Sans Devanagari"', '"Satoshi"', 'sans-serif'],
      },
      maxWidth: {
        'container': '1360px',
        'narrow': '860px',
      },
      borderRadius: {
        'pill': '9999px',
        'hero': '36px',
      },
    },
  },
  plugins: [],
};
