/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        rojo: { DEFAULT: '#E22520', oscuro: '#B81C18', suave: '#FFFFFF' },
        onix: '#1A1A1A',
        plata: { DEFAULT: '#E2E2E2', claro: '#F6F6F6' },
        texto: '#5E5E5E',
        dentro: { DEFAULT: '#14804A', suave: '#FFFFFF' },
        salio: { DEFAULT: '#1D4ED8', suave: '#FFFFFF' },
      },
      fontFamily: {
        display: ['Bebas Neue', 'Oswald', 'Impact', 'sans-serif'],
        sans: ['Barlow', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
