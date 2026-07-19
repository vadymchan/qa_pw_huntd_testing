import { test } from '../../_fixtures/fixtures';
import { SignInUserPage } from '../../../src/ui/pages/auth/signIn/SignInUserPage';
import { faker } from '@faker-js/faker';
import { WRONG_CREDENTIALS } from '../../../src/utils/constants/validationMessages';

test.describe(`Login user`, () => {
  test(`User should see validation error when password is incorrect`, async ({
    browser,
    registerNewUser,
  }) => {
    const email = registerNewUser.userCredentials.email;
    const password = faker.internet.password();
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
