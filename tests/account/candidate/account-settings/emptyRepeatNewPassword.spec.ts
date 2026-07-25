import { test } from '@fixtures/fixtures';
import { REPEAT_PASSWORD_IS_REQUIRED } from '@ui/constants/validationMessages';

test.describe(`Update candidate account settings`, () => {
  test(`User should see validation error when repeat new password is empty`, async ({
    reporter,
    registerNewCandidate,
    changePasswordPage,
  }) => {
    await reporter.severity('minor');

    const newPassword = '';

    await changePasswordPage.open();
    await changePasswordPage.clickChangePassword();
    await changePasswordPage.fillRepeatNewPassword(newPassword);
    await changePasswordPage.clickSaveChanges();
    await changePasswordPage.assertRepeatNewPasswordValidationMessage(REPEAT_PASSWORD_IS_REQUIRED);
  });
});
