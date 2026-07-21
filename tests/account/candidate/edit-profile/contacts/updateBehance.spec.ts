import { test } from '../../../../_fixtures/fixtures';
import { createProfileContacts } from '../../../../../src/common/factories/createProfileContacts';

test.describe(`Edit profile as candidate`, () => {
  test(`User should update Behance`, async ({
    reporter,
    registerNewCandidate,
    editCandidateProfileContactsPage,
    candidateProfilePreviewPage,
  }) => {
    await reporter.severity('normal');

    const behanceUrl = createProfileContacts().behanceUrl;

    await editCandidateProfileContactsPage.open();
    await editCandidateProfileContactsPage.profileContacts.fillBehance(behanceUrl);
    const waitForResponse = true;
    await editCandidateProfileContactsPage.clickSaveChanges(waitForResponse);

    await candidateProfilePreviewPage.open();
    await candidateProfilePreviewPage.assertBehanceHasCorrectUrl(behanceUrl);
  });
});
