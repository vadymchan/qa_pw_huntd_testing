import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe(`Login User`, () => {
  let email: string;

  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('/sign-up');

    email = faker.internet.email();
    const password = faker.internet.password();

    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password', { exact: true }).fill(password);
    await page.getByLabel('Repeat password').fill(password);
    await page.getByRole('button', { name: 'Create account' }).click();
  });

  test(`User should see validation error when password is incorrect`, async ({ page }) => {
    await page.goto('/sign-in');

    const password = faker.internet.password();

    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();

    await expect(page.locator('[class*=FormField_metaBlock]').first()).toHaveText(
      'Wrong credentials',
    );
  });
});
