import { test } from '../../../_fixtures/fixtures';
import { faker } from '@faker-js/faker';
import { SignUpUserPage } from '../../../../src/ui/pages/auth/sign-up/user/SignUpUserPage';
import { EMAIL_IS_ALREADY_TAKEN } from '../../../../src/ui/constants/validationMessages';

test.describe(`Register as user`, () => {
  test(`User should see validation error when email is already taken`, async ({
    reporter,
    browser,
    registerNewUser,
  }) => {
    await reporter.severity('normal');

    const page = await browser.newPage();

    const signUpUserPage = new SignUpUserPage(page);

    const password = faker.internet.password();

    await signUpUserPage.open();

    await signUpUserPage.fillEmail(registerNewUser.userCredentials.email);
    await signUpUserPage.fillPassword(password);
    await signUpUserPage.fillRepeatPassword(password);
    await signUpUserPage.clickCreateAccount();

    await signUpUserPage.assertEmailValidationMessage(EMAIL_IS_ALREADY_TAKEN);
  });
});
