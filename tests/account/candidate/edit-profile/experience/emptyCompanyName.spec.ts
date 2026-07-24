import { test } from '@fixtures/fixtures';
import { CANDIDATE_COMPANY_NAME_IS_REQUIRED } from '@ui/constants/validationMessages';

test.describe(`Edit profile as candidate`, () => {
  test.use({ storageState: 'playwright/.auth/candidate.json' });

  test(`User should see validation error when job experience role is empty`, async ({
    reporter,
    editCandidateProfileExperiencePage,
  }) => {
    await reporter.severity('minor');

    await editCandidateProfileExperiencePage.open();
    await editCandidateProfileExperiencePage.clickAdd();
    const waitForResponse = false;
    await editCandidateProfileExperiencePage.profileExperience.clickSave(waitForResponse);
    await editCandidateProfileExperiencePage.assertCompanyNameValidationMessage(
      CANDIDATE_COMPANY_NAME_IS_REQUIRED,
    );
  });
});
