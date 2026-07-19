import { test } from '../../../../_fixtures/fixtures';

test.describe(`Edit profile as candidate`, () => {
  test.use({ storageState: 'playwright/.auth/candidate.json' });

  test(`User should see validation error when Behance is invalid`, async ({
    editCandidateProfileContactsPage,
  }) => {
    const behanceUrl = 'incorrect Behance format';

    await editCandidateProfileContactsPage.open();
    await editCandidateProfileContactsPage.profileContacts.fillBehance(behanceUrl);
    const waitForResponse = false;
    await editCandidateProfileContactsPage.clickSaveChanges(waitForResponse);
    await editCandidateProfileContactsPage.assertBehanceValidationMessage(
      'Please enter correct Behance link',
    );
  });
});
