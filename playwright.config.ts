import path from 'path';
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const artifactsDir = path.resolve(__dirname, 'artifacts', timestamp);

dotenv.config({
  path: `.env.${process.env.ENV || 'qa'}`
});
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 3 : undefined,
  /* Timeout for each test (setup + test + teardown) */
  timeout: 100000,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  outputDir: artifactsDir,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* recomended config for troubleshooting */
    // screenshot: 'only-on-failure',
    // video: 'retain-on-failure',
    // trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Chrome',
      use: { ...devices['Desktop Chrome'],
        channel: 'chrome',
        viewport: { width: 1920, height: 1080 }
       },
       testIgnore: ['tests/6-orangehrm-rbac/rbac.spec.ts'],
    },
    {
      name: 'Edge',
      use: { ...devices['Desktop Edge'],
        channel: 'msedge',
        viewport: { width: 1920, height: 1080 }
      },
      testIgnore: ['tests/6-orangehrm-rbac/rbac.spec.ts'],
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'],
        browserName: 'firefox',
        viewport: { width: 1920, height: 1080 }
       },
      testIgnore: ['tests/6-orangehrm-rbac/rbac.spec.ts'],
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
