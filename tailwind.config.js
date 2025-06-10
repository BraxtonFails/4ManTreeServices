/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './src/**/*.{html,js}',
    './dist/**/*.{html,js}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
        },
        brown: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          600: '#7c5a3c',
          700: '#5d4037',
          800: '#3e2723',
        },
        brandbrown: '#4B2E19',
        brandburntorange: '#D97A2B',
        brandorange: '#F2B15C',
        brandgreen: '#6B7A3A',
        brandbeige: '#F5E9D3',
        brandblack: '#222222',
        deepbrown: '#4E342E',
        rustorange: '#D35400',
        orangehover: '#E67E22',
      }
    },
  },
  plugins: [],
} 