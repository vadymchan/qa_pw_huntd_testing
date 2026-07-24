import { test } from '@fixtures/fixtures';
import { LAST_NAME_IS_REQUIRED } from '@ui/constants/validationMessages';

test.describe(`Edit profile as candidate`, () => {
  test.use({ storageState: 'playwright/.auth/candidate.json' });

  test(`User should see validation error when last name is empty`, async ({
    reporter,
    editCandidateProfileContactsPage,
  }) => {
    await reporter.severity('minor');

    const lastName = '';

    await editCandidateProfileContactsPage.open();
    await editCandidateProfileContactsPage.profileContacts.fillLastName(lastName);
    const waitForResponse = false;
    await editCandidateProfileContactsPage.clickSaveChanges(waitForResponse);
    await editCandidateProfileContactsPage.assertLastNameValidationMessage(LAST_NAME_IS_REQUIRED);
  });
});
