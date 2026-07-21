import { REPEAT_PASSWORD_IS_REQUIRED } from '../../../../src/ui/constants/validationMessages';
import { test } from '../../../_fixtures/fixtures';

test.describe(`Register as user`, () => {
  test(`User should see validation error when repeat password is empty`, async ({
    reporter,
    signUpUserPage,
  }) => {
    await reporter.severity('normal');

    await signUpUserPage.open();
    await signUpUserPage.clickCreateAccount();
    await signUpUserPage.assertRepeatPasswordValidationMessage(REPEAT_PASSWORD_IS_REQUIRED);
  });
});
