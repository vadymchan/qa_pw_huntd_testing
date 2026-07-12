import { faker } from '@faker-js/faker';
import { test } from '../../../_fixtures/fixtures';
import { expect } from '@playwright/test';

test.describe(`Update recruiter account settings`, () => {
  test.beforeEach(async ({ page, registeredRecruiter }) => {
    await page.goto('/sign-in');

    await page.getByLabel('Email').fill(registeredRecruiter.userCredentials.email);
    await page.getByLabel('Password').fill(registeredRecruiter.userCredentials.password);
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();
    await page.waitForURL('/profile-preview/**');
  });

  test(`User should change password successfully`, async ({ page, registeredRecruiter }) => {
    const currentPassword = registeredRecruiter.userCredentials.password;
    const newPassword = faker.internet.password();

    await page.goto('/settings/change-password');

    await page.getByRole('button', { name: 'Change password' }).click();

    await page.getByLabel('Current password').fill(currentPassword);
    await page.getByLabel('New password', { exact: true }).fill(newPassword);
    await page.getByLabel('Repeat new password').fill(newPassword);
    await page.getByRole('button', { name: 'Save changes' }).click();

    await page.getByRole('button', { name: 'Profile' }).click();
    await page.getByRole('button', { name: 'Sign out' }).click();

    await page.getByLabel('Email').fill(registeredRecruiter.userCredentials.email);
    await page.getByLabel('Password').fill(newPassword);
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();

    await expect(page).toHaveURL('/profile-preview/recruiter');
  });
});
