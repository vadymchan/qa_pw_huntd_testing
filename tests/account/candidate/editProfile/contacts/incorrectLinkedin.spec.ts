import { test } from '../../../../_fixtures/fixtures';
import { LINKEDIN_IS_INCORRECT } from '../../../../../src/utils/constants/validationMessages';

test.describe(`Edit profile as candidate`, () => {
  test.use({ storageState: 'playwright/.auth/candidate.json' });

  test(`User should see validation error when Linkedin is invalid`, async ({
    editCandidateProfileContactsPage,
  }) => {
    const linkedinUrl = 'incorrect Linkedin format';

    await editCandidateProfileContactsPage.open();
    await editCandidateProfileContactsPage.profileContacts.fillLinkedin(linkedinUrl);
    const waitForResponse = false;
    await editCandidateProfileContactsPage.clickSaveChanges(waitForResponse);
    await editCandidateProfileContactsPage.assertLinkedinValidationMessage(LINKEDIN_IS_INCORRECT);
  });
});
