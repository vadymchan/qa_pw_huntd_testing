import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe(`Register as User`, () => {
  let email: string;

  // TODO: use api + fixture instead
  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('/sign-up');

    email = faker.internet.email();
    const password = faker.internet.password();

    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByLabel('Password', { exact: true }).fill(password);
    await page.getByLabel('Repeat password').fill(password);
    await page.getByRole('button', { name: 'Create account' }).click();
  });

  test(`User should see validation error when email is already taken`, async ({ page }) => {
    await page.goto('/sign-up');

    const password = faker.internet.password();

    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByLabel('Password', { exact: true }).fill(password);
    await page.getByLabel('Repeat password').fill(password);
    await page.getByRole('button', { name: 'Create account' }).click();

    await expect(page.locator('[class*=FormField_metaBlock]').first()).toHaveText(
      'Email is already taken.',
    );
  });
});
