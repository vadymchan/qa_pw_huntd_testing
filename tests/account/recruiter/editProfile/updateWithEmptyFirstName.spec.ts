import { expect } from '@playwright/test';
import { test } from '../../../_fixtures/fixtures';

test.describe(`Update recruiter profile`, () => {
  test.beforeEach(async ({ page, registeredRecruiter }) => {
    await page.goto('/sign-in');

    await page.getByLabel('Email').fill(registeredRecruiter.userCredentials.email);
    await page.getByLabel('Password').fill(registeredRecruiter.userCredentials.password);
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();
    await page.waitForURL('/profile-preview/**');
  });

  test(`User should see validation error when first name is empty`, async ({ page }) => {
    const firstName = '';

    await page.goto('profile/recruiter/contacts');

    await page.getByLabel('First name').fill(firstName);
    await page.getByRole('button', { name: 'Save changes' }).click();

    // TODO: use const message text
    await expect(page.locator('[class*=FormField_metaBlock]').nth(1)).toHaveText(
      'First name is required',
    );
  });
});
