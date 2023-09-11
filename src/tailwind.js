module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      black: '#000000',
      blue: '#041d59',
      grey: {
        light: '#f1f5f8',
        default: '#6e7d95'
      },
      teal: {
        light: '#00ebcb',
        default: '#14b8a6',
        dark: '#00a1a7',
        darkest: '#025659'
      },
      transparent: 'transparent',
      white: '#ffffff'
    },
    extend: {},
    container: {
      center: true,
      padding: '1rem'
    }
  },
  variants: {},
  plugins: [],
}
