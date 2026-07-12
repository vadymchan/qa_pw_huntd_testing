import { faker } from '@faker-js/faker';
import { test } from '../../../_fixtures/fixtures';
import { expect } from '@playwright/test';

test.describe(`Update candidate account settings`, () => {
  test.beforeEach(async ({ page, registeredCandidate }) => {
    await page.goto('/sign-in');

    await page.getByLabel('Email').fill(registeredCandidate.userCredentials.email);
    await page.getByLabel('Password').fill(registeredCandidate.userCredentials.password);
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();
    await page.waitForURL('/profile-preview/**');
  });

  test(`User should see validation error when repeat new password is mismatched`, async ({
    page,
    registeredCandidate,
  }) => {
    const currentPassword = registeredCandidate.userCredentials.password;
    const newPassword = faker.internet.password();
    const repeatNewPassword = faker.internet.password();

    await page.goto('/settings/change-password');

    await page.getByRole('button', { name: 'Change password' }).click();

    await page.getByLabel('Current password').fill(currentPassword);
    await page.getByLabel('New password', { exact: true }).fill(newPassword);
    await page.getByLabel('Repeat new password').fill(repeatNewPassword);
    await page.getByRole('button', { name: 'Save changes' }).click();

    await expect(page.locator('[class*=FormField_metaBlock]').last()).toHaveText(
      'Please make sure your passwords match',
    );
  });
});
