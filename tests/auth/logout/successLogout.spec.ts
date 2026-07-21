import { test } from '../../_fixtures/fixtures';

test.describe(`Logout user`, () => {
  test.use({ storageState: 'playwright/.auth/candidate.json' });

  test(`User should logout successfully`, async ({ reporter, logoutUserPage, signInUserPage }) => {
    await reporter.severity('normal');

    await logoutUserPage.open();
    await logoutUserPage.clickProfile();
    await logoutUserPage.clickSignOut();
    await signInUserPage.assertOpened();
  });
});
