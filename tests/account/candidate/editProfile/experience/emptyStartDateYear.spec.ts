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

  test(`User should see validation error when job experience start date year is empty`, async ({
    page,
  }) => {
    await page.goto('/profile/candidate/experience');

    await page.getByRole('button', { name: 'Add' }).click();

    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.locator('[class*=FormField_metaBlock]').nth(3)).toHaveText(
      'Start year is required',
    );
  });
});
