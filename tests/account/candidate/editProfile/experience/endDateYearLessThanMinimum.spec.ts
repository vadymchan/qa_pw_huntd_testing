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

  test(`User should see validation error when job experience end date year is less than minimum`, async ({
    page,
  }) => {
    const endYear = 1924;

    await page.goto('/profile/candidate/experience');

    await page.getByRole('button', { name: 'Add' }).click();

    await page.getByRole('button', { name: 'End date' }).click();

    await page.locator('[name="endYear"]').fill(`${endYear}`);

    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.locator('[class*=FormField_metaBlock]').nth(5)).toHaveText(
      'The date cannot be earlier than 1925',
    );
  });
});
