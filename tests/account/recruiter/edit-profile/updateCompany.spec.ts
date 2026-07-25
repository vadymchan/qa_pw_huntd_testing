import { test } from '@fixtures/fixtures';

test.describe(`Update recruiter profile`, () => {
  test(`User should update company`, async ({
    reporter,
    registerNewRecruiter,
    editRecruiterProfilePage,
    recruiterProfilePreviewPage,
  }) => {
    await reporter.severity('normal');

    const company = 'Google';

    await editRecruiterProfilePage.open();
    await editRecruiterProfilePage.recruiterProfile.fillCompany(company);
    await editRecruiterProfilePage.clickSaveChangesAndWaitForSave();
    await recruiterProfilePreviewPage.open();
    await recruiterProfilePreviewPage.assertCompanyHasText(company);
  });
});
