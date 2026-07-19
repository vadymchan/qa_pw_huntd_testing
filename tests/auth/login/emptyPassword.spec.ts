import { test } from '../../_fixtures/fixtures';
import { SignInUserPage } from '../../../src/ui/pages/auth/signIn/SignInUserPage';

test.describe(`Register as user`, () => {
  test(`User should see validation error when password is empty`, async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const signInUserPage = new SignInUserPage(page);
    await signInUserPage.open();
    await signInUserPage.clickSignIn();
    await signInUserPage.assertPasswordValidationMessage('Password is required');
  });
});
