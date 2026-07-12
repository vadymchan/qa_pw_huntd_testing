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

  test(`User should see validation error when repeat new password is empty`, async ({ page }) => {
    const newPassword = '';

    await page.goto('/settings/change-password');

    await page.getByRole('button', { name: 'Change password' }).click();

    await page.getByLabel('Repeat new password').fill(newPassword);
    await page.getByRole('button', { name: 'Save changes' }).click();

    await expect(page.locator('[class*=FormField_metaBlock]').last()).toHaveText(
      'Please repeat your password',
    );
  });
});
