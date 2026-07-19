import { test } from '../../../_fixtures/fixtures';
import { faker } from '@faker-js/faker';

test.describe(`Update candidate account settings`, () => {
  test(`User should change password successfully`, async ({
    registerNewCandidate,
    changePasswordPage,
    logoutUserPage,
    signInUserPage,
    candidateProfilePreviewPage,
  }) => {
    const currentPassword = registerNewCandidate.userCredentials.password;
    const newPassword = faker.internet.password();

    const waitForResponse = true;

    await changePasswordPage.open();
    await changePasswordPage.clickChangePassword();
    await changePasswordPage.fillCurrentPassword(currentPassword);
    await changePasswordPage.fillNewPassword(newPassword);
    await changePasswordPage.fillRepeatNewPassword(newPassword);
    await changePasswordPage.clickSaveChanges(waitForResponse);

    await logoutUserPage.clickProfile();
    await logoutUserPage.clickSignOut();

    await signInUserPage.assertOpened();
    await signInUserPage.fillEmail(registerNewCandidate.userCredentials.email);
    await signInUserPage.fillPassword(newPassword);
    await signInUserPage.clickSignIn();

    await candidateProfilePreviewPage.assertOpened();
  });
});
