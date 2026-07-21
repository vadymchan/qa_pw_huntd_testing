import { test } from '../../../../_fixtures/fixtures';

import { generateProfileContacts } from '../../../../../src/utils/generators/generateProfileContacts';

test.describe(`Edit profile as candidate`, () => {
  test(`User should update Linkedin`, async ({
    registerNewCandidate,
    editCandidateProfileContactsPage,
    candidateProfilePreviewPage,
  }) => {
    const linkedinUrl = generateProfileContacts().linkedinUrl;

    await editCandidateProfileContactsPage.open();
    await editCandidateProfileContactsPage.profileContacts.fillLinkedin(linkedinUrl);
    const waitForResponse = true;
    await editCandidateProfileContactsPage.clickSaveChanges(waitForResponse);

    await candidateProfilePreviewPage.open();
    await candidateProfilePreviewPage.assertLinkedinHasCorrectUrl(linkedinUrl);
  });
});
