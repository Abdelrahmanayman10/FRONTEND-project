import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    headless: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: [
    {
      command: 'pnpm dev:backend',
      url: 'http://localhost:3001/',
      reuseExistingServer: !process.env.CI,
      timeout: 30000,
    },
    {
      command: 'pnpm dev:frontend',
      url: 'http://localhost:3000/',
      reuseExistingServer: !process.env.CI,
      timeout: 30000,
    },
  ],
});
