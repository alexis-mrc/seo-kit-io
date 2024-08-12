const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  safelist: [
    'object-none',
    'object-contain',
    'object-cover',
    'object-fill',
    'object-none',
    'object-scale-down'
  ],
  theme: {
    extend: {
      fontFamily: {
        'title': ['Bricolage Grotesque', 'sans-serif', 'system-ui'],
      },
      borderRadius: {
        '4xl': '3rem',
        'pill': '9999rem'
      },
      colors: {
        black: colors.black,
        white: colors.white,
        success: colors.emerald,
        warning: colors.orange,
        error: colors.red,
        primary: {
          '50': '#edf9ff',
          '100': '#d6f0ff',
          '200': '#b5e7ff',
          '300': '#83d9ff',
          '400': '#48c2ff',
          '500': '#1ea2ff',
          '600': '#0683ff',
          '700': '#0068f0',
          '800': '#0854c5',
          '900': '#0d4a9b',
          '950': '#0e2e5d',
        },
        secondary: {
          '50': '#fff0fd',
          '100': '#ffe3fd',
          '200': '#ffc6fc',
          '300': '#ff98f8',
          '400': '#ff58f0',
          '500': '#ff27e2',
          '600': '#f000bc',
          '700': '#df00a3',
          '800': '#b80086',
          '900': '#980371',
          '950': '#5f0041',
        },
        neutral: {
          50: '#f3f2f2',
          100: '#e6e5e6',
          200: '#cdcbcd',
          300: '#b4b1b3',
          400: '#a39fa2',
          500: '#827d81',
          600: '#686467',
          700: '#4e4b4d',
          800: '#343234',
          900: '#1a191a',
          950: '#0d0c0d',
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
