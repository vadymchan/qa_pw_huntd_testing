import { test } from '../../../../_fixtures/fixtures';
import { graphqlWaitForResponse } from '../../../../../src/utils/playwright/graphqlWaitForResponse';
import { expect } from '@playwright/test';
import { generateProfileContacts } from '../../../../../src/utils/generators/generateProfileContacts';

test.describe(`Edit profile as candidate`, () => {
  test.beforeEach(async ({ page, registeredCandidate }) => {
    await page.goto('/sign-in');

    await page.getByLabel('Email').fill(registeredCandidate.userCredentials.email);
    await page.getByLabel('Password').fill(registeredCandidate.userCredentials.password);
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();
    await page.waitForURL('/profile-preview/**');
  });

  test(`User should update Linkedin`, async ({ page }) => {
    const linkedinUrl = generateProfileContacts().linkedinUrl;

    await page.goto('profile/candidate/contacts');

    await page.getByLabel('Linkedin (optional)').fill(linkedinUrl);

    await graphqlWaitForResponse(page, 'updateProfileContacts', async () => {
      await page.getByRole('button', { name: 'Save changes' }).click();
    });

    await page.goto('/profile-preview/candidate');

    await expect(page.getByRole('link', { name: 'Linkedin', exact: true })).toHaveAttribute(
      'href',
      linkedinUrl,
    );
  });
});
