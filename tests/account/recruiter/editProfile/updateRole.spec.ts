import { test } from '../../../_fixtures/fixtures';

test.describe(`Edit profile as recruiter`, () => {
  test(`User should update role`, async ({
    registerNewRecruiter,
    editRecruiterProfilePage,
    recruiterProfilePreviewPage,
  }) => {
    const role = 'PM';

    const waitForResponse = true;

    await editRecruiterProfilePage.open();
    await editRecruiterProfilePage.recruiterProfile.fillRole(role);
    await editRecruiterProfilePage.clickSaveChanges(waitForResponse);
    await recruiterProfilePreviewPage.open();
    await recruiterProfilePreviewPage.assertRoleHasText(role);
  });
});
