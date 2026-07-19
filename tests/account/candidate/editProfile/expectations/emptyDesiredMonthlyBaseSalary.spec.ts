import { test } from '../../../../_fixtures/fixtures';

test.describe(`Edit profile as candidate`, () => {
  test.use({ storageState: 'playwright/.auth/candidate.json' });

  test(`User should see validation error when desired monthly base salary is empty`, async ({
    editCandidateProfileJobExpectationsPage,
  }) => {
    const salaryType = 'Monthly';

    await editCandidateProfileJobExpectationsPage.open();
    await editCandidateProfileJobExpectationsPage.profileJobExpectations.clickSalaryType(
      salaryType,
    );
    await editCandidateProfileJobExpectationsPage.profileJobExpectations.clearDesiredBaseSalary();
    const waitForResponse = false;
    await editCandidateProfileJobExpectationsPage.clickSaveChanges(waitForResponse);
    await editCandidateProfileJobExpectationsPage.assertDesiredBaseSalaryValidationMessage(
      'Salary is required',
    );
  });
});
