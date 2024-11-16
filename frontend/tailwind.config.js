/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/pic-04.png')",
        contact: "url('/contactBg.jpg')",
        authBg: "url('/src/assets/images/authBg.png')",
      },
    },
  },
  plugins: [],
};
