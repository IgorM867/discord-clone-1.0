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
        "d-black": "#23272A",
        "d-dark-black": "#1e2124",
        "d-dark-gray": "#282b30",
        "d-gray": "#424549",
        "d-light-gray": "#D9D9D9",
        "d-purple": "#5865F2",
        "d-white": "#FFFFFF",
        "d-green": "#2E8B57",
      },
    },
  },
  plugins: [],
};
export default config;
