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

  test(`User should see validation error when desired monthly base salary is empty`, async ({
    page,
  }) => {
    const salaryType = 'Monthly';
    const desiredBaseSalary = '';

    await page.goto('/profile/candidate/job-expectations');

    await page.getByRole('button', { name: salaryType }).click();
    await page.getByRole('textbox', { name: /Desired base salary/i }).fill(`${desiredBaseSalary}`);

    await page.getByRole('button', { name: 'Save changes' }).click();

    await expect(page.locator('[class*=FormField_metaBlock]').first()).toHaveText(
      'Salary is required',
    );
  });
});
