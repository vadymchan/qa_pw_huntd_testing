import { test } from '@fixtures/fixtures';
import { DESIRED_POSITION_IS_REQUIRED } from '@ui/constants/validationMessages';

test.describe(`Edit profile as candidate`, () => {
  test.use({ storageState: 'playwright/.auth/candidate.json' });

  test(`User should see validation error when desired position is empt`, async ({
    reporter,
    editCandidateProfilePage,
  }) => {
    await reporter.severity('minor');

    const desiredPosition = '';

    await editCandidateProfilePage.open();
    await editCandidateProfilePage.candidateProfile.fillDesiredPosition(desiredPosition);
    const waitForResponse = false;
    await editCandidateProfilePage.clickSaveChanges(waitForResponse);
    await editCandidateProfilePage.assertDesiredPositionValidationMessage(
      DESIRED_POSITION_IS_REQUIRED,
    );
  });
});
