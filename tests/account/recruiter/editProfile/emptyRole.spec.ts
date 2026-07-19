import { test } from '../../../_fixtures/fixtures';

test.describe(`Update recruiter profile`, () => {
  test.use({ storageState: 'playwright/.auth/recruiter.json' });

  test(`User should see validation error when role is empty`, async ({
    editRecruiterProfilePage,
  }) => {
    const role = '';

    const waitForResponse = false;

    await editRecruiterProfilePage.open();
    await editRecruiterProfilePage.recruiterProfile.fillRole(role);
    await editRecruiterProfilePage.clickSaveChanges(waitForResponse);
    await editRecruiterProfilePage.assertRoleValidationMessage('Role is required');
  });
});
