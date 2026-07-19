import { test } from '../../../../_fixtures/fixtures';

test.describe(`Edit profile as candidate`, () => {
  test(`User should update desired monthly base salary`, async ({
    registerNewCandidate,
    editCandidateProfileJobExpectationsPage,
    candidateProfilePreviewPage,
  }) => {
    const salaryType = 'Monthly';
    const desiredBaseSalary = 2_500;

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
