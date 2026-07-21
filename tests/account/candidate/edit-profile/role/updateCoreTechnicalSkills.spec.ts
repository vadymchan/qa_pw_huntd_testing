import { test } from '../../../../_fixtures/fixtures';
import { CoreTechnicalSkill } from '../../../../../src/common/models/auth/candidate/CoreTechnicalSkill';

test.describe(`Edit profile as candidate`, () => {
  test(`User should update core technical skills`, async ({
    registerNewCandidate,
    editCandidateProfilePage,
    candidateProfilePreviewPage,
  }) => {
    const coreTechnicalSkills: Array<CoreTechnicalSkill> = [
      'Python',
      'GraphQL',
      'MySQL',
      'Big Data',
      'Data Science',
    ];

    await editCandidateProfilePage.open();
    await editCandidateProfilePage.clickClearCoreTechnicalSkills();
    await editCandidateProfilePage.candidateProfile.selectCoreTechnicalSkills(coreTechnicalSkills);
    const waitForResponse = true;
    await editCandidateProfilePage.clickSaveChanges(waitForResponse);

    await candidateProfilePreviewPage.open();
    await candidateProfilePreviewPage.assertCoreTechnicalSkillsHaveText(coreTechnicalSkills);
  });
});
