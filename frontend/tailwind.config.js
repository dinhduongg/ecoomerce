/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif']
      },
      keyframes: {
        fadeInDown: {
          '0%': { opacity: 0, transform: 'translate3d(0, -100%, 0)' },
          '100%': { opacity: 1, transform: 'none' }
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translate3d(0, 100%, 0)' },
          '100%': { opacity: 1, transform: 'none' }
        },
        zoomIn: {
          '0%': { opacity: 0, transform: 'scale3d(0.3, 0.3, 0.3)' },
          '50%': { opacity: 1 }
        },
        rollIn: {
          '0%': { opacity: 0, transform: 'translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)' },
          '100%': { opacity: 1, transform: 'none' }
        },
        lightSpeedIn: {
          '0%': { transform: 'translate3d(100%, 0, 0) skewX(-30deg)', opacity: 0 },
          '60%': { transform: 'skewX(20deg)', opacity: 1 },
          '80%': { transform: 'skewX(-5deg)', opacity: 1 },
          '100%': { transform: 'none', opacity: 1 }
        },
        slideInUp: {
          '0%': { transform: 'translate3d(0, 100%, 0)', opacity: 0 },
          '100%': { transform: 'translate3d(0, 0, 0)', opacity: 1 }
        },
        rotateInDownLeft: {
          '0%': { 'transform-origin': 'left bottom', transform: 'rotate3d(0, 0, 1, -45deg)', opacity: 0 },
          '100%': { 'transform-origin': 'left bottom', transform: 'none', opacity: 1 }
        },
        rotateInUpRight: {
          '0%': { 'transform-origin': 'right bottom', transform: 'rotate3d(0, 0, 1, -90deg)', opacity: 0 },
          '100%': { 'transform-origin': 'right bottom', transform: 'none', opacity: 1 }
        },
        rotateIn: {
          '0%': { 'transform-origin': 'center', transform: 'rotate3d(0, 0, 1, -200deg)', opacity: 0 },
          '100%': { 'transform-origin': 'center', transform: 'none', opacity: 1 }
        }
      },
      animation: {
        fadeInDown: 'fadeInDown 0.8s ease-in-out both',
        fadeInUp: 'fadeInUp 0.8s ease-in-out 0.8s both',
        zoomIn: 'zoomIn 0.8s ease-in-out 1.6s both',
        rollIn: 'rollIn 1.5s ease-in-out both',
        lightSpeedIn: 'lightSpeedIn 3.5s ease-in-out 0.5s both',
        slideInUp: 'slideInUp 0.8s ease-in-out 2.5s both',
        rotateInDownLeft: 'rotateInDownLeft 1.5s ease-in-out both',
        rotateInUpRight: 'rotateInUpRight 2s ease-in-out 0.5s both',
        rotateIn: 'rotateIn 1.5s ease-in-out 2s both'
      },
      boxShadow: {
        // new
        'lg-header': '0 1px 5px 0px rgb(0 0 0 / 20%)',
        'lg-cart': '0 3px 5px 0px rgb(0 0 0 / 10%)',

        // old
        'header-btn': 'inset 0 0 0 100px rgb(0 0 0 / 20%)',
        'account-shadow': 'inset 0 1px 1px rgb(0 0 0 / 8%), 0 0 8px rgb(0 0 0 / 20%)'
      },
      colors: {
        // new
        'header-info-bg': '#f5f5f5',
        'button-primary': '#222222',
        'button-hover': '#e65540',
        'text-22': '#222222',
        'text-55': '#555555',
        'text-88': '#888888',
        'text-99': '#999999',
        // old
        primary: '#c89979',
        'header-bg': '#333333',
        'header-border': 'rgba(255, 255, 255, 0.1)',
        text: 'rgba(102,102,102,0.85)'
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
}
