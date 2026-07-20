import { PASSWORD_IS_REQUIRED } from '../../../../src/ui/constants/validationMessages';
import { test } from '../../../_fixtures/fixtures';

test.describe(`Register as user`, () => {
  test(`User should see validation error when password is empty`, async ({ signUpUserPage }) => {
    await signUpUserPage.open();
    await signUpUserPage.clickCreateAccount();
    await signUpUserPage.assertPasswordValidationMessage(PASSWORD_IS_REQUIRED);
  });
});
