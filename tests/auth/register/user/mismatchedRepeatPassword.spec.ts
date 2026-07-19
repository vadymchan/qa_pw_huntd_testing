import { test } from '../../../_fixtures/fixtures';
import { faker } from '@faker-js/faker';

test.describe(`Register as user`, () => {
  test(`User should see validation error when email is invalid`, async ({ signUpUserPage }) => {
    const password = faker.internet.password();
    const repeatPassword = password.slice(0, -1);

    await signUpUserPage.open();
    await signUpUserPage.fillPassword(password);
    await signUpUserPage.fillRepeatPassword(repeatPassword);
    await signUpUserPage.clickCreateAccount();
    await signUpUserPage.assertRepeatPasswordValidationMessage(
      'Please make sure your passwords match',
    );
  });
});
