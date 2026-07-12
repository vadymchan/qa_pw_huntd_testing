import { test } from '../../../../_fixtures/fixtures';
import { expect } from '@playwright/test';

test.describe(`Edit profile as candidate`, () => {
  test.beforeEach(async ({ page, registeredCandidate }) => {
    await page.goto('/sign-in');

    await page.getByLabel('Email').fill(registeredCandidate.userCredentials.email);
    await page.getByLabel('Password').fill(registeredCandidate.userCredentials.password);
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();
    await page.waitForURL('/profile-preview/**');
  });

  test(`User should see validation error when Behance is invalid`, async ({ page }) => {
    const behanceUrl = 'incorrect Behance format';

    await page.goto('profile/candidate/contacts');

    await page.getByLabel('Behance (optional)').fill(behanceUrl);

    await page.getByRole('button', { name: 'Save changes' }).click();

    await expect(page.locator('[class*=FormField_metaBlock]').nth(4)).toHaveText(
      'Please enter correct Behance link',
    );
  });
});
