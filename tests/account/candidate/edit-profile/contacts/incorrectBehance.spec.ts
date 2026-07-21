import { test } from '../../../../_fixtures/fixtures';
import { BEHANCE_IS_INCORRECT } from '../../../../../src/ui/constants/validationMessages';

test.describe(`Edit profile as candidate`, () => {
  test.use({ storageState: 'playwright/.auth/candidate.json' });

  test(`User should see validation error when Behance is invalid`, async ({
    reporter,
    editCandidateProfileContactsPage,
  }) => {
    await reporter.severity('minor');

    const behanceUrl = 'incorrect Behance format';

    await editCandidateProfileContactsPage.open();
    await editCandidateProfileContactsPage.profileContacts.fillBehance(behanceUrl);
    const waitForResponse = false;
    await editCandidateProfileContactsPage.clickSaveChanges(waitForResponse);
    await editCandidateProfileContactsPage.assertBehanceValidationMessage(BEHANCE_IS_INCORRECT);
  });
});
