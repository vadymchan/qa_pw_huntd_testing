import { test } from '../../../../_fixtures/fixtures';
import { ACHIVEMENTS_ARE_REQUIRED } from '../../../../../src/ui/constants/validationMessages';

test.describe(`Edit profile as candidate`, () => {
  test.use({ storageState: 'playwright/.auth/candidate.json' });

  test(`User should update achievements`, async ({ editCandidateProfileBioPage }) => {
    const achievements = '';

    await editCandidateProfileBioPage.open();
    await editCandidateProfileBioPage.profileBio.fillAchievements(achievements);
    const waitForResponse = false;
    await editCandidateProfileBioPage.clickSaveChanges(waitForResponse);
    await editCandidateProfileBioPage.assertAchievementsValidationMessage(ACHIVEMENTS_ARE_REQUIRED);
  });
});
