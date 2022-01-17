module.exports = {
  mode: "jit",  // just-in-time compilation
  content: [
    './src/client/**/*.{html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      padding: {
        '1/2': '50%',
        full: '100%',
      },
    },
  },
  plugins: [],
}
