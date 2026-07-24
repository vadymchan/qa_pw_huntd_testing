import { test } from '@fixtures/fixtures';
import { GITHUB_IS_INCORRECT } from '@ui/constants/validationMessages';

test.describe(`Edit profile as candidate`, () => {
  test.use({ storageState: 'playwright/.auth/candidate.json' });

  test(`User should see validation error when GitHub is invalid`, async ({
    reporter,
    editCandidateProfileContactsPage,
  }) => {
    await reporter.severity('minor');

    const githubUrl = 'incorrect GitHub format';

    await editCandidateProfileContactsPage.open();
    await editCandidateProfileContactsPage.profileContacts.fillGitHub(githubUrl);
    const waitForResponse = false;
    await editCandidateProfileContactsPage.clickSaveChanges(waitForResponse);
    await editCandidateProfileContactsPage.assertGitHubValidationMessage(GITHUB_IS_INCORRECT);
  });
});
