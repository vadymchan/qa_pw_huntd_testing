import { test, expect } from '@playwright/test';

test.describe(`Register as User`, () => {
  test(`User should see validation error when password is empty`, async ({ page }) => {
    await page.goto('/sign-in');

    await page.getByRole('button', { name: 'Sign In', exact: true }).click();

    await expect(page.locator('[class*=FormField_metaBlock]').last()).toHaveText(
      'Password is required',
    );
  });
});
