import { test, expect } from '@playwright/test';

// Basic page rendering
test('registration page renders', async ({ page }) => {
  await page.goto('/register');
  await expect(page.locator('h2')).toHaveText('Register');
});

test('login page renders', async ({ page }) => {
  await page.goto('/login');
  await expect(page.locator('h2')).toHaveText('Login');
});

// Auth redirects
test('meetings list redirects to login when not auth', async ({ page }) => {
  await page.goto('/meetings');
  await expect(page).toHaveURL(/.*\/login/);
});

test('meeting creation redirects to login when not auth', async ({ page }) => {
  await page.goto('/meetings/new');
  await expect(page).toHaveURL(/.*\/login/);
});

// Simulate logged in user for authenticated flows
test.describe('authenticated flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('token', 'dummy-token'));
  });

  test('create meeting form renders for authenticated user', async ({ page }) => {
    await page.goto('/meetings/new');
    await expect(page.locator('h2')).toHaveText('Create Meeting');
    await expect(page.locator('input[required]')).toHaveCount(2);
  });

  // Mock transcript upload and summary response
  test('transcript upload displays summary and action items', async ({ page }) => {
    const meetingId = 'test-id';
    await page.route(`**/api/meetings/${meetingId}/transcript`, route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ summary: 'Test summary', actionItems: ['Item1', 'Item2'] }),
      })
    );
    await page.goto(`/meetings/${meetingId}`);
    const fileInput = page.locator('input[type=file]');
    await fileInput.setInputFiles('tests/fixtures/transcript.txt');
    await page.click('button:has-text("Upload & Summarize")');
    await expect(page.locator('h3:has-text("Summary")')).toBeVisible();
    await expect(page.locator('text=Test summary')).toBeVisible();
    await expect(page.locator('li')).toHaveCount(2);
  });
});
