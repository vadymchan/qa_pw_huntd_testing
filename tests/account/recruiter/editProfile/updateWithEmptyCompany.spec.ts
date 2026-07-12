import { expect } from '@playwright/test';
import { test } from '../../../_fixtures/fixtures';

test.describe(`Update recruiter profile`, () => {
  test.beforeEach(async ({ page, registeredRecruiter }) => {
    await page.goto('/sign-in');

    await page.getByLabel('Email').fill(registeredRecruiter.userCredentials.email);
    await page.getByLabel('Password').fill(registeredRecruiter.userCredentials.password);
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();
    await page.waitForURL('/profile-preview/**');
  });

  test(`User should see validation error when company is empty`, async ({ page }) => {
    const company = '';

    await page.goto('/profile/recruiter/company-info');

    await page.getByLabel('Company').fill(company);
    await page.getByRole('button', { name: 'Save changes' }).click();

    // TODO: use const message text
    await expect(page.locator('[class*=FormField_metaBlock]').last()).toHaveText(
      'Company is required',
    );
  });
});
