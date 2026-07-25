import { test } from '@fixtures/fixtures';
import { START_MONTH_IS_REQUIRED } from '@ui/constants/validationMessages';

test.describe(`Edit profile as candidate`, () => {
  test.use({ storageState: 'playwright/.auth/candidate.json' });

  test(`User should see validation error when job experience start date month is empty`, async ({
    reporter,
    editCandidateProfileExperiencePage,
  }) => {
    await reporter.severity('minor');

    await editCandidateProfileExperiencePage.open();
    await editCandidateProfileExperiencePage.clickAdd();
    await editCandidateProfileExperiencePage.profileExperience.clickSave();
    await editCandidateProfileExperiencePage.assertStartMonthValidationMessage(
      START_MONTH_IS_REQUIRED,
    );
  });
});
