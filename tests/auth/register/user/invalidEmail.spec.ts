import { test, expect } from '@playwright/test';

// TODO: can be made parameterized (different formats)

test.describe(`Register as user`, () => {
  test(`User should see validation error when email is invalid`, async ({ page }) => {
    await page.goto('/sign-up');

    const email = 'incorrect email format';

    await page.getByLabel('Email').fill(email);

    await page.getByRole('button', { name: 'Create account' }).click();

    await expect(page.locator('[class*=FormField_metaBlock]').first()).toHaveText('Wrong email');
  });
});
