/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [],
    theme: {
      extend: {
        colors: {
          green: '#22c55e',
          red: '#ef4444',
          blue: '#1d4ed8',
        }
      },
    },
    plugins: [require("daisyui")],
    daisyui: {
        darkTheme: 'light'
    }
  }