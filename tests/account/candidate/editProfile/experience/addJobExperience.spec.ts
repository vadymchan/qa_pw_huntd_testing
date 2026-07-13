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

  test(`User should add job experience`, async ({ page }) => {
    const previousRole = 'Manual Qa';
    const previousCompany = 'Google';
    const startMonth = 'January';
    const startYear = 2024;
    const endMonth = 'January';
    const endYear = 2025;
    const previousJobAchivements = 'Job Achivements';

    await page.goto('/profile/candidate/experience');

    await page.getByRole('button', { name: 'Add' }).click();
    await page.getByLabel('Role').fill(previousRole);
    await page.getByLabel('Company name').fill(previousCompany);
    // Use focus + ArrowDown because react-select hides the actual input, making .click() flaky
    await page.locator('#startMonth').focus();
    await page.keyboard.press('ArrowDown');
    await page.locator('.select__option').getByText(startMonth, { exact: true }).click();
    await page.locator('[name="startYear"]').fill(`${startYear}`);
    await page.getByRole('button', { name: 'End date' }).click();
    // Use focus + ArrowDown because react-select hides the actual input, making .click() flaky
    await page.locator('#endMonth').focus();
    await page.keyboard.press('ArrowDown');
    await page.locator('.select__option').getByText(endMonth, { exact: true }).click();
    await page.locator('[name="endYear"]').fill(`${endYear}`);
    await page.getByLabel('Achievements').fill(previousJobAchivements);

    await graphqlWaitForResponse(page, 'createWorkPlace', async () => {
      await page.getByRole('button', { name: 'Save' }).click();
    });

    await page.goto('/profile-preview/candidate');

    const experience = page.locator('li[class*=ProfileWorkHistory_item]').last();
    await expect(experience.locator('[class*=typography_caption]')).toHaveText(previousRole);
    await expect(experience.locator('p[class*=typography_smallText]').first()).toHaveText(
      previousCompany,
    );

    await expect(experience.locator('[class*=ProfileWorkHistory_term__]').first()).toHaveText(
      `${startMonth.slice(0, 3)} ${startYear} - ${endMonth.slice(0, 3)} ${endYear}`,
    );

    await expect(experience.locator('[class*=ProfileWorkHistory_descriptionField]')).toHaveText(
      previousJobAchivements,
    );
  });
});
