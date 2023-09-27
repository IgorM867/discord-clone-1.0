import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "d-purple": "#5865F2",
        "d-black": "#23272A",
        "d-white": "#FFFFFF",
        "d-gray": "#D9D9D9",
      },
    },
  },
  plugins: [],
};
export default config;
