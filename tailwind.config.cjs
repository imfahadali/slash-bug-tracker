/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    },
    extend: {
      backgroundColor: {
        "gray-50": "rgb(249 250 251)"
      },
      fontSize: {
        "xxs": ['10px', '13px'],

      },
      flex: {
        2: "2 1 0%",
        3: "3 1 0%",
        4: "4 1 0%",
        6: "6 1 0%",
      },
      saturate: {
        69: "69.99"
      }
    },
    minWidth: {
      '300px': '300px',
    }
  },
  
  plugins: [],
  variants: {
    extend: {
      focus: ['group-hover'],
    },
    backgroundColor: ['checked'],
  },
};
