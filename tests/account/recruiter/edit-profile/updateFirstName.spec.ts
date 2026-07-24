import { faker } from '@faker-js/faker';
import { test } from '@fixtures/fixtures';

test.describe(`Edit profile as recruiter`, () => {
  test(`User should update first name`, async ({
    reporter,
    registerNewRecruiter,
    editRecruiterProfileContactsPage,
    recruiterProfilePreviewPage,
  }) => {
    await reporter.severity('normal');

    const firstName = faker.person.firstName();
    const lastName = registerNewRecruiter.profileContacts.lastName;

    const waitForResponse = true;

    await editRecruiterProfileContactsPage.open();
    await editRecruiterProfileContactsPage.profileContacts.fillFirstName(firstName);
    await editRecruiterProfileContactsPage.clickSaveChanges(waitForResponse);
    await recruiterProfilePreviewPage.open();
    await recruiterProfilePreviewPage.assertFullNameHasText(firstName, lastName);
  });
});
