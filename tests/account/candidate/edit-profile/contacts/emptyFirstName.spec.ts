import { test } from '../../../../_fixtures/fixtures';
import { FIRST_NAME_IS_REQUIRED } from '../../../../../src/ui/constants/validationMessages';

test.describe(`Edit profile as candidate`, () => {
  test.use({ storageState: 'playwright/.auth/candidate.json' });

  test(`User should see validation error when first name is empty`, async ({
    reporter,
    editCandidateProfileContactsPage,
  }) => {
    await reporter.severity('minor');

    const firstName = '';

    await editCandidateProfileContactsPage.open();
    await editCandidateProfileContactsPage.profileContacts.fillFirstName(firstName);
    const waitForResponse = false;
    await editCandidateProfileContactsPage.clickSaveChanges(waitForResponse);
    await editCandidateProfileContactsPage.assertFirstNameValidationMessage(FIRST_NAME_IS_REQUIRED);
  });
});
