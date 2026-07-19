import { test } from '../../_fixtures/fixtures';

test.describe(`Browse jobs as a guest`, () => {
  test(`Jobs should be visible`, async ({ guestJobsPage }) => {
    await guestJobsPage.open();
    await guestJobsPage.assertJobsToBeVisible();
  });
});
