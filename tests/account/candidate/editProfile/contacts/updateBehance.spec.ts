import { test } from '../../../../_fixtures/fixtures';
import { generateProfileContacts } from '../../../../../src/utils/generators/generateProfileContacts';

test.describe(`Edit profile as candidate`, () => {
  test(`User should update Behance`, async ({
    registerNewCandidate,
    editCandidateProfileContactsPage,
    candidateProfilePreviewPage,
  }) => {
    const behanceUrl = generateProfileContacts().behanceUrl;

    await editCandidateProfileContactsPage.open();
    await editCandidateProfileContactsPage.profileContacts.fillBehance(behanceUrl);
    const waitForResponse = true;
    await editCandidateProfileContactsPage.clickSaveChanges(waitForResponse);

    await candidateProfilePreviewPage.open();
    await candidateProfilePreviewPage.assertBehanceHasCorrectUrl(behanceUrl);
  });
});
