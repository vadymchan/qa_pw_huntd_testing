import { test } from '@fixtures/fixtures';
import { EMAIL_IS_INCORRECT } from '@ui/constants/validationMessages';

// TODO: can be made parameterized (different formats)

test.describe(`Register as user`, () => {
  test(`User should see validation error when email is invalid`, async ({
    reporter,
    signUpUserPage,
  }) => {
    await reporter.severity('normal');

    const email = 'incorrect email format';

    await signUpUserPage.open();
    await signUpUserPage.fillEmail(email);
    await signUpUserPage.clickCreateAccount();
    await signUpUserPage.assertEmailValidationMessage(EMAIL_IS_INCORRECT);
  });
});
