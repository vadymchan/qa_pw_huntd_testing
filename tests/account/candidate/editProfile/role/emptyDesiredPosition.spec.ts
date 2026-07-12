import { expect } from '@playwright/test';
import { test } from '../../../../_fixtures/fixtures';

test.describe(`Edit profile as candidate`, () => {
  test.beforeEach(async ({ page, registeredCandidate }) => {
    await page.goto('/sign-in');

    await page.getByLabel('Email').fill(registeredCandidate.userCredentials.email);
    await page.getByLabel('Password').fill(registeredCandidate.userCredentials.password);
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();
    await page.waitForURL('/profile-preview/**');
  });

  test(`User should see validation error when desired position is empt`, async ({ page }) => {
    const desiredPosition = '';

    await page.goto('/profile/candidate');

    await page.getByLabel('Desired position').fill(desiredPosition);
    await page.getByRole('button', { name: 'Save changes' }).click();

    await expect(page.locator('[class*=FormField_metaBlock]').first()).toHaveText(
      'Position is required',
    );
  });
});
