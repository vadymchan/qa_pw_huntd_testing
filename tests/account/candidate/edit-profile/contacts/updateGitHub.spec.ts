import { test } from '../../../../_fixtures/fixtures';
import { createProfileContacts } from '../../../../../src/common/factories/createProfileContacts';

test.describe(`Edit profile as candidate`, () => {
  test(`User should update GitHub`, async ({
    registerNewCandidate,
    editCandidateProfileContactsPage,
    candidateProfilePreviewPage,
  }) => {
    const githubUrl = createProfileContacts().githubUrl;

    await editCandidateProfileContactsPage.open();
    await editCandidateProfileContactsPage.profileContacts.fillGitHub(githubUrl);
    const waitForResponse = true;
    await editCandidateProfileContactsPage.clickSaveChanges(waitForResponse);

    await candidateProfilePreviewPage.open();
    await candidateProfilePreviewPage.assertGitHubHasCorrectUrl(githubUrl);
  });
});
