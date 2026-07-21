import { Role } from '../../../../../src/common/models/auth/candidate/Role';
import { test } from '../../../../_fixtures/fixtures';

test.describe(`Edit profile as candidate`, () => {
  test(`User should update desired roles`, async ({
    reporter,
    registerNewCandidate,
    editCandidateProfilePage,
    candidateProfilePreviewPage,
  }) => {
    await reporter.severity('normal');

    const desiredRoles: Array<Role> = ['QA'];

    await editCandidateProfilePage.open();
    await editCandidateProfilePage.clickClearDesiredRoles();
    await editCandidateProfilePage.candidateProfile.selectDesiredRoles(desiredRoles);
    const waitForResponse = true;
    await editCandidateProfilePage.clickSaveChanges(waitForResponse);

    await candidateProfilePreviewPage.open();
    await candidateProfilePreviewPage.assertDesiredRolesHaveText(desiredRoles);
  });
});
