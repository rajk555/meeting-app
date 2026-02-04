import { test, expect } from '@playwright/test';

test('registration page renders', async ({ page }) => {
  await page.goto('/register');
  await expect(page.locator('h2')).toHaveText('Register');
});

test('login page renders', async ({ page }) => {
  await page.goto('/login');
  await expect(page.locator('h2')).toHaveText('Login');
});

test('meetings list redirects to login when not auth', async ({ page }) => {
  await page.goto('/meetings');
  await expect(page).toHaveURL(/.*\/login/);
});

test('meeting creation redirects to login when not auth', async ({ page }) => {
  await page.goto('/meetings/new');
  await expect(page).toHaveURL(/.*\/login/);
});
