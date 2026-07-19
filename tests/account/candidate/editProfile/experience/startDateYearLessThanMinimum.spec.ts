import { test } from '../../../../_fixtures/fixtures';

test.describe(`Edit profile as candidate`, () => {
  test.use({ storageState: 'playwright/.auth/candidate.json' });

  test(`User should see validation error when job experience start date year is less than minimum`, async ({
    editCandidateProfileExperiencePage,
  }) => {
    const startYear = 1924;

    await editCandidateProfileExperiencePage.open();
    await editCandidateProfileExperiencePage.clickAdd();
    await editCandidateProfileExperiencePage.profileExperience.fillStartYear(`${startYear}`);
    const waitForResponse = false;
    await editCandidateProfileExperiencePage.profileExperience.clickSave(waitForResponse);
    await editCandidateProfileExperiencePage.assertStartYearValidationMessage(
      'The date cannot be earlier than 1925',
    );
  });
});
