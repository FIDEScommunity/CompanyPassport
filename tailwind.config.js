/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-1": "#17818F",
        "primary-2": "#1FB0C3",
        "primary-3": "#D2EFF3",
        "secondary-1": "#627D8C",
        "secondary-2": "#86ABBF",
        "secondary-3": "#EBECED",
        "accent-1": "#CC4757",
        "accent-2": "#FF596D",
        "accent-3": "#FDDCE0",
      },
    },
  },
  plugins: [],
};
