import { test } from '@fixtures/fixtures';
import { COMPANY_NAME_IS_REQUIRED } from '@ui/constants/validationMessages';

test.describe(`Update recruiter profile`, () => {
  test.use({ storageState: 'playwright/.auth/recruiter.json' });

  test(`User should see validation error when company is empty`, async ({
    reporter,
    editRecruiterProfilePage,
  }) => {
    await reporter.severity('minor');

    const company = '';

    const waitForResponse = false;

    await editRecruiterProfilePage.open();
    await editRecruiterProfilePage.recruiterProfile.fillCompany(company);
    await editRecruiterProfilePage.clickSaveChanges(waitForResponse);
    await editRecruiterProfilePage.assertCompanyValidationMessage(COMPANY_NAME_IS_REQUIRED);
  });
});
