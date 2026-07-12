import { expect } from '@playwright/test';
import { test } from '../../../_fixtures/fixtures';
import { graphqlWaitForResponse } from '../../../../src/utils/playwright/graphqlWaitForResponse';

test.describe(`Edit profile as recruiter`, () => {
  test.beforeEach(async ({ page, registeredRecruiter }) => {
    await page.goto('/sign-in');

    await page.getByLabel('Email').fill(registeredRecruiter.userCredentials.email);
    await page.getByLabel('Password').fill(registeredRecruiter.userCredentials.password);
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();
    await page.waitForURL('/profile-preview/**');
  });

  test(`User should update role`, async ({ page }) => {
    const role = 'PM';

    await page.goto('/profile/recruiter/company-info');

    await page.getByLabel('My role').fill(role);
    await graphqlWaitForResponse(page, 'updateRecruiterProfile', async () => {
      await page.getByRole('button', { name: 'Save changes' }).click();
    });

    await page.goto('/profile-preview/recruiter');
    await expect(page.locator('[class*=ProfileMeta_recruiterMetaItem]').first()).toHaveText(role);
  });
});
