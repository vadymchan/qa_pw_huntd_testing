import { test } from '@fixtures/fixtures';
import { SignInUserPage } from '@ui/pages/auth/sign-in/SignInUserPage';
import { ChooseProfilePage } from '@ui/pages/auth/sign-up/user/ChooseProfilePage';

test.describe(`Login user`, () => {
  test(`User should login with valid credentials`, async ({
    reporter,
    browser,
    registerNewUser,
  }) => {
    await reporter.severity('blocker');

    const email = registerNewUser.userCredentials.email;
    const password = registerNewUser.userCredentials.password;
    const page = await browser.newPage();

    const signInUserPage = new SignInUserPage(page);
    await signInUserPage.open();
    await signInUserPage.fillEmail(email);
    await signInUserPage.fillPassword(password);
    await signInUserPage.clickSignIn();

    const chooseProfilePage = new ChooseProfilePage(page);
    await chooseProfilePage.assertOpened();
  });
});
