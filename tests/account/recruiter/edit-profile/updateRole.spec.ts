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

    const waitForResponse = true;

    await editRecruiterProfilePage.open();
    await editRecruiterProfilePage.recruiterProfile.fillRole(role);
    await editRecruiterProfilePage.clickSaveChanges(waitForResponse);
    await recruiterProfilePreviewPage.open();
    await recruiterProfilePreviewPage.assertRoleHasText(role);
  });
});
