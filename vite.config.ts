//import {reactRouterDevTools} from 'react-router-devtools';
import {reactRouter} from '@react-router/dev/vite';
import {defineConfig} from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    /* reactRouterDevTools(),*/
    reactRouter(),
    tsconfigPaths(),
  ],
  server: {
    open: true,
  },
  ssr: {
    noExternal: ['lodash'],
    optimizeDeps: {
      include: ['lodash'],
    },
  },
});
