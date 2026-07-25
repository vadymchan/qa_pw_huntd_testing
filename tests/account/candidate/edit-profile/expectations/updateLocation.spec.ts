import { test } from '@fixtures/fixtures';

test.describe(`Edit profile as candidate`, () => {
  test(`User should update location`, async ({
    reporter,
    registerNewCandidate,
    editCandidateProfileJobExpectationsPage,
    candidateProfilePreviewPage,
  }) => {
    await reporter.severity('normal');

    const location = 'Kyiv';

    await editCandidateProfileJobExpectationsPage.open();
    await editCandidateProfileJobExpectationsPage.profileJobExpectations.selectYourLocation(
      location,
    );
    await editCandidateProfileJobExpectationsPage.clickSaveChangesAndWaitForSave();

    await candidateProfilePreviewPage.open();
    await candidateProfilePreviewPage.assertLocationContainsText(location);
  });
});
