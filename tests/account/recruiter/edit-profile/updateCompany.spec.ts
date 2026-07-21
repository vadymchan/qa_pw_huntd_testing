import { test } from '../../../_fixtures/fixtures';

test.describe(`Update recruiter profile`, () => {
  test(`User should update company`, async ({
    reporter,
    registerNewRecruiter,
    editRecruiterProfilePage,
    recruiterProfilePreviewPage,
  }) => {
    await reporter.severity('normal');

    const company = 'Google';

    const waitForResponse = true;

    await editRecruiterProfilePage.open();
    await editRecruiterProfilePage.recruiterProfile.fillCompany(company);
    await editRecruiterProfilePage.clickSaveChanges(waitForResponse);
    await recruiterProfilePreviewPage.open();
    await recruiterProfilePreviewPage.assertCompanyHasText(company);
  });
});
