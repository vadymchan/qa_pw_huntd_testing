import { test } from '@fixtures/fixtures';

test.describe(`Edit profile as recruiter`, () => {
  test(`User should update role`, async ({
    reporter,
    registerNewRecruiter,
    editRecruiterProfilePage,
    recruiterProfilePreviewPage,
  }) => {
    await reporter.severity('normal');

    const role = 'PM';

    await editRecruiterProfilePage.open();
    await editRecruiterProfilePage.recruiterProfile.fillRole(role);
    await editRecruiterProfilePage.clickSaveChangesAndWaitForSave();
    await recruiterProfilePreviewPage.open();
    await recruiterProfilePreviewPage.assertRoleHasText(role);
  });
});
