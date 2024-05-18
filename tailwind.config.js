/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
 
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'custom-green': '#2eca6a',
        'grey-1':'#555',
        'grey-2':'#adadad'
      },
      screens: {
        'max-320': {'max': '320px'},
      },
      boxShadow: {
        'buttonShadow': '0 10px 20px -8px rgba(0, 0, 0, 0.7)',
      },  
    },
  
  },
  plugins: [],
};
