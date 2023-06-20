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
          400: '#ffd31a', // primary
          500: '#e6ba00',
          600: '#b39000',
          700: '#806700',
          800: '#4e3e00',
          900: '#1c1500',
        },
        secondary:
        {
          50: '#eef1fd',
          100: '#d0d5e4',
          200: '#b2b8cd',
          300: '#949cb8',
          400: '#7580a3',
          500: '#5b6789',
          600: '#47506b',
          700: '#32394d', // primary
          800: '#1d2230',
          900: '#070b16',
        }
      }
    },
  },
  plugins: [],
};
