import { faker } from '@faker-js/faker';
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

  test(`User should update achivements`, async ({ page }) => {
    const achivements = faker.lorem.sentence();

    await page.goto('/profile/candidate/bio');

    await page.getByLabel('Achievements / Key results').fill(achivements);

    await graphqlWaitForResponse(page, 'updateCandidateProfile', async () => {
      await page.getByRole('button', { name: 'Save changes' }).click();
    });

    await page.goto('/profile-preview/candidate');

    await expect(
      page
        .locator('[class*=ProfileInfo_item]')
        .filter({
          has: page
            .locator('[class*=ProfileInfo_itemTitle]')
            .getByText('Achievements / Key results'),
        })
        .getByRole('definition'),
    ).toHaveText(achivements);
  });
});
