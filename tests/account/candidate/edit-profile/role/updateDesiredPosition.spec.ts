import { test } from '../../../../_fixtures/fixtures';

test.describe(`Edit profile as candidate`, () => {
  test(`User should update desired position`, async ({
    registerNewCandidate,
    editCandidateProfilePage,
    candidateProfilePreviewPage,
  }) => {
    const desiredPosition = 'Fullstack';

    await editCandidateProfilePage.open();
    await editCandidateProfilePage.candidateProfile.fillDesiredPosition(desiredPosition);
    const waitForResponse = true;
    await editCandidateProfilePage.clickSaveChanges(waitForResponse);

    await candidateProfilePreviewPage.open();
    await candidateProfilePreviewPage.assertDesiredPositionHasText(desiredPosition);
  });
});
