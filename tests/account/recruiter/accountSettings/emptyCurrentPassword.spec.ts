import { test } from '../../../_fixtures/fixtures';

test.describe(`Update recruiter account settings`, () => {
  test(`User should see validation error when current password is empty`, async ({
    registerNewRecruiter,
    changePasswordPage,
  }) => {
    const currentPassword = '';

    const waitForResponse = false;

    await changePasswordPage.open();
    await changePasswordPage.clickChangePassword();
    await changePasswordPage.fillCurrentPassword(currentPassword);
    await changePasswordPage.clickSaveChanges(waitForResponse);
    await changePasswordPage.assertCurrentPasswordValidationMessage('Password is required');
  });
});
