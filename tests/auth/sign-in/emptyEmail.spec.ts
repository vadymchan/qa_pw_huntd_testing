import { test } from '../../_fixtures/fixtures';
import { SignInUserPage } from '../../../src/ui/pages/auth/sign-in/SignInUserPage';
import { EMAIL_IS_REQUIRED } from '../../../src/ui/constants/validationMessages';

// TODO: negative tests related to sign up could be moved in one file and be made parameterized

test.describe(`Login user`, () => {
  test(`User should see validation error when email is empty`, async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const signInUserPage = new SignInUserPage(page);
    await signInUserPage.open();
    await signInUserPage.clickSignIn();
    await signInUserPage.assertEmailValidationMessage(EMAIL_IS_REQUIRED);
  });
});
