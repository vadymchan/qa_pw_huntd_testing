import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe(`Register as user`, () => {
  test(`User should see validation error when email is invalid`, async ({ page }) => {
    await page.goto('/sign-up');

    const password = faker.internet.password();
    const repeatPassword = password.slice(0, -1);

    await page.getByLabel('Password', { exact: true }).fill(password);
    await page.getByLabel('Repeat password').fill(repeatPassword);

    await page.getByRole('button', { name: 'Create account' }).click();

    await expect(page.locator('[class*=FormField_metaBlock]').last()).toHaveText(
      'Please make sure your passwords match',
    );
  });
});
