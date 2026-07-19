import { test } from '../../../_fixtures/fixtures';

test.describe(`Register as user`, () => {
  test(`User should see validation error when repeat password is empty`, async ({
    signUpUserPage,
  }) => {
    await signUpUserPage.open();
    await signUpUserPage.clickCreateAccount();
    await signUpUserPage.assertRepeatPasswordValidationMessage('Please repeat your password');
  });
});
