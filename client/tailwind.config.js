/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-hide': {
          /* Hide scrollbar for Firefox */
          scrollbarWidth: 'none', /* Firefox */

          /* Hide scrollbar for IE, Edge, and Safari */
          '-ms-overflow-style': 'none', /* IE and Edge */

          /* Hide scrollbar for Chrome, Safari, and Opera */
          '&::-webkit-scrollbar': {
            display: 'none' /* Safari and Opera */
          }
        }
      };
      addUtilities(newUtilities);
    }
  ],
}