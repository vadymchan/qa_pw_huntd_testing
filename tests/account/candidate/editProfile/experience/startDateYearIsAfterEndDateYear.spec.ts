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

  test(`User should see validation error when job experience start date is after end date`, async ({
    page,
  }) => {
    const previousRole = 'Manual Qa';
    const previousCompany = 'Google';
    const startMonth = 'January';
    const startYear = 2026;
    const endYear = 2025;

    await page.goto('/profile/candidate/experience');

    await page.getByRole('button', { name: 'Add' }).click();

    await page.getByLabel('Role').fill(previousRole);
    await page.getByLabel('Company name').fill(previousCompany);
    // Use focus + ArrowDown because react-select hides the actual input, making .click() flaky
    await page.locator('#startMonth').focus();
    await page.keyboard.press('ArrowDown');
    await page.locator('.select__option').getByText(startMonth, { exact: true }).click();

    await page.locator('[name="startYear"]').fill(`${startYear}`);

    await page.getByRole('button', { name: 'End date' }).click();

    await page.locator('[name="endYear"]').fill(`${endYear}`);

    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.locator('[class*=FormField_metaBlock]').nth(5)).toHaveText(
      'End date cannot precede start date',
    );
  });
});
