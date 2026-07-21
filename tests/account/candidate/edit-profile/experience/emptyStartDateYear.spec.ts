import { test } from '../../../../_fixtures/fixtures';
import { START_YEAR_IS_REQUIRED } from '../../../../../src/ui/constants/validationMessages';

test.describe(`Edit profile as candidate`, () => {
  test.use({ storageState: 'playwright/.auth/candidate.json' });

  test(`User should see validation error when job experience start date year is empty`, async ({
    reporter,
    editCandidateProfileExperiencePage,
  }) => {
    await reporter.severity('minor');

    await editCandidateProfileExperiencePage.open();
    await editCandidateProfileExperiencePage.clickAdd();
    const waitForResponse = false;
    await editCandidateProfileExperiencePage.profileExperience.clickSave(waitForResponse);
    await editCandidateProfileExperiencePage.assertStartYearValidationMessage(
      START_YEAR_IS_REQUIRED,
    );
  });
});
