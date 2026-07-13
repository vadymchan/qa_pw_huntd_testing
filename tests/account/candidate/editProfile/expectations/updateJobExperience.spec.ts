import { test } from '../../../../_fixtures/fixtures';
import { graphqlWaitForResponse } from '../../../../../src/utils/playwright/graphqlWaitForResponse';
import { expect } from '@playwright/test';

test.describe(`Edit profile as candidate`, () => {
  test.beforeEach(async ({ page, registeredCandidate }) => {
    await page.goto('/sign-in');

    await page.getByLabel('Email').fill(registeredCandidate.userCredentials.email);
    await page.getByLabel('Password').fill(registeredCandidate.userCredentials.password);
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();
    await page.waitForURL('/profile-preview/**');
  });

  test(`User should update job experience`, async ({ page }) => {
    const jobExperience = '1-3 years';

    await page.goto('/profile/candidate/job-expectations');

    await page.getByLabel('Job experience').focus();
    await page.keyboard.press('ArrowDown');
    await page.locator('.select__option').getByText(jobExperience, { exact: true }).click();

    await graphqlWaitForResponse(page, 'updateCandidateProfile', async () => {
      await page.getByRole('button', { name: 'Save changes' }).click();
    });

    await page.goto('/profile-preview/candidate');

    await expect(
      page.locator('[class*=ProfileMeta_metaWrapper]').getByRole('listitem').nth(1),
    ).toHaveText(jobExperience);
  });
});
