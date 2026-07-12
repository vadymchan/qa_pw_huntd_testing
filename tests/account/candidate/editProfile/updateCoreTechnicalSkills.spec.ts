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

  test(`User should update core technical skills`, async ({ page }) => {
    const coreTechnicalSkills = ['Python', 'GraphQL', 'MySQL', 'Big Data', 'Data Science'];

    await page.goto('/profile/candidate');

    await page
      .locator('.select__control')
      .filter({ has: page.getByLabel('Core technical skills') })
      .locator('.select__clear-indicator')
      .click();

    for (const skill of coreTechnicalSkills) {
      await page.getByRole('textbox', { name: 'Core technical skills' }).fill(skill);
      await expect(
        page.locator('.select__option').filter({ hasText: new RegExp(`^${skill}$`) }),
      ).toBeVisible();
      await page.keyboard.press('Enter');
    }

    await graphqlWaitForResponse(page, 'updateCandidateProfile', async () => {
      await page.getByRole('button', { name: 'Save changes' }).click();
    });

    await page.goto('/profile-preview/candidate');
    for (const skill of coreTechnicalSkills) {
      await expect(
        page
          .locator('[class*=ProfileInfo_item]')
          .filter({
            has: page.locator('[class*=ProfileInfo_itemTitle]').getByText('Core technical skills'),
          })
          .locator('[class*=ProfileInfo_tagsContainer]')
          .getByText(skill, { exact: true }),
      ).toBeVisible();
    }
  });
});
