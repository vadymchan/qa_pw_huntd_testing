import { test } from '@fixtures/fixtures';
import { faker } from '@faker-js/faker';

test.describe(`Edit profile as candidate`, () => {
  test(`User should update expectations from work`, async ({
    reporter,
    registerNewCandidate,
    editCandidateProfileBioPage,
    candidateProfilePreviewPage,
  }) => {
    await reporter.severity('normal');

    const expectations = faker.lorem.sentence();

    await editCandidateProfileBioPage.open();
    await editCandidateProfileBioPage.profileBio.fillWorkExpectations(expectations);
    await editCandidateProfileBioPage.clickSaveChangesAndWaitForSave();

    await candidateProfilePreviewPage.open();
    await candidateProfilePreviewPage.assertExpectationsHaveText(expectations);
  });
});
