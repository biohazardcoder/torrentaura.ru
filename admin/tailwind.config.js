/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainText: '#fff',
        mainBg: '#141414',
        sidebarBg: '#1b2b34',
        sidebarText: '#c0c0c0',
        highlight: '#4ade80',
        highlightText: '#ffffff',
        hoverBg: '#37474f',
        hoverText: '#ffffff',
        dashboardBg: 'rgb(222 252 231)',
        accent: '#4ade80'
      },
    },
  },
  plugins: [],
};
