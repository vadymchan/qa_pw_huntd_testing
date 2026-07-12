import { expect } from '@playwright/test';
import { test } from '../../../_fixtures/fixtures';
import { graphqlWaitForResponse } from '../../../../src/utils/playwright/graphqlWaitForResponse';
import { faker } from '@faker-js/faker';

test.describe(`Edit profile as recruiter`, () => {
  test.beforeEach(async ({ page, registeredRecruiter }) => {
    await page.goto('/sign-in');

    await page.getByLabel('Email').fill(registeredRecruiter.userCredentials.email);
    await page.getByLabel('Password').fill(registeredRecruiter.userCredentials.password);
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();
    await page.waitForURL('/profile-preview/**');
  });

  test(`User should update last name`, async ({ page, registeredCandidate }) => {
    const firstName = registeredCandidate.profileContacts.firstName;
    const lastName = faker.person.lastName();

    await page.goto('profile/recruiter/contacts');

    await page.getByLabel('Last name').fill(lastName);
    await graphqlWaitForResponse(page, 'updateProfileContacts', async () => {
      await page.getByRole('button', { name: 'Save changes' }).click();
    });

    await page.goto('/profile-preview/recruiter');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(`${firstName} ${lastName}`);
  });
});
