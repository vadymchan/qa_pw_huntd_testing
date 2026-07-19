import { test } from '../../../../_fixtures/fixtures';
import { generateProfileContacts } from '../../../../../src/utils/generators/generateProfileContacts';

test.describe(`Edit profile as candidate`, () => {
  test(`User should update GitHub`, async ({
    registerNewCandidate,
    editCandidateProfileContactsPage,
    candidateProfilePreviewPage,
  }) => {
    const githubUrl = generateProfileContacts().githubUrl;

    await editCandidateProfileContactsPage.open();
    await editCandidateProfileContactsPage.profileContacts.fillGitHub(githubUrl);
    const waitForResponse = true;
    await editCandidateProfileContactsPage.clickSaveChanges(waitForResponse);

    await candidateProfilePreviewPage.open();
    await candidateProfilePreviewPage.assertGitHubHasCorrectUrl(githubUrl);
  });
});
