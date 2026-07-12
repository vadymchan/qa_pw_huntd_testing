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

  test(`User should update last name`, async ({ page, registeredCandidate }) => {
    const firstName = registeredCandidate.profileContacts.firstName;
    const lastName = faker.person.lastName();

    await page.goto('profile/candidate/contacts');

    await page.getByLabel('Last name').fill(lastName);

    await graphqlWaitForResponse(page, 'updateProfileContacts', async () => {
      await page.getByRole('button', { name: 'Save changes' }).click();
    });

    await page.goto('/profile-preview/candidate');

    await expect(page.locator('p[class*=typography_smallHeading]')).toHaveText(
      `${firstName} ${lastName}`,
    );
  });
});
