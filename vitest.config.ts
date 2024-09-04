/// <reference types="vitest" />
/// <reference types="vite/client" />
/// <reference types="@testing-library/jest-dom" />

import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import tsconfigPaths from 'vite-tsconfig-paths';
import {defineConfig} from 'vitest/config';
import fs from 'node:fs';
import path from 'node:path';

const ignoreWarnings = ['React DevTools'];

const env = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), '.env')));

export default defineConfig({
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
    env,
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
});
