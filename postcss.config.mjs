let cssnano = {};

if (process.env.NODE_ENV === 'production') {
  cssnano = {
    cssnano: {
      preset: ['default', {discardComments: {removeAll: true}}],
    },
  };
}

export default {
  plugins: {
    autoprefixer: {},
    'postcss-import': {},
    tailwindcss: {},
    'tailwindcss/nesting': {},
    ...cssnano,
  },
};
