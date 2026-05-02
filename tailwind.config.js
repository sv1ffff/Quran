/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Responsive typography scale
      fontSize: {
        'xs-responsive': ['0.75rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        'sm-responsive': ['0.875rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        'base-responsive': ['1rem', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
        'lg-responsive': ['1.125rem', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
        'xl-responsive': ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.02em' }],
        '2xl-responsive': ['1.5rem', { lineHeight: '1.4', letterSpacing: '-0.02em' }],
        '3xl-responsive': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        '4xl-responsive': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.03em' }],
      },
      // Mobile-first breakpoints (default is mobile-first)
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
  darkMode: "class",
};
