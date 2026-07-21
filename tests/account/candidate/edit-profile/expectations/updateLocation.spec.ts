import { test } from '../../../../_fixtures/fixtures';

test.describe(`Edit profile as candidate`, () => {
  test(`User should update location`, async ({
    registerNewCandidate,
    editCandidateProfileJobExpectationsPage,
    candidateProfilePreviewPage,
  }) => {
    const location = 'Kyiv';

    await editCandidateProfileJobExpectationsPage.open();
    await editCandidateProfileJobExpectationsPage.profileJobExpectations.selectYourLocation(
      location,
    );
    const waitForResponse = true;
    await editCandidateProfileJobExpectationsPage.clickSaveChanges(waitForResponse);

    await candidateProfilePreviewPage.open();
    await candidateProfilePreviewPage.assertLocationContainsText(location);
  });
});
