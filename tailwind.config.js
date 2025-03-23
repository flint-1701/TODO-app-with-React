/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {  
      fontFamily: {
        'your-font': ['sans-serif', /* Add fallback fonts if needed */],
      },  
    },
  },
  plugins: [],
}