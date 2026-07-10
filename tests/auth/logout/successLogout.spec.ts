import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe(`Logout user`, () => {
  test(`User should logout successfully`, async ({ page }) => {
    await page.goto('/sign-up');

    const email = faker.internet.email();
    const password = faker.internet.password();

    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password', { exact: true }).fill(password);
    await page.getByLabel('Repeat password').fill(password);
    await page.getByRole('button', { name: 'Create account' }).click();

    await page.getByRole('link', { name: 'Candidate hunting for interesting job offers' }).click();

    await page.getByRole('button', { name: 'Profile' }).click();
    await page.getByRole('button', { name: 'Sign out' }).click();

    await expect(page).toHaveURL('/sign-in');
  });
});
