import { test } from '@fixtures/fixtures';

import { createProfileContacts } from '@factories/createProfileContacts';

test.describe(`Edit profile as candidate`, () => {
  test(`User should update Linkedin`, async ({
    reporter,
    registerNewCandidate,
    editCandidateProfileContactsPage,
    candidateProfilePreviewPage,
  }) => {
    await reporter.severity('normal');

    const linkedinUrl = createProfileContacts().linkedinUrl;

    await editCandidateProfileContactsPage.open();
    await editCandidateProfileContactsPage.profileContacts.fillLinkedin(linkedinUrl);
    const waitForResponse = true;
    await editCandidateProfileContactsPage.clickSaveChanges(waitForResponse);

    await candidateProfilePreviewPage.open();
    await candidateProfilePreviewPage.assertLinkedinHasCorrectUrl(linkedinUrl);
  });
});
