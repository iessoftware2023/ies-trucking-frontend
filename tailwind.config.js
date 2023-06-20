/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:
        {
          50: '#fffada',
          100: '#fff0ad',
          200: '#ffe77d',
          300: '#ffdd4b',
          400: '#ffd31a',
          500: '#e6ba00',
          600: '#b39000',
          700: '#806700',
          800: '#4e3e00',
          900: '#1c1500',
        }
      }
    },
  },
  plugins: [],
};
