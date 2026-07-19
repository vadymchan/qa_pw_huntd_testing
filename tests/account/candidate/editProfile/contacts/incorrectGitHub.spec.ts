import { test } from '../../../../_fixtures/fixtures';

test.describe(`Edit profile as candidate`, () => {
  test.use({ storageState: 'playwright/.auth/candidate.json' });

  test(`User should see validation error when GitHub is invalid`, async ({
    editCandidateProfileContactsPage,
  }) => {
    const githubUrl = 'incorrect GitHub format';

    await editCandidateProfileContactsPage.open();
    await editCandidateProfileContactsPage.profileContacts.fillGitHub(githubUrl);
    const waitForResponse = false;
    await editCandidateProfileContactsPage.clickSaveChanges(waitForResponse);
    await editCandidateProfileContactsPage.assertGitHubValidationMessage(
      'Please enter correct Github link',
    );
  });
});
