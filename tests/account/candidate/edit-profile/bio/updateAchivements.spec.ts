import { test } from '../../../../_fixtures/fixtures';
import { faker } from '@faker-js/faker';

test.describe(`Edit profile as candidate`, () => {
  test(`User should update achievements`, async ({
    registerNewCandidate,
    editCandidateProfileBioPage,
    candidateProfilePreviewPage,
  }) => {
    const achievements = faker.lorem.sentence();

    await editCandidateProfileBioPage.open();
    await editCandidateProfileBioPage.profileBio.fillAchievements(achievements);
    const waitForResponse = true;
    await editCandidateProfileBioPage.clickSaveChanges(waitForResponse);

    await candidateProfilePreviewPage.open();
    await candidateProfilePreviewPage.assertAchievementsHaveText(achievements);
  });
});
