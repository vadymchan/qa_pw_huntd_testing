import { test } from '../../../../_fixtures/fixtures';
import { faker } from '@faker-js/faker';

test.describe(`Edit profile as candidate`, () => {
  test(`User should update last name`, async ({
    registerNewCandidate,
    editCandidateProfileContactsPage,
    candidateProfilePreviewPage,
  }) => {
    const firstName = registerNewCandidate.profileContacts.firstName;
    const lastName = faker.person.lastName();

    await editCandidateProfileContactsPage.open();
    await editCandidateProfileContactsPage.profileContacts.fillLastName(lastName);
    const waitForResponse = true;
    await editCandidateProfileContactsPage.clickSaveChanges(waitForResponse);

    await candidateProfilePreviewPage.open();
    await candidateProfilePreviewPage.assertFullNameHasText(firstName, lastName);
  });
});
