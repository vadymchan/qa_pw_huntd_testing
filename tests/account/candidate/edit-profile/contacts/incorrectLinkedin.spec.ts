import { test } from '@fixtures/fixtures';
import { LINKEDIN_IS_INCORRECT } from '@ui/constants/validationMessages';

test.describe(`Edit profile as candidate`, () => {
  test.use({ storageState: 'playwright/.auth/candidate.json' });

  test(`User should see validation error when Linkedin is invalid`, async ({
    reporter,
    editCandidateProfileContactsPage,
  }) => {
    await reporter.severity('minor');

    const linkedinUrl = 'incorrect Linkedin format';

    await editCandidateProfileContactsPage.open();
    await editCandidateProfileContactsPage.profileContacts.fillLinkedin(linkedinUrl);
    await editCandidateProfileContactsPage.clickSaveChanges();
    await editCandidateProfileContactsPage.assertLinkedinValidationMessage(LINKEDIN_IS_INCORRECT);
  });
});
