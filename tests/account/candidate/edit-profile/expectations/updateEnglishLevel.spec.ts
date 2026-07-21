import { test } from '../../../../_fixtures/fixtures';

test.describe(`Edit profile as candidate`, () => {
  test(`User should update English level`, async ({
    registerNewCandidate,
    editCandidateProfileJobExpectationsPage,
    candidateProfilePreviewPage,
  }) => {
    const englishLevel = 'Pre intermediate';

    await editCandidateProfileJobExpectationsPage.open();
    await editCandidateProfileJobExpectationsPage.profileJobExpectations.selectEnglishLevel(
      englishLevel,
    );
    const waitForResponse = true;
    await editCandidateProfileJobExpectationsPage.clickSaveChanges(waitForResponse);

    await candidateProfilePreviewPage.open();
    await candidateProfilePreviewPage.assertEnglishLevelHasText(englishLevel);
  });
});
