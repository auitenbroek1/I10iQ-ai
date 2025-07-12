/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1f2640',
        // golden: '#eab200', // Replaced with blue-purple gradient
        primary: '#2563eb', // blue-600
        secondary: '#9333ea', // purple-600
        blurple: '#5c4bea', // Perfect mix of blue-600 and purple-600
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideInRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(50px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
      },
      boxShadow: {
        'custom': '0 10px 40px rgba(31, 38, 64, 0.1)',
        'primary': '0 10px 40px rgba(37, 99, 235, 0.3)', // blue shadow
        'secondary': '0 10px 40px rgba(147, 51, 234, 0.3)', // purple shadow
      },
    },
  },
  plugins: [],
}