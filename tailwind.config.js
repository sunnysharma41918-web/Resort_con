/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'night-sand': '#CBBD93',
        'night-cream': '#FAE8B4',
        'night-taupe': '#80775C',
        'night-olive': '#574A24',
        yellow: {
          DEFAULT: '#CBBD93',
          light: '#FAE8B4',
          dark: '#80775C',
          glow: 'rgba(203, 189, 147, 0.42)',
        },
        obsidian: {
          DEFAULT: '#574A24',
          dark: '#453a1c',
          darkest: '#2d2612',
        },
        deepteal: {
          DEFAULT: '#80775C',
          hover: '#6f674f',
          light: '#9e9477',
        },
        teal: {
          DEFAULT: '#CBBD93',
          light: '#FAE8B4',
          dark: '#80775C',
          glow: 'rgba(203, 189, 147, 0.42)',
        },
        mint: {
          DEFAULT: '#FAF6EC',
          50: '#FAF8F2',
          100: '#FAF6EC',
          200: '#F3ECE0',
          300: '#E8DDCB',
        },
        snow: {
          DEFAULT: '#FAF8F2',
        },
        cream: {
          DEFAULT: '#FAE8B4',
          50: '#FAF8F2',
          100: '#FAF6EC',
          200: '#F5EECF',
          300: '#FAE8B4',
          400: '#E5D39D',
        },
        sand: {
          DEFAULT: '#CBBD93',
          light: '#FAF6EC',
          dark: '#80775C',
        },
        coral: {
          DEFAULT: '#CBBD93',
          soft: '#FAE8B4',
          dark: '#80775C',
          glow: 'rgba(203, 189, 147, 0.42)',
        },
        taupe: {
          DEFAULT: '#80775C',
          dark: '#574A24',
          light: '#9e9477',
        },
        terracotta: {
          DEFAULT: '#80775C',
          dark: '#574A24',
          light: '#CBBD93',
        },
        plum: {
          DEFAULT: '#574A24',
          dark: '#453a1c',
          darkest: '#2d2612',
        },
        slate: {
          DEFAULT: '#80775C',
          dark: '#574A24',
          light: '#CBBD93',
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
        cormorant: ['"Cormorant Garamond"', 'serif'],
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
