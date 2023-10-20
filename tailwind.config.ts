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
        "d-gray": {
          100: "#D9D9D9",
          200: "#424549",
          300: "#282b30",
          400: "#23272A",
          500: "#1e2124",
        },
        "d-purple": "#5865F2",
        "d-white": "#FFFFFF",
        "d-green": "#2E8B57",
      },
    },
  },
  plugins: [],
};
export default config;
