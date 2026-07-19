import { test } from '../../_fixtures/fixtures';
import { SignInUserPage } from '../../../src/ui/pages/auth/signIn/SignInUserPage';

// TODO: negative tests related to sign up could be moved in one file and be made parameterized

test.describe(`Register as user`, () => {
  test(`User should see validation error when email is empty`, async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const signInUserPage = new SignInUserPage(page);
    await signInUserPage.open();
    await signInUserPage.clickSignIn();
    await signInUserPage.assertEmailValidationMessage('Email is required');
  });
});
