import { test } from '@fixtures/fixtures';
import { END_DATE_CANNOT_PRECEDE_START_DATE } from '@ui/constants/validationMessages';

test.describe(`Edit profile as candidate`, () => {
  test.use({ storageState: 'playwright/.auth/candidate.json' });

  test(`User should see validation error when job experience start date is after end date`, async ({
    reporter,
    editCandidateProfileExperiencePage,
  }) => {
    await reporter.severity('minor');

    const previousRole = 'Manual Qa';
    const previousCompany = 'Google';
    const startMonth = 'January';
    const startYear = 2026;
    const endYear = 2025;

    await editCandidateProfileExperiencePage.open();
    await editCandidateProfileExperiencePage.clickAdd();
    await editCandidateProfileExperiencePage.profileExperience.fillRole(previousRole);
    await editCandidateProfileExperiencePage.profileExperience.fillCompanyName(previousCompany);
    await editCandidateProfileExperiencePage.profileExperience.selectStartMonth(startMonth);
    await editCandidateProfileExperiencePage.profileExperience.fillStartYear(`${startYear}`);
    await editCandidateProfileExperiencePage.profileExperience.clickEndDate();
    await editCandidateProfileExperiencePage.profileExperience.fillEndYear(`${endYear}`);
    const waitForResponse = false;
    await editCandidateProfileExperiencePage.profileExperience.clickSave(waitForResponse);
    await editCandidateProfileExperiencePage.assertEndYearValidationMessage(
      END_DATE_CANNOT_PRECEDE_START_DATE,
    );
  });
});
