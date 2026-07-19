import { test } from '../../../_fixtures/fixtures';
import { PASSWORD_IS_REQUIRED } from '../../../../src/utils/constants/validationMessages';

test.describe(`Update candidate account settings`, () => {
  test(`User should see validation error when new password is empty`, async ({
    registerNewRecruiter,
    changePasswordPage,
  }) => {
    const newPassword = '';

    const waitForResponse = false;

    await changePasswordPage.open();
    await changePasswordPage.clickChangePassword();
    await changePasswordPage.fillNewPassword(newPassword);
    await changePasswordPage.clickSaveChanges(waitForResponse);
    await changePasswordPage.assertNewPasswordValidationMessage(PASSWORD_IS_REQUIRED);
  });
});
