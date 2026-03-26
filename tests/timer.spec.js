const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Timer functionality', () => {
  let page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(`file://${path.join(__dirname, '../index.html')}`);
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('should initialize timer properly', async () => {
    const btnStart = page.locator('#btnStart');
    const btnStop = page.locator('#btnStop');

    // Initial state check
    await expect(btnStart).not.toBeDisabled();
    await expect(btnStop).toBeHidden();

    // Trigger start
    await btnStart.click();

    // After start, btnStart should be disabled
    await expect(btnStart).toBeDisabled();

    // Stop should be visible
    await expect(btnStop).toBeVisible();
    await expect(btnStop).toHaveText(/Stop/);
  });

  test('should stop timer properly', async () => {
    const btnStart = page.locator('#btnStart');
    const btnStop = page.locator('#btnStop');

    await btnStart.click(); // Start it
    await expect(btnStart).toBeDisabled();
    await expect(btnStop).toBeVisible();

    await btnStop.click(); // Stop it

    // After stopping, btnStart should be enabled (and probably say Folytat)
    await expect(btnStart).not.toBeDisabled();
    await expect(btnStart).toHaveText(/Folytat/);
  });

  // Removed the totalSec < 1 test because the app intentionally caps it to a minimum of 1 second (initSec = Math.max(1, Math.min(3600, customMin * 60 + customSec))) during initialization, making totalSec < 1 an unreachable path in the UI without modifying the inline code.
});
