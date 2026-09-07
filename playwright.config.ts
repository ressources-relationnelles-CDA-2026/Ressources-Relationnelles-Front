
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,

  // Fait échouer la CI si on laisse accidentellement test.only
  forbidOnly: !!process.env.CI,

  // En CI, on retente une fois un test qui échoue
  retries: process.env.CI ? 1 : 0,

  // Nombre de workers
  workers: process.env.CI ? 1 : undefined,

  // Rapport généré par Playwright
  reporter: "html",

  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry",
  },


  projects: [
    {
      name: "chromium",

      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],


  webServer: {

    
    command: "npm run build && npm start",
    url: "http://127.0.0.1:3000",

    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});