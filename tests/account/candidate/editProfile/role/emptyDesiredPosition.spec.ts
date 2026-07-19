import { test } from '../../../../_fixtures/fixtures';

test.describe(`Edit profile as candidate`, () => {
  test.use({ storageState: 'playwright/.auth/candidate.json' });

  test(`User should see validation error when desired position is empt`, async ({
    editCandidateProfilePage,
  }) => {
    const desiredPosition = '';

    await editCandidateProfilePage.open();
    await editCandidateProfilePage.candidateProfile.fillDesiredPosition(desiredPosition);
    const waitForResponse = false;
    await editCandidateProfilePage.clickSaveChanges(waitForResponse);
    await editCandidateProfilePage.assertDesiredPositionValidationMessage('Position is required');
  });
});
