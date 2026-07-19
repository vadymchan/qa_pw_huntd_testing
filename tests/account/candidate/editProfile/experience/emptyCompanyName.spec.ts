import { test } from '../../../../_fixtures/fixtures';
import { COMPANY_IS_REQUIRED } from '../../../../../src/utils/constants/validationMessages';

test.describe(`Edit profile as candidate`, () => {
  test.use({ storageState: 'playwright/.auth/candidate.json' });

  test(`User should see validation error when job experience role is empty`, async ({
    editCandidateProfileExperiencePage,
  }) => {
    await editCandidateProfileExperiencePage.open();
    await editCandidateProfileExperiencePage.clickAdd();
    const waitForResponse = false;
    await editCandidateProfileExperiencePage.profileExperience.clickSave(waitForResponse);
    await editCandidateProfileExperiencePage.assertCompanyNameValidationMessage(
      COMPANY_IS_REQUIRED,
    );
  });
});
