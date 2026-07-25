import { test } from '@fixtures/fixtures';

test.describe(`Edit profile as candidate`, () => {
  test(`User should update desired position`, async ({
    reporter,
    registerNewCandidate,
    editCandidateProfilePage,
    candidateProfilePreviewPage,
  }) => {
    await reporter.severity('normal');

    const desiredPosition = 'Fullstack';

    await editCandidateProfilePage.open();
    await editCandidateProfilePage.candidateProfile.fillDesiredPosition(desiredPosition);
    await editCandidateProfilePage.clickSaveChangesAndWaitForSave();

    await candidateProfilePreviewPage.open();
    await candidateProfilePreviewPage.assertDesiredPositionHasText(desiredPosition);
  });
});
