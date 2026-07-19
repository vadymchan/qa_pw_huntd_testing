import { test } from '../../../../_fixtures/fixtures';

test.describe(`Edit profile as candidate`, () => {
  test(`User should delete job experience`, async ({
    registerNewCandidate,
    editCandidateProfileExperiencePage,
    candidateProfilePreviewPage,
  }) => {
    await editCandidateProfileExperiencePage.open();
    await editCandidateProfileExperiencePage.clickDelete();

    await candidateProfilePreviewPage.open();
    await candidateProfilePreviewPage.assertNoWorkExperienceIsVisible();
  });
});
