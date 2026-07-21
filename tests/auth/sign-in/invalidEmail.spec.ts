import { test } from '../../_fixtures/fixtures';
import { SignInUserPage } from '../../../src/ui/pages/auth/sign-in/SignInUserPage';
import { faker } from '@faker-js/faker';
import { WRONG_CREDENTIALS } from '../../../src/ui/constants/validationMessages';

test.describe(`Login user`, () => {
  test(`User should see validation error when email is incorrect`, async ({
    browser,
    registerNewUser,
  }) => {
    const email = faker.internet.email();
    const password = registerNewUser.userCredentials.password;
    const context = await browser.newContext();
    const page = await context.newPage();

    const signInUserPage = new SignInUserPage(page);
    await signInUserPage.open();
    await signInUserPage.fillEmail(email);
    await signInUserPage.fillPassword(password);
    await signInUserPage.clickSignIn();
    await signInUserPage.assertEmailValidationMessage(WRONG_CREDENTIALS);
  });
});
