import { test } from '@fixtures/fixtures';

test.describe(`Edit profile as candidate`, () => {
  test(`User should update desired annual base salary`, async ({
    reporter,
    registerNewCandidate,
    editCandidateProfileJobExpectationsPage,
    candidateProfilePreviewPage,
  }) => {
    await reporter.severity('normal');

    const salaryType = 'Annual';
    const desiredBaseSalary = 30_000;

    await editCandidateProfileJobExpectationsPage.open();
    await editCandidateProfileJobExpectationsPage.profileJobExpectations.clickSalaryType(
      salaryType,
    );
    await editCandidateProfileJobExpectationsPage.profileJobExpectations.clearDesiredBaseSalary();
    await editCandidateProfileJobExpectationsPage.profileJobExpectations.fillDesiredBaseSalary(
      `${desiredBaseSalary}`,
    );
    const waitForResponse = true;
    await editCandidateProfileJobExpectationsPage.clickSaveChanges(waitForResponse);

    await candidateProfilePreviewPage.open();
    await candidateProfilePreviewPage.assertSalaryHasText(salaryType, desiredBaseSalary);
  });
});
