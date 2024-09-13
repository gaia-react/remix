/* eslint-disable import/no-extraneous-dependencies */
import aspectRatioPlugin from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import colors from 'tailwindcss/colors';

const isDevelopment =
  process.env.NODE_ENV !== 'production' || process.env.SB === '1';

const customColors = Object.keys(colors).reduce(
  (acc, key) => {
    // deprecated colors
    if (key === 'gray' || key.includes('Gray') || key === 'lightBlue') {
      return acc;
    }

    // @ts-ignore
    acc[key] = colors[key];

    return acc;
  },
  // replace gray with grey
  {grey: colors.neutral}
);

/** @type {TailwindConfig} */
export default {
  content:
    isDevelopment ?
      ['./app/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}']
    : ['./app/**/*!(.stories).{ts,tsx}'],
  darkMode: 'class',
  plugins: [aspectRatioPlugin, containerQueries, forms, typography],
  theme: {
    colors: customColors,
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        mono: ['Source Code Pro', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      screens: {
        sm: '390px',
      },
    },
  },
};
