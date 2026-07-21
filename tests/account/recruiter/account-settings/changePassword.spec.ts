import { test } from '../../../_fixtures/fixtures';
import { faker } from '@faker-js/faker';

test.describe(`Update recruiter account settings`, () => {
  test(`User should change password successfully`, async ({
    registerNewRecruiter,
    changePasswordPage,
    logoutUserPage,
    signInUserPage,
    recruiterProfilePreviewPage: recruiterProfilePreviewPage,
  }) => {
    const currentPassword = registerNewRecruiter.userCredentials.password;
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
    await signInUserPage.fillEmail(registerNewRecruiter.userCredentials.email);
    await signInUserPage.fillPassword(newPassword);
    await signInUserPage.clickSignIn();

    await recruiterProfilePreviewPage.assertOpened();
  });
});
