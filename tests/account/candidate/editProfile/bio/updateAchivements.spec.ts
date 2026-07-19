import { test } from '../../../../_fixtures/fixtures';
import { faker } from '@faker-js/faker';

test.describe(`Edit profile as candidate`, () => {
  test(`User should update achivements`, async ({
    registerNewCandidate,
    editCandidateProfileBioPage,
    candidateProfilePreviewPage,
  }) => {
    const achivements = faker.lorem.sentence();

    await editCandidateProfileBioPage.open();
    await editCandidateProfileBioPage.profileBio.fillAchivements(achivements);
    const waitForResponse = true;
    await editCandidateProfileBioPage.clickSaveChanges(waitForResponse);

    await candidateProfilePreviewPage.open();
    await candidateProfilePreviewPage.assertAchivementsHaveText(achivements);
  });
});
