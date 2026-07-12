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

  test(`User should see validation error when core technical skills is empty`, async ({ page }) => {
    await page.goto('/profile/candidate');

    await page
      .locator('.select__control')
      .filter({ has: page.getByLabel('Core technical skills') })
      .locator('.select__clear-indicator')
      .click();

    await page.getByRole('button', { name: 'Save changes' }).click();

    await expect(page.locator('[class*=FormField_metaBlock]').last()).toHaveText(
      'Select at least 5 skills',
    );
  });
});
