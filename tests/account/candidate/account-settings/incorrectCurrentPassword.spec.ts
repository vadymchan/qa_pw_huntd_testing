import { test } from '../../../_fixtures/fixtures';
import { faker } from '@faker-js/faker';
import { WRONG_CREDENTIALS } from '../../../../src/ui/constants/validationMessages';

test.describe(`Update candidate account settings`, () => {
  test(`User should see validation error when current password is incorrect`, async ({
    registerNewCandidate,
    changePasswordPage,
  }) => {
    const incorrectPassword = faker.internet.password();
    const newPassword = faker.internet.password();

    const waitForResponse = false;

    await changePasswordPage.open();
    await changePasswordPage.clickChangePassword();
    await changePasswordPage.fillCurrentPassword(incorrectPassword);
    await changePasswordPage.fillNewPassword(newPassword);
    await changePasswordPage.fillRepeatNewPassword(newPassword);
    await changePasswordPage.clickSaveChanges(waitForResponse);
    await changePasswordPage.assertCurrentPasswordValidationMessage(WRONG_CREDENTIALS);
  });
});
