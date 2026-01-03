import { TOKENS } from "./src/design/tokens.js";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: TOKENS.typography.fontFamily.split(","),
      },
      colors: {
        background: TOKENS.colors.background,
        surface: TOKENS.colors.surface,
        surfaceHover: TOKENS.colors.surfaceHover,
        border: TOKENS.colors.border,
        borderStrong: TOKENS.colors.borderStrong,
        text: TOKENS.colors.text,
        module: TOKENS.colors.module,
      },
    },
  },
  plugins: [],
};
