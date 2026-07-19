import { test } from '../../../_fixtures/fixtures';

// TODO: negative tests related to sign up could be moved in one file and be made parameterized

test.describe(`Register as user`, () => {
  test(`User should see validation error when email is empty`, async ({ signUpUserPage }) => {
    await signUpUserPage.open();
    await signUpUserPage.clickCreateAccount();
    await signUpUserPage.assertEmailValidationMessage('Email is required');
  });
});
