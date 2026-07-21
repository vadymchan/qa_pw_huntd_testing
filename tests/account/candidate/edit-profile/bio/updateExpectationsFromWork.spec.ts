import { test } from '../../../../_fixtures/fixtures';
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
    const waitForResponse = true;
    await editCandidateProfileBioPage.clickSaveChanges(waitForResponse);

    await candidateProfilePreviewPage.open();
    await candidateProfilePreviewPage.assertExpectationsHaveText(expectations);
  });
});
