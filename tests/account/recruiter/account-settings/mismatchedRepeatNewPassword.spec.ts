import { test } from '../../../_fixtures/fixtures';
import { faker } from '@faker-js/faker';
import { PASSWORD_IS_MISMATCHED } from '../../../../src/ui/constants/validationMessages';

test.describe(`Update recruiter account settings`, () => {
  test(`User should see validation error when repeat new password is mismatched`, async ({
    reporter,
    registerNewRecruiter,
    changePasswordPage,
  }) => {
    await reporter.severity('minor');

    const currentPassword = registerNewRecruiter.userCredentials.password;
    const newPassword = faker.internet.password();
    const repeatNewPassword = faker.internet.password();

    const waitForResponse = false;

    await changePasswordPage.open();
    await changePasswordPage.clickChangePassword();
    await changePasswordPage.fillCurrentPassword(currentPassword);
    await changePasswordPage.fillNewPassword(newPassword);
    await changePasswordPage.fillRepeatNewPassword(repeatNewPassword);
    await changePasswordPage.clickSaveChanges(waitForResponse);
    await changePasswordPage.assertRepeatNewPasswordValidationMessage(PASSWORD_IS_MISMATCHED);
  });
});
