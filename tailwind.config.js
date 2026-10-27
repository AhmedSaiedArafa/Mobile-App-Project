/** @type {import('tailwindcss').Config} */
const v = (name) => `var(--${name})`;

module.exports = {
  content: ['./App.js', './src/**/*.{js,jsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: v('background'),
        surface: v('surface'),
        'surface-alt': v('surface-alt'),
        field: v('input'),
        ink: v('text'),
        muted: v('text-muted'),
        faint: v('text-faint'),
        line: v('border'),
        primary: v('primary'),
        'primary-soft': v('primary-soft'),
        'on-soft': v('on-soft'),
        hero: v('hero'),
        'hero-line': v('hero-border'),
        'hero-inner': v('hero-inner'),
        success: v('success'),
        'success-soft': v('success-soft'),
        danger: v('danger'),
        'danger-soft': v('danger-soft'),
        warning: v('warning'),
        tabbar: v('tab-bar'),
        overlay: v('overlay'),
        tile: Object.fromEntries(['purple', 'green', 'blue', 'orange'].map((n) => [n, v(`tile-${n}`)])),
      },
    },
  },
  plugins: [],
};
