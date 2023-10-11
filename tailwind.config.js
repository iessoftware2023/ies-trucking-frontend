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
        primary: {
          50: "#fffada",
          100: "#fff0ad",
          200: "#ffe77d",
          300: "#ffdd4b",
          400: "#ffd31a", // primary
          500: "#e6ba00",
          600: "#b39000",
          700: "#806700",
          800: "#4e3e00",
          900: "#1c1500",
        },
        secondary: {
          50: "#eef1fd",
          100: "#d0d5e4",
          200: "#b2b8cd",
          300: "#949cb8",
          400: "#7580a3",
          500: "#5b6789",
          600: "#47506b",
          700: "#32394d", // primary
          800: "#1d2230",
          900: "#070b16",
        },
        zinc: {
          50: "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          400: "#a1a1aa",
          500: "#71717a",
          600: "#606060",
          700: "#3f3f46",
          800: "#27272a",
          900: "#18181b",
          950: "#09090b",
        },
        indigo: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#5B5FC7",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
        },
        neutral: {
          50: "#F5F5F6",
          100: "#E1E1E2",
          200: "#D2D2D4",
          300: "#BDBDC0",
          400: "#B1B1B4",
          500: "#9D9DA1",
          600: "#8F8F93",
          700: "#6F6F72",
          800: "#565659",
          900: "#424244",
          black: "#19191A",
        },
      },
      height: {
        content: "calc(100vh - 72px)",
      },
      zIndex: {
        1: 1,
        2: 2,
        3: 3,
      },
      fontFamily: {
        Inter: ["var(--font-inter)"],
      },
    },
  },
  plugins: [],
};
