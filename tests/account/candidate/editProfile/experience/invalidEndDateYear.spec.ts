import { test } from '../../../../_fixtures/fixtures';
import { YEAR_FORMAT_IS_INCORRECT } from '../../../../../src/ui/constants/validationMessages';

test.describe(`Edit profile as candidate`, () => {
  test.use({ storageState: 'playwright/.auth/candidate.json' });

  test(`User should see validation error when job experience end date year has incorrect format`, async ({
    editCandidateProfileExperiencePage,
  }) => {
    const endYear = 'incorrect format';

    await editCandidateProfileExperiencePage.open();
    await editCandidateProfileExperiencePage.clickAdd();
    await editCandidateProfileExperiencePage.profileExperience.clickEndDate();
    await editCandidateProfileExperiencePage.profileExperience.fillEndYear(endYear);
    const waitForResponse = false;
    await editCandidateProfileExperiencePage.profileExperience.clickSave(waitForResponse);
    await editCandidateProfileExperiencePage.assertEndYearValidationMessage(
      YEAR_FORMAT_IS_INCORRECT,
    );
  });
});
