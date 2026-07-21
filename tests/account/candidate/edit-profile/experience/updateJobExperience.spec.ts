import { test } from '../../../../_fixtures/fixtures';

test.describe(`Edit profile as candidate`, () => {
  test(`User should update job experience`, async ({
    reporter,
    registerNewCandidate,
    editCandidateProfileExperiencePage,
    candidateProfilePreviewPage,
  }) => {
    await reporter.severity('normal');

    const previousRole = 'Manual Qa';
    const previousCompany = 'Google';
    const startMonth = 'March';
    const startYear = 2024;
    const endMonth = 'April';
    const endYear = 2025;
    const previousJobAchievements = 'Updated Job Achievements';

    await editCandidateProfileExperiencePage.open();
    await editCandidateProfileExperiencePage.clickEdit();
    await editCandidateProfileExperiencePage.profileExperience.fillRole(previousRole);
    await editCandidateProfileExperiencePage.profileExperience.fillCompanyName(previousCompany);
    await editCandidateProfileExperiencePage.profileExperience.selectStartMonth(startMonth);
    await editCandidateProfileExperiencePage.profileExperience.fillStartYear(`${startYear}`);
    await editCandidateProfileExperiencePage.profileExperience.clickEndDate();
    await editCandidateProfileExperiencePage.profileExperience.selectEndMonth(endMonth);
    await editCandidateProfileExperiencePage.profileExperience.fillEndYear(`${endYear}`);
    await editCandidateProfileExperiencePage.profileExperience.fillAchievements(
      previousJobAchievements,
    );
    const waitForResponse = true;
    await editCandidateProfileExperiencePage.profileExperience.clickSave(waitForResponse, 'Update');

    await candidateProfilePreviewPage.open();
    await candidateProfilePreviewPage.assertPreviousRoleHasText(previousRole);
    await candidateProfilePreviewPage.assertPreviousCompanyHasText(previousCompany);
    await candidateProfilePreviewPage.assertPreviousJobDatesHaveText(
      startMonth,
      startYear,
      endMonth,
      endYear,
    );
    await candidateProfilePreviewPage.assertPreviousJobAchievementsHaveText(
      previousJobAchievements,
    );
  });
});
