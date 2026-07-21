import { test } from '../../_fixtures/fixtures';
import { SignInUserPage } from '../../../src/ui/pages/auth/sign-in/SignInUserPage';
import { PASSWORD_IS_REQUIRED } from '../../../src/ui/constants/validationMessages';

test.describe(`Login user`, () => {
  test(`User should see validation error when password is empty`, async ({ reporter, browser }) => {
    await reporter.severity('critical');

    const page = await browser.newPage();

    const signInUserPage = new SignInUserPage(page);
    await signInUserPage.open();
    await signInUserPage.clickSignIn();
    await signInUserPage.assertPasswordValidationMessage(PASSWORD_IS_REQUIRED);
  });
});
