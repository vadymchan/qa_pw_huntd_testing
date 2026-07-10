import { test, expect } from '@playwright/test';

test.describe(`Register as user`, () => {
  test(`User should see validation error when password is empty`, async ({ page }) => {
    await page.goto('/sign-up');

    await page.getByRole('button', { name: 'Create account' }).click();

    await expect(page.locator('[class*=FormField_metaBlock]').nth(1)).toHaveText(
      'Password is required',
    );
  });
});
