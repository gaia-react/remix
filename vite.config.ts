import {vitePlugin as remix} from '@remix-run/dev';
//import {remixDevTools} from 'remix-development-tools';
import {flatRoutes} from 'remix-flat-routes';
import {defineConfig} from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    /*remixDevTools(),*/
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
      ignoredRouteFiles: ['**/*'],
      routes: async (defineRoutes) =>
        flatRoutes('routes', defineRoutes, {
          ignoredRouteFiles: [
            '.*',
            '**/*.css',
            '**/*.test.{ts,tsx}',
            '**/__*.*',
          ],
        }),
    }),
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
