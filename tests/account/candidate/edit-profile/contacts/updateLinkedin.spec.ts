import { test } from '../../../../_fixtures/fixtures';

import { createProfileContacts } from '../../../../../src/common/factories/createProfileContacts';

test.describe(`Edit profile as candidate`, () => {
  test(`User should update Linkedin`, async ({
    registerNewCandidate,
    editCandidateProfileContactsPage,
    candidateProfilePreviewPage,
  }) => {
    const linkedinUrl = createProfileContacts().linkedinUrl;

    await editCandidateProfileContactsPage.open();
    await editCandidateProfileContactsPage.profileContacts.fillLinkedin(linkedinUrl);
    const waitForResponse = true;
    await editCandidateProfileContactsPage.clickSaveChanges(waitForResponse);

    await candidateProfilePreviewPage.open();
    await candidateProfilePreviewPage.assertLinkedinHasCorrectUrl(linkedinUrl);
  });
});
