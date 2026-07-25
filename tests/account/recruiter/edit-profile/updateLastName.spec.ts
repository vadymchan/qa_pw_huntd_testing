import { test } from '@fixtures/fixtures';
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

    await editRecruiterProfileContactsPage.open();
    await editRecruiterProfileContactsPage.profileContacts.fillLastName(lastName);
    await editRecruiterProfileContactsPage.clickSaveChangesAndWaitForSave();
    await recruiterProfilePreviewPage.open();
    await recruiterProfilePreviewPage.assertFullNameHasText(firstName, lastName);
  });
});
