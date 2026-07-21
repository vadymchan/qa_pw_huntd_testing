import { test } from '../../../../_fixtures/fixtures';
import { CORE_TECHNICAL_SKILLS_BELOW_MINIMUM } from '../../../../../src/ui/constants/validationMessages';

test.describe(`Edit profile as candidate`, () => {
  test.use({ storageState: 'playwright/.auth/candidate.json' });

  test(`User should see validation error when core technical skills is empty`, async ({
    reporter,
    editCandidateProfilePage,
  }) => {
    await reporter.severity('minor');

    await editCandidateProfilePage.open();
    await editCandidateProfilePage.clickClearCoreTechnicalSkills();
    const waitForResponse = false;
    await editCandidateProfilePage.clickSaveChanges(waitForResponse);
    await editCandidateProfilePage.assertCoreTechnicalSkillsValidationMessage(
      CORE_TECHNICAL_SKILLS_BELOW_MINIMUM,
    );
  });
});
