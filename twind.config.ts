import { Options } from "$fresh/plugins/twind.ts";

/** @type {import('twind').Configuration} */
export default {
  selfURL: import.meta.url,
  preflight: {
    "@import":
      "url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600;700&display=swap')",
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
        serif: ["Bebas Neue", "cursive"],
      },
    },
  },
} as Options;
