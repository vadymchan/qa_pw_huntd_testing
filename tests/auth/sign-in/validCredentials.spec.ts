import { test } from '../../_fixtures/fixtures';
import { SignInUserPage } from '../../../src/ui/pages/auth/sign-in/SignInUserPage';
import { ChooseProfilePage } from '../../../src/ui/pages/auth/sign-up/user/ChooseProfilePage';

test.describe(`Login user`, () => {
  test(`User should login with valid credentials`, async ({ browser, registerNewUser }) => {
    const email = registerNewUser.userCredentials.email;
    const password = registerNewUser.userCredentials.password;
    const context = await browser.newContext();
    const page = await context.newPage();

    const signInUserPage = new SignInUserPage(page);
    await signInUserPage.open();
    await signInUserPage.fillEmail(email);
    await signInUserPage.fillPassword(password);
    await signInUserPage.clickSignIn();

    const chooseProfilePage = new ChooseProfilePage(page);
    await chooseProfilePage.assertOpened();
  });
});
