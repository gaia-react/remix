import {addons} from '@storybook/preview-api';
import type {Preview} from '@storybook/react';
import {themes} from '@storybook/theming';
import isChromatic from 'chromatic/isChromatic';
import {DARK_MODE_EVENT_NAME} from 'storybook-dark-mode';
import Chromatic from './decorators/chromatic';
import Wrap from './decorators/wrap';
import i18n from './i18next';
import viewport from './viewport';
import './env';
import '~/styles/tailwind.css';

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
      },
      darkClass: ['dark', 'bg-grey-900', 'text-white'],
      light: {
        ...themes.light,
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
