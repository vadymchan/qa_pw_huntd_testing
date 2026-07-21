import { test } from '../../../_fixtures/fixtures';
import { PASSWORD_IS_REQUIRED } from '../../../../src/ui/constants/validationMessages';

test.describe(`Update candidate account settings`, () => {
  test(`User should see validation error when current password is empty`, async ({
    registerNewCandidate,
    changePasswordPage,
  }) => {
    const currentPassword = '';

    const waitForResponse = false;

    await changePasswordPage.open();
    await changePasswordPage.clickChangePassword();
    await changePasswordPage.fillCurrentPassword(currentPassword);
    await changePasswordPage.clickSaveChanges(waitForResponse);
    await changePasswordPage.assertCurrentPasswordValidationMessage(PASSWORD_IS_REQUIRED);
  });
});
