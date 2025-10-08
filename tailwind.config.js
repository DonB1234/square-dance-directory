/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // 👈 tells Tailwind to scan your src folder
    "./public/index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
