import { test, expect } from '@playwright/test';

// TODO: negative tests related to sign up could be moved in one file and be made parameterized

test.describe(`Register as user`, () => {
  test(`User should see validation error when email is empty`, async ({ page }) => {
    await page.goto('/sign-up');

    await page.getByRole('button', { name: 'Create account' }).click();

    await expect(page.locator('[class*=FormField_metaBlock]').first()).toHaveText(
      'Email is required',
    );
  });
});
