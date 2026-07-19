import { test } from '../../../../_fixtures/fixtures';

test.describe(`Edit profile as candidate`, () => {
  test.use({ storageState: 'playwright/.auth/candidate.json' });

  test(`User should update achivements`, async ({ editCandidateProfileBioPage }) => {
    const achivements = '';

    await editCandidateProfileBioPage.open();
    await editCandidateProfileBioPage.profileBio.fillAchivements(achivements);
    const waitForResponse = false;
    await editCandidateProfileBioPage.clickSaveChanges(waitForResponse);
    await editCandidateProfileBioPage.assertAchivementsValidationMessage(
      '2-3 achievements are required to be noticed by startups',
    );
  });
});
