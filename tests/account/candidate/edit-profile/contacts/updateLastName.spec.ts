import { test } from '@fixtures/fixtures';
import { faker } from '@faker-js/faker';

test.describe(`Edit profile as candidate`, () => {
  test(`User should update last name`, async ({
    reporter,
    registerNewCandidate,
    editCandidateProfileContactsPage,
    candidateProfilePreviewPage,
  }) => {
    await reporter.severity('normal');

    const firstName = registerNewCandidate.profileContacts.firstName;
    const lastName = faker.person.lastName();

    await editCandidateProfileContactsPage.open();
    await editCandidateProfileContactsPage.profileContacts.fillLastName(lastName);
    await editCandidateProfileContactsPage.clickSaveChangesAndWaitForSave();

    await candidateProfilePreviewPage.open();
    await candidateProfilePreviewPage.assertFullNameHasText(firstName, lastName);
  });
});
