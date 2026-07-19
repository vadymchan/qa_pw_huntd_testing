import { test } from '../../../../_fixtures/fixtures';

test.describe(`Edit profile as candidate`, () => {
  test(`User should add job experience`, async ({
    registerNewCandidate,
    editCandidateProfileExperiencePage,
    candidateProfilePreviewPage,
  }) => {
    const previousRole = 'Manual Qa';
    const previousCompany = 'Google';
    const startMonth = 'January';
    const startYear = 2025;
    const endMonth = 'January';
    const endYear = 2026;
    const previousJobAchivements = 'Job Achivements';

    await editCandidateProfileExperiencePage.open();
    await editCandidateProfileExperiencePage.clickAdd();
    await editCandidateProfileExperiencePage.profileExperience.fillRole(previousRole);
    await editCandidateProfileExperiencePage.profileExperience.fillCompanyName(previousCompany);
    await editCandidateProfileExperiencePage.profileExperience.selectStartMonth(startMonth);
    await editCandidateProfileExperiencePage.profileExperience.fillStartYear(`${startYear}`);
    await editCandidateProfileExperiencePage.profileExperience.clickEndDate();
    await editCandidateProfileExperiencePage.profileExperience.selectEndMonth(endMonth);
    await editCandidateProfileExperiencePage.profileExperience.fillEndYear(`${endYear}`);
    await editCandidateProfileExperiencePage.profileExperience.fillAchivements(
      previousJobAchivements,
    );
    const waitForResponse = true;
    await editCandidateProfileExperiencePage.profileExperience.clickSave(waitForResponse, 'Create');

    await candidateProfilePreviewPage.open();
    await candidateProfilePreviewPage.assertPreviousRoleHasText(previousRole);
    await candidateProfilePreviewPage.assertPreviousCompanyHasText(previousCompany);
    await candidateProfilePreviewPage.assertPreviousJobDatesHaveText(
      startMonth,
      startYear,
      endMonth,
      endYear,
    );
    await candidateProfilePreviewPage.assertPreviousJobAchivementsHaveText(previousJobAchivements);
  });
});
