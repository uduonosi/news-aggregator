import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "active:bg-blue-800",
    "active:bg-zinc-200",
    "hover:bg-blue-700",
    "hover:bg-zinc-100",
    "bg-blue-600",
    "bg-white",
    "text-white",
    "text-zinc-800",
    "border-blue-600",
    "border-zinc-300",
  ],
  theme: {
    extend: {
      colors: {
        blue: defaultTheme.colors.blue,
        zinc: defaultTheme.colors.zinc,
      },
    },
  },
  darkMode: "class",
  plugins: [],
};

export default config;
