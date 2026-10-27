module.exports = {
  content: [
    './app.js',
    './style.js',
    './screens/**/*.js',
    './component/**/*.js',
    './navigation/**/*.js',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#4237D6',
        'primary-light': '#EEEBFF',
        'on-primary': '#D9D4FF',
        canvas: '#F6F7FC',
        ink: '#1C1B3A',
        muted: '#6B6A85',
        line: '#DADCEE',
        divider: '#EEEFF7',
        dash: '#9B98C9',
        track: '#E9EAF6',
        note: '#3B3680',
        danger: '#C73450',
        success: '#0B7A52',
        'success-bg': '#E3F7EF',
      },
    },
  },
  plugins: [],
};
