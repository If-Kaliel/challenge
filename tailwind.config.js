/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    /**
     * BREAKPOINTS — Media Queries responsivas
     * Cobre os 5 níveis exigidos pela rubrica de avaliação:
     *
     *  xs      → eXtraSmall  (≥ 480px)  — Mobile grande / phablet
     *  sm      → SMall       (≥ 640px)  — Mobile largo / iPhone Pro Max
     *  md      → MeDium      (≥ 768px)  — Tablet (iPad)
     *  lg      → Large       (≥ 1024px) — Laptop / Desktop compacto
     *  desktop → Desktop     (≥ 992px)  — Breakpoint custom do projeto
     *  xl      → eXtra-Large (≥ 1280px) — Desktop wide / Full HD
     *
     * Uso nos componentes: className="base xs:... sm:... md:... lg:... xl:..."
     */
    screens: {
      xs:      '480px',
      sm:      '640px',
      md:      '768px',
      desktop: '992px',
      lg:      '1024px',
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
        sans: ['Inter', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        sm:    '8px',
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
        'header-gradient':  'linear-gradient(90deg, #0f0f1a 0%, #1e1b4b 100%)',
        'btn-gradient':     'linear-gradient(135deg, #4f46e5 0%, #8b5cf6 100%)',
        'feature-gradient': 'linear-gradient(135deg, #eff6ff 0%, #f5f3ff 100%)',
        'footer-gradient':  'linear-gradient(90deg, #0f0f1a 0%, #1e1b4b 100%)',
      },
    },
  },
  plugins: [],
}
