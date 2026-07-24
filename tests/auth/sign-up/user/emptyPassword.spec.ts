import { PASSWORD_IS_REQUIRED } from '@ui/constants/validationMessages';
import { test } from '@fixtures/fixtures';

test.describe(`Register as user`, () => {
  test(`User should see validation error when password is empty`, async ({
    reporter,
    signUpUserPage,
  }) => {
    await reporter.severity('normal');

    await signUpUserPage.open();
    await signUpUserPage.clickCreateAccount();
    await signUpUserPage.assertPasswordValidationMessage(PASSWORD_IS_REQUIRED);
  });
});
