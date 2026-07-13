import { test } from '../../../../_fixtures/fixtures';
import { graphqlWaitForResponse } from '../../../../../src/utils/playwright/graphqlWaitForResponse';
import { expect } from '@playwright/test';
import { generateSalaryString } from '../../../../../src/utils/generators/generateSalaryString';

test.describe(`Edit profile as candidate`, () => {
  test.beforeEach(async ({ page, registeredCandidate }) => {
    await page.goto('/sign-in');

    await page.getByLabel('Email').fill(registeredCandidate.userCredentials.email);
    await page.getByLabel('Password').fill(registeredCandidate.userCredentials.password);
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();
    await page.waitForURL('/profile-preview/**');
  });

  test(`User should update desired monthly base salary`, async ({ page }) => {
    const salaryType = 'Monthly';
    const desiredBaseSalary = 2_500;

    await page.goto('/profile/candidate/job-expectations');

    await page.getByRole('button', { name: salaryType }).click();
    await page.getByRole('textbox', { name: /Desired base salary/i }).fill(`${desiredBaseSalary}`);

    await graphqlWaitForResponse(page, 'updateCandidateProfile', async () => {
      await page.getByRole('button', { name: 'Save changes' }).click();
    });

    await page.goto('/profile-preview/candidate');

    await expect(
      page.locator('[class*=ProfileMeta_metaWrapper]').getByRole('listitem').nth(2),
    ).toHaveText(generateSalaryString(salaryType, desiredBaseSalary));
  });
});
