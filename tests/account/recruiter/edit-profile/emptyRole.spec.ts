import { test } from '@fixtures/fixtures';
import { ROLE_IS_REQUIRED } from '@ui/constants/validationMessages';

test.describe(`Update recruiter profile`, () => {
  test.use({ storageState: 'playwright/.auth/recruiter.json' });

  test(`User should see validation error when role is empty`, async ({
    reporter,
    editRecruiterProfilePage,
  }) => {
    await reporter.severity('minor');

    const role = '';

    const waitForResponse = false;

    await editRecruiterProfilePage.open();
    await editRecruiterProfilePage.recruiterProfile.fillRole(role);
    await editRecruiterProfilePage.clickSaveChanges(waitForResponse);
    await editRecruiterProfilePage.assertRoleValidationMessage(ROLE_IS_REQUIRED);
  });
});
