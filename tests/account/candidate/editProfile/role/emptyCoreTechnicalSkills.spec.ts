import { test } from '../../../../_fixtures/fixtures';

test.describe(`Edit profile as candidate`, () => {
  test.use({ storageState: 'playwright/.auth/candidate.json' });

  test(`User should see validation error when core technical skills is empty`, async ({
    editCandidateProfilePage,
  }) => {
    await editCandidateProfilePage.open();
    await editCandidateProfilePage.clickClearCoreTechnicalSkills();
    const waitForResponse = false;
    await editCandidateProfilePage.clickSaveChanges(waitForResponse);
    await editCandidateProfilePage.assertCoreTechnicalSkillsValidationMessage(
      'Select at least 5 skills',
    );
  });
});
