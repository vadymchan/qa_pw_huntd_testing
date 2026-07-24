import { PASSWORD_IS_MISMATCHED } from '@ui/constants/validationMessages';
import { test } from '@fixtures/fixtures';
import { faker } from '@faker-js/faker';

test.describe(`Register as user`, () => {
  test(`User should see validation error when email is invalid`, async ({
    reporter,
    signUpUserPage,
  }) => {
    await reporter.severity('normal');

    const password = faker.internet.password();
    const repeatPassword = password.slice(0, -1);

    await signUpUserPage.open();
    await signUpUserPage.fillPassword(password);
    await signUpUserPage.fillRepeatPassword(repeatPassword);
    await signUpUserPage.clickCreateAccount();
    await signUpUserPage.assertRepeatPasswordValidationMessage(PASSWORD_IS_MISMATCHED);
  });
});
