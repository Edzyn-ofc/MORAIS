/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Verde principal — folha madura
        brand: {
          50: '#f3f7ee',
          100: '#e4eed8',
          200: '#c9ddb3',
          300: '#a5c686',
          400: '#82ad5e',
          500: '#63913f',  // primário
          600: '#4c7330',
          700: '#3c5a27',
          800: '#324a22',
          900: '#2b3f20',
          950: '#15220f',
        },
        // Dourado — colheita / destaque
        gold: {
          50: '#fdf9ed',
          100: '#f9efcc',
          200: '#f2dc95',
          300: '#ebc35e',
          400: '#e5ad39',
          500: '#d68f1d',  // acento
          600: '#b96c16',
          700: '#944d15',
          800: '#7a3d18',
          900: '#683418',
          950: '#3c190a',
        },
        // Terra / terracota — apoio
        clay: {
          50: '#faf6f2',
          100: '#f3eae1',
          200: '#e6d3c1',
          300: '#d5b599',
          400: '#c2906c',
          500: '#b37450',
          600: '#a55d44',
          700: '#894939',
          800: '#703d33',
          900: '#5c342c',
          950: '#311a15',
        },
        // Creme — fundos claros
        cream: {
          50: '#fdfbf7',
          100: '#faf6ee',
          200: '#f3ecdd',
          300: '#eadfc4',
          400: '#dfcaa3',
        },
        // Carvão — textos e escuros
        ink: {
          800: '#20241f',
          900: '#14170f',
          950: '#0a0c07',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'count-up': 'countUp 2s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};