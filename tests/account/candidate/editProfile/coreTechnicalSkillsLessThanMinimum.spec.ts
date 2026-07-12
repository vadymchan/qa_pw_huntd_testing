import { expect } from '@playwright/test';
import { test } from '../../../_fixtures/fixtures';

test.describe(`Edit profile as candidate`, () => {
  test.beforeEach(async ({ page, registeredCandidate }) => {
    await page.goto('/sign-in');

    await page.getByLabel('Email').fill(registeredCandidate.userCredentials.email);
    await page.getByLabel('Password').fill(registeredCandidate.userCredentials.password);
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();
    await page.waitForURL('/profile-preview/**');
  });

  test(`User should see validation error when core technical skills are fewer than minimum`, async ({
    page,
  }) => {
    const coreTechnicalSkills = ['Python', 'GraphQL', 'MySQL', 'Big Data'];

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

    await page.getByRole('button', { name: 'Save changes' }).click();

    await expect(page.locator('[class*=FormField_metaBlock]').last()).toHaveText(
      'Select at least 5 skills',
    );
  });
});
