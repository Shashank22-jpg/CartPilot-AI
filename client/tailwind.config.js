/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paypal: {
          blue: '#0070BA',
          darkBlue: '#003087',
          lightBlue: '#00CFDE',
        },
        brand: {
          primary: '#2563eb',
          secondary: '#4f46e5',
          accent: '#06b6d4',
          dark: '#0f172a',
          surface: '#1e293b',
        }
      },
    },
  },
  plugins: [],
};
