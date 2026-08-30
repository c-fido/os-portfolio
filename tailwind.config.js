/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:  ['Tahoma', '"MS Sans Serif"', '"Segoe UI"', 'Arial', 'sans-serif'],
        mono:  ['"Courier New"', 'Courier', 'monospace'],
      },
      colors: {
        w95: {
          desktop:        '#008080',
          surface:        '#c0c0c0',
          text:           '#000000',
          'text-disabled':'#808080',
          'text-inv':     '#ffffff',
          'title-active': '#000080',
          'title-inactive':'#808080',
          highlight:      '#000080',
          'border-light': '#ffffff',
          'border-dark':  '#808080',
          'border-darker':'#000000',
        },
      },
    },
  },
  plugins: [],
}
