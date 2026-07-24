import { test } from '@fixtures/fixtures';
import { SignInUserPage } from '@ui/pages/auth/sign-in/SignInUserPage';
import { faker } from '@faker-js/faker';
import { WRONG_CREDENTIALS } from '@ui/constants/validationMessages';

test.describe(`Login user`, () => {
  test(`User should see validation error when password is incorrect`, async ({
    reporter,
    browser,
    registerNewUser,
  }) => {
    await reporter.severity('critical');

    const email = registerNewUser.userCredentials.email;
    const password = faker.internet.password();
    const page = await browser.newPage();

    const signInUserPage = new SignInUserPage(page);
    await signInUserPage.open();
    await signInUserPage.fillEmail(email);
    await signInUserPage.fillPassword(password);
    await signInUserPage.clickSignIn();
    await signInUserPage.assertEmailValidationMessage(WRONG_CREDENTIALS);
  });
});
