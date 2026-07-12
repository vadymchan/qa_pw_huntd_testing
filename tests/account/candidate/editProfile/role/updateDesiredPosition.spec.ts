import { expect } from '@playwright/test';
import { test } from '../../../../_fixtures/fixtures';
import { graphqlWaitForResponse } from '../../../../../src/utils/playwright/graphqlWaitForResponse';

test.describe(`Edit profile as candidate`, () => {
  test.beforeEach(async ({ page, registeredCandidate }) => {
    await page.goto('/sign-in');

    await page.getByLabel('Email').fill(registeredCandidate.userCredentials.email);
    await page.getByLabel('Password').fill(registeredCandidate.userCredentials.password);
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();
    await page.waitForURL('/profile-preview/**');
  });

  test(`User should update desired position`, async ({ page }) => {
    const desiredPosition = 'Fullstack';

    await page.goto('/profile/candidate');

    await page.getByLabel('Desired position').fill(desiredPosition);
    await graphqlWaitForResponse(page, 'updateCandidateProfile', async () => {
      await page.getByRole('button', { name: 'Save changes' }).click();
    });

    await page.goto('/profile-preview/candidate');
    await expect(page.locator('[class*=CandidateProfilePreviewModule_title]')).toHaveText(
      desiredPosition,
    );
  });
});
