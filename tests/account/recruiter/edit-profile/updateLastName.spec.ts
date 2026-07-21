import { test } from '../../../_fixtures/fixtures';
import { faker } from '@faker-js/faker';

test.describe(`Edit profile as recruiter`, () => {
  test(`User should update last name`, async ({
    reporter,
    registerNewRecruiter,
    editRecruiterProfileContactsPage,
    recruiterProfilePreviewPage,
  }) => {
    await reporter.severity('normal');

    const firstName = registerNewRecruiter.profileContacts.firstName;
    const lastName = faker.person.lastName();

    const waitForResponse = true;

    await editRecruiterProfileContactsPage.open();
    await editRecruiterProfileContactsPage.profileContacts.fillLastName(lastName);
    await editRecruiterProfileContactsPage.clickSaveChanges(waitForResponse);
    await recruiterProfilePreviewPage.open();
    await recruiterProfilePreviewPage.assertFullNameHasText(firstName, lastName);
  });
});
