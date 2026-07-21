import { test } from '../../../_fixtures/fixtures';
import { EMAIL_IS_INCORRECT } from '../../../../src/ui/constants/validationMessages';

// TODO: can be made parameterized (different formats)

test.describe(`Register as user`, () => {
  test(`User should see validation error when email is invalid`, async ({ signUpUserPage }) => {
    const email = 'incorrect email format';

    await signUpUserPage.open();
    await signUpUserPage.fillEmail(email);
    await signUpUserPage.clickCreateAccount();
    await signUpUserPage.assertEmailValidationMessage(EMAIL_IS_INCORRECT);
  });
});
