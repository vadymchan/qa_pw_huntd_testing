import { test } from '@fixtures/fixtures';
import { CoreTechnicalSkill } from '@models/auth/candidate/CoreTechnicalSkill';
import { CORE_TECHNICAL_SKILLS_BELOW_MINIMUM } from '@ui/constants/validationMessages';

test.describe(`Edit profile as candidate`, () => {
  test.use({ storageState: 'playwright/.auth/candidate.json' });

  test(`User should see validation error when core technical skills are fewer than minimum`, async ({
    reporter,
    editCandidateProfilePage,
  }) => {
    await reporter.severity('normal');

    const coreTechnicalSkills: Array<CoreTechnicalSkill> = [
      'Python',
      'GraphQL',
      'MySQL',
      'Big Data',
    ];

    await editCandidateProfilePage.open();
    await editCandidateProfilePage.clickClearCoreTechnicalSkills();
    await editCandidateProfilePage.candidateProfile.selectCoreTechnicalSkills(coreTechnicalSkills);
    const waitForResponse = false;
    await editCandidateProfilePage.clickSaveChanges(waitForResponse);
    await editCandidateProfilePage.assertCoreTechnicalSkillsValidationMessage(
      CORE_TECHNICAL_SKILLS_BELOW_MINIMUM,
    );
  });
});
