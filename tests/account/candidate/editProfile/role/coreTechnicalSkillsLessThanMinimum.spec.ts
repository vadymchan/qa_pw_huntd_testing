import { test } from '../../../../_fixtures/fixtures';
import { CoreTechnicalSkill } from '../../../../../src/models/auth/candidate/CoreTechnicalSkill';
import { CORE_TECHNICAL_SKILLS_BELOW_MINIMUM } from '../../../../../src/utils/constants/validationMessages';

test.describe(`Edit profile as candidate`, () => {
  test.use({ storageState: 'playwright/.auth/candidate.json' });

  test(`User should see validation error when core technical skills are fewer than minimum`, async ({
    editCandidateProfilePage,
  }) => {
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
