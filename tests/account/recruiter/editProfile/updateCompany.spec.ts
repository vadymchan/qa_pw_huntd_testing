import { expect } from '@playwright/test';
import { graphqlWaitForResponse } from '../../../../src/utils/playwright/graphqlWaitForResponse';
import { test } from '../../../_fixtures/fixtures';

test.describe(`Update recruiter profile`, () => {
  test.beforeEach(async ({ page, registeredRecruiter }) => {
    await page.goto('/sign-in');

    await page.getByLabel('Email').fill(registeredRecruiter.userCredentials.email);
    await page.getByLabel('Password').fill(registeredRecruiter.userCredentials.password);
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();
    await page.waitForURL('/profile-preview/**');
  });

  test(`User should update company`, async ({ page }) => {
    const company = 'Google';

    await page.goto('/profile/recruiter/company-info');

    await page.getByLabel('Company').fill(company);
    await graphqlWaitForResponse(page, 'updateRecruiterProfile', async () => {
      await page.getByRole('button', { name: 'Save changes' }).click();
    });

    await page.goto('/profile-preview/recruiter');
    await expect(page.locator('[class*=ProfileMeta_recruiterMetaItem]').last()).toHaveText(company);
  });
});
