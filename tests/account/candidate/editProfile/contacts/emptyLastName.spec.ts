import { test } from '../../../../_fixtures/fixtures';

test.describe(`Edit profile as candidate`, () => {
  test.use({ storageState: 'playwright/.auth/candidate.json' });

  test(`User should see validation error when last name is empty`, async ({
    editCandidateProfileContactsPage,
  }) => {
    const lastName = '';

    await editCandidateProfileContactsPage.open();
    await editCandidateProfileContactsPage.profileContacts.fillLastName(lastName);
    const waitForResponse = false;
    await editCandidateProfileContactsPage.clickSaveChanges(waitForResponse);
    await editCandidateProfileContactsPage.assertLastNameValidationMessage('Last name is required');
  });
});
