import { test } from '../../../_fixtures/fixtures';

// TODO: can be made parameterized (different formats)

test.describe(`Register as user`, () => {
  test(`User should see validation error when email is invalid`, async ({ signUpUserPage }) => {
    const email = 'incorrect email format';

    await signUpUserPage.open();
    await signUpUserPage.fillEmail(email);
    await signUpUserPage.clickCreateAccount();
    await signUpUserPage.assertEmailValidationMessage('Wrong email');
  });
});
