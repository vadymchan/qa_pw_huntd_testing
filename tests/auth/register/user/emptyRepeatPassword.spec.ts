import { test, expect } from '@playwright/test';

test.describe(`Register as User`, () => {
  test(`User should see validation error when repeat password is empty`, async ({ page }) => {
    await page.goto('/sign-up');

    await page.getByRole('button', { name: 'Create account' }).click();

    await expect(page.locator('[class*=FormField_metaBlock]').last()).toHaveText(
      'Please repeat your password',
    );
  });
});
