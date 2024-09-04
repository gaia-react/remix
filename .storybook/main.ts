import type {StorybookConfig} from '@storybook/react-vite';
import {mergeConfig} from 'vite';
import turbosnap from 'vite-plugin-turbosnap';
import tsconfigPaths from 'vite-tsconfig-paths';

const config: StorybookConfig = {
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
        grid: false,
        measure: false,
        outline: false,
      },
    },
    '@storybook/addon-interactions',
    'storybook-react-i18next',
    'storybook-dark-mode',
    '@chromatic-com/storybook',
  ],

  docs: {},

  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: '.storybook/vite.config.ts',
      },
    },
  },

  stories: ['../app/**/*.stories.tsx'],

  viteFinal: async (viteConfig, {configType}) =>
    mergeConfig(viteConfig, {
      define: {
        'import.meta.env.API_URL': JSON.stringify(process.env.API_URL),
        'import.meta.env.MSW_ENABLED': JSON.stringify(process.env.MSW_ENABLED),
        'import.meta.env.SESSION_SECRET': JSON.stringify(
          process.env.SESSION_SECRET
        ),
        'import.meta.env.SITE_URL': JSON.stringify(process.env.SITE_URL),
      },
      plugins: [
        tsconfigPaths(),
        ...(configType === 'PRODUCTION' ?
          [turbosnap({rootDir: viteConfig.root ?? process.cwd()})]
        : []),
      ],
    }),
};

export default config;
