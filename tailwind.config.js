module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb', // Blue-600
          light: '#3b82f6',   // Blue-500
          dark: '#1e40af',    // Blue-800
        },
        background: {
          DEFAULT: '#111827', // Slate-900
          light: '#1e293b',   // Slate-800
          dark: '#0a0f1a',    // Custom dark
        },
        surface: {
          DEFAULT: '#1e293b', // Slate-800
          light: '#334155',   // Slate-700
        },
        border: {
          DEFAULT: '#334155', // Slate-700
        },
        text: {
          DEFAULT: '#e5e7eb', // Gray-200
          muted: '#94a3b8',   // Slate-400
        },
        white: '#fff',
        black: '#000',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        lg: '0.75rem',
        xl: '1rem',
      },
      boxShadow: {
        'soft': '0 2px 8px 0 rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}
