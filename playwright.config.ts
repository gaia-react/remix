import {defineConfig, devices} from '@playwright/test';
import {config} from 'dotenv';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Run tests in files in parallel */
  fullyParallel: true,

  outputDir: './.playwright/output',

  projects: [
    {
      name: 'chromium',
      use: {...devices['Desktop Chrome']},
    },
  ],

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'list',

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  testDir: './.playwright/e2e',
  testMatch: '**/*.spec.ts',

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:5173',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run dev',
    reuseExistingServer: !process.env.CI,
    // enable stdout pipe when you need to debug server-side logs
    //stdout: 'pipe',
    url: 'http://localhost:5173',
  },

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
});
