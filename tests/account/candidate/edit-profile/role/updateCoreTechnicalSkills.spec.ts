import { test } from '@fixtures/fixtures';
import { CoreTechnicalSkill } from '@models/auth/candidate/CoreTechnicalSkill';

test.describe(`Edit profile as candidate`, () => {
  test(`User should update core technical skills`, async ({
    reporter,
    registerNewCandidate,
    editCandidateProfilePage,
    candidateProfilePreviewPage,
  }) => {
    await reporter.severity('normal');

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
