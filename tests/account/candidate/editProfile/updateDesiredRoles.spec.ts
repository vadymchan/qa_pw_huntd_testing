import { expect } from '@playwright/test';
import { test } from '../../../_fixtures/fixtures';
import { graphqlWaitForResponse } from '../../../../src/utils/playwright/graphqlWaitForResponse';

test.describe(`Edit profile as candidate`, () => {
  test.beforeEach(async ({ page, registeredCandidate }) => {
    await page.goto('/sign-in');

    await page.getByLabel('Email').fill(registeredCandidate.userCredentials.email);
    await page.getByLabel('Password').fill(registeredCandidate.userCredentials.password);
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();
    await page.waitForURL('/profile-preview/**');
  });

  test(`User should update desired roles`, async ({ page }) => {
    const desiredRoles = ['QA'];

    await page.goto('/profile/candidate');

    await page
      .locator('.select__control')
      .filter({ has: page.getByLabel('Desired roles') })
      .locator('.select__clear-indicator')
      .click();

    for (const role of desiredRoles) {
      await page.getByLabel('Desired roles').focus();
      await page.keyboard.press('ArrowDown');
      await page.locator('.select__option').getByText(role, { exact: true }).click();
    }

    await page.getByLabel('Desired roles').blur();

    await graphqlWaitForResponse(page, 'updateCandidateProfile', async () => {
      await page.getByRole('button', { name: 'Save changes' }).click();
    });

    await page.goto('/profile-preview/candidate');
    for (const role of desiredRoles) {
      await expect(
        page
          .locator('[class*=ProfileInfo_item]')
          .filter({
            has: page.locator('[class*=ProfileInfo_itemTitle]').getByText('Considering roles'),
          })
          .getByText(role),
      ).toBeVisible();
    }
  });
});
