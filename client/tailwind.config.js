/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "brand-gradient": "linear-gradient(to bottom right, #a5f3fc, #8b5cf6, #ec4899)",
        // or use the CSS variable if you prefer
        // "brand-gradient": "var(--brand-gradient)",
      },
    },
  },
  plugins: [],
};
