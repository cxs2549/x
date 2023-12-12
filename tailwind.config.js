/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      screens: {
        xxs: "450px",
        xs: "516px",
        sm: "680px",
        md: "720px",
        lg: "1018px"
      },

      colors: {
        brand: "#1D9BF0",
        fade: "#71767B",
        spotty: "#121212"
      }
    }
  },
  plugins: []
}
