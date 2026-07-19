import { test } from '../../../_fixtures/fixtures';

test.describe(`Update recruiter account settings`, () => {
  test(`User should see validation error when repeat new password is empty`, async ({
    registerNewRecruiter,
    changePasswordPage,
  }) => {
    const newPassword = '';

    const waitForResponse = false;

    await changePasswordPage.open();
    await changePasswordPage.clickChangePassword();
    await changePasswordPage.fillRepeatNewPassword(newPassword);
    await changePasswordPage.clickSaveChanges(waitForResponse);
    await changePasswordPage.assertRepeatNewPasswordValidationMessage(
      'Please repeat your password',
    );
  });
});
