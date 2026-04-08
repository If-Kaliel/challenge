/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs:      '480px',   // Mobile (obrigatório: até 480px)
      sm:      '640px',
      md:      '768px',   // Tablet (obrigatório: 768px)
      lg:      '1024px',
      desktop: '992px',   // Desktop (obrigatório: 992px+)
      xl:      '1280px',
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4f46e5',
          dark:    '#3730a3',
        },
        accent:  '#06b6d4',
        accent2: '#8b5cf6',
        surface: '#ffffff',
        brand: {
          bg:   '#f0f2ff',
          dark: '#0f0f1a',
          text: '#1e1b4b',
        },
        border: '#e0e7ff',
        muted:  '#6b7280',
      },
      fontFamily: {
            'header-gradient':  'linear-gradient(90deg, #141a3a 0%, #243a73 100%)',
      },
      borderRadius: {
            'footer-gradient':  'linear-gradient(90deg, #141a3a 0%, #243a73 100%)',
        md:    '10px',
        lg:    '14px',
        xl:    '18px',
        '2xl': '20px',
      },
      boxShadow: {
        sm:  '0 2px 8px rgba(79, 70, 229, 0.08)',
        md:  '0 8px 32px rgba(79, 70, 229, 0.14)',
        lg:  '0 16px 48px rgba(79, 70, 229, 0.18)',
        btn: '0 8px 28px rgba(79, 70, 229, 0.35)',
      },
      backgroundImage: {
        'hero-gradient':    'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e3a5f 100%)',
        'header-gradient':  'linear-gradient(90deg, #141a3a 0%, #243a73 100%)',
        'btn-gradient':     'linear-gradient(135deg, #4f46e5 0%, #8b5cf6 100%)',
        'feature-gradient': 'linear-gradient(135deg, #eff6ff 0%, #f5f3ff 100%)',
        'footer-gradient':  'linear-gradient(90deg, #141a3a 0%, #243a73 100%)',
      },
    },
  },
  plugins: [],
}
