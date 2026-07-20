import { test } from '../../../../_fixtures/fixtures';
import { ACHIVEMENTS_ARE_REQUIRED } from '../../../../../src/ui/constants/validationMessages';

test.describe(`Edit profile as candidate`, () => {
  test.use({ storageState: 'playwright/.auth/candidate.json' });

  test(`User should update achivements`, async ({ editCandidateProfileBioPage }) => {
    const achivements = '';

    await editCandidateProfileBioPage.open();
    await editCandidateProfileBioPage.profileBio.fillAchivements(achivements);
    const waitForResponse = false;
    await editCandidateProfileBioPage.clickSaveChanges(waitForResponse);
    await editCandidateProfileBioPage.assertAchivementsValidationMessage(ACHIVEMENTS_ARE_REQUIRED);
  });
});
