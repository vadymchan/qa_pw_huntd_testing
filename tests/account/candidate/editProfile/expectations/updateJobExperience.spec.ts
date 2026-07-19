import { test } from '../../../../_fixtures/fixtures';

test.describe(`Edit profile as candidate`, () => {
  test(`User should update job experience`, async ({
    registerNewCandidate,
    editCandidateProfileJobExpectationsPage,
    candidateProfilePreviewPage,
  }) => {
    const jobExperience = '1-3 years';

    await editCandidateProfileJobExpectationsPage.open();
    await editCandidateProfileJobExpectationsPage.profileJobExpectations.selectJobExperience(
      jobExperience,
    );
    const waitForResponse = true;
    await editCandidateProfileJobExpectationsPage.clickSaveChanges(waitForResponse);

    await candidateProfilePreviewPage.open();
    await candidateProfilePreviewPage.assertJobExperienceHasText(jobExperience);
  });
});
