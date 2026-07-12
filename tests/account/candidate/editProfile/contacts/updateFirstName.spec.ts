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

  test(`User should update first name`, async ({ page, registeredCandidate }) => {
    const firstName = faker.person.firstName();
    const lastName = registeredCandidate.profileContacts.lastName;

    await page.goto('profile/candidate/contacts');

    await page.getByLabel('First name').fill(firstName);

    await graphqlWaitForResponse(page, 'updateProfileContacts', async () => {
      await page.getByRole('button', { name: 'Save changes' }).click();
    });

    await page.goto('/profile-preview/candidate');

    await expect(page.locator('p[class*=typography_smallHeading]')).toHaveText(
      `${firstName} ${lastName}`,
    );
  });
});
