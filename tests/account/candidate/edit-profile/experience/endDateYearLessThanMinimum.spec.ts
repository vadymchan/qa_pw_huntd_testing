import { test } from '@fixtures/fixtures';
import { YEAR_IS_LESS_THAN_MINIMUM } from '@ui/constants/validationMessages';

test.describe(`Edit profile as candidate`, () => {
  test.use({ storageState: 'playwright/.auth/candidate.json' });

  test(`User should see validation error when job experience end date year is less than minimum`, async ({
    reporter,
    editCandidateProfileExperiencePage,
  }) => {
    await reporter.severity('minor');

    const endYear = 1924;

    await editCandidateProfileExperiencePage.open();
    await editCandidateProfileExperiencePage.clickAdd();
    await editCandidateProfileExperiencePage.profileExperience.clickEndDate();
    await editCandidateProfileExperiencePage.profileExperience.fillEndYear(`${endYear}`);
    const waitForResponse = false;
    await editCandidateProfileExperiencePage.profileExperience.clickSave(waitForResponse);
    await editCandidateProfileExperiencePage.assertEndYearValidationMessage(
      YEAR_IS_LESS_THAN_MINIMUM,
    );
  });
});
