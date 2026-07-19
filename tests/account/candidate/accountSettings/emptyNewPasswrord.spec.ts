import { test } from '../../../_fixtures/fixtures';

test.describe(`Update candidate account settings`, () => {
  test(`User should see validation error when new password is empty`, async ({
    registerNewCandidate,
    changePasswordPage,
  }) => {
    const newPassword = '';

    
    await changePasswordPage.open();
    await changePasswordPage.clickChangePassword();
    await changePasswordPage.fillNewPassword(newPassword);
    const waitForResponse = false;
    await changePasswordPage.clickSaveChanges(waitForResponse);
    await changePasswordPage.assertNewPasswordValidationMessage('Password is required');
  });
});
