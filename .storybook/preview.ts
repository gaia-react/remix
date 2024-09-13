import {config} from '@fortawesome/fontawesome-svg-core';
import {addons} from '@storybook/preview-api';
import type {Preview} from '@storybook/react';
import {themes} from '@storybook/theming';
import isChromatic from 'chromatic/isChromatic';
import {DARK_MODE_EVENT_NAME} from 'storybook-dark-mode';
import Chromatic from './decorators/chromatic';
import Wrap from './decorators/wrap';
import i18n from './i18next';
import brandImage from './static/gaia-logo.png';
import viewport from './viewport';
import 'react-toastify/dist/ReactToastify.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '~/styles/tailwind.css';
import './env';

config.autoAddCss = false;

const BRAND = {
  brandImage,
  brandTarget: '_blank',
  brandTitle: 'GAIA',
  brandUrl: 'https://gaia-react.github.io/docs/',
};

// render dark mode in chromatic snapshots
const isChromaticSnapshot =
  isChromatic() ||
  (process.env.NODE_ENV === 'production' ?
    [...(window?.location.ancestorOrigins || {length: 0})].some((origin) =>
      origin.includes('www.chromatic.com')
    )
    // @ts-ignore
  : false);

const preview: Preview = {
  decorators: isChromaticSnapshot ? [Wrap, Chromatic] : [Wrap],
  initialGlobals: {
    locale: 'en',
    locales: {
      en: {left: '🇺🇸', right: 'en', title: 'English'},
      ja: {left: '🇯🇵', right: 'ja', title: '日本語'},
    },
  },
  parameters: {
    chromatic: {viewports: [1280]},
    controls: {
      expanded: false,
      hideNoControlsWarning: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    darkMode: {
      dark: {
        ...themes.dark,
        ...BRAND,
      },
      darkClass: ['dark', 'bg-grey-900', 'text-white'],
      light: {
        ...themes.light,
        ...BRAND,
      },
      lightClass: ['light', 'bg-white', 'text-grey-900'],
      stylePreview: true,
    },
    i18n,
    layout: 'fullscreen',
    viewport,
  },
};

if (!isChromaticSnapshot) {
  // listen for dark mode toggle changes
  const channel = addons.getChannel();
  channel.on(DARK_MODE_EVENT_NAME, (isDark: boolean) => {
    // eslint-disable-next-line unicorn/prevent-abbreviations
    const docsStory = document.querySelector('.docs-story');

    if (isDark) {
      document.documentElement.classList.add('dark');
      docsStory?.classList.add('bg-grey-900');
      docsStory?.classList.add('text-white');
    } else {
      document.documentElement.classList.remove('dark');
      docsStory?.classList.remove('bg-grey-900');
      docsStory?.classList.remove('text-white');
    }
  });
}

export default preview;
