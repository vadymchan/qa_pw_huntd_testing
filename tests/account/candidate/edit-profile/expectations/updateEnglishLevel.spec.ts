import { test } from '@fixtures/fixtures';

test.describe(`Edit profile as candidate`, () => {
  test(`User should update English level`, async ({
    reporter,
    registerNewCandidate,
    editCandidateProfileJobExpectationsPage,
    candidateProfilePreviewPage,
  }) => {
    await reporter.severity('normal');

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
