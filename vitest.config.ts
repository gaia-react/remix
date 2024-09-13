/// <reference types="vitest" />
/// <reference types="vite/client" />
/// <reference types="@testing-library/jest-dom" />

import react from '@vitejs/plugin-react';
import {loadEnv} from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import {defineConfig} from 'vitest/config';

const ignoreWarnings = ['React DevTools'];

export default defineConfig(({mode}) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return {
    plugins: [react(), tsconfigPaths()],
    test: {
      coverage: {
        exclude: [
          '**/node_modules/**',
          '**/public/**',
          '**/.{idea,git,cache,output,temp}/**',
          '**/{vite,vitest,jest,ava,babel,nyc,tsup,build}.config.*',
          '.storybook/**/*',
          'test/**/*',
        ],
        provider: 'v8',
      },
      environment: 'happy-dom',
      globals: true,
      include: ['./app/**/*.test.{ts,tsx}'],
      onConsoleLog: (message) => {
        if (ignoreWarnings.some((warning) => message.includes(warning))) {
          return false;
        }
      },
      setupFiles: ['./test/setup.ts'],
    },
  };
});
