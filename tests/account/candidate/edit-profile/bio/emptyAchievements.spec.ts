import { test } from '@fixtures/fixtures';
import { ACHIEVEMENTS_ARE_REQUIRED } from '@ui/constants/validationMessages';

test.describe(`Edit profile as candidate`, () => {
  test.use({ storageState: 'playwright/.auth/candidate.json' });

  test(`User should update achievements`, async ({ reporter, editCandidateProfileBioPage }) => {
    await reporter.severity('minor');

    const achievements = '';

    await editCandidateProfileBioPage.open();
    await editCandidateProfileBioPage.profileBio.fillAchievements(achievements);
    await editCandidateProfileBioPage.clickSaveChanges();
    await editCandidateProfileBioPage.assertAchievementsValidationMessage(
      ACHIEVEMENTS_ARE_REQUIRED,
    );
  });
});
