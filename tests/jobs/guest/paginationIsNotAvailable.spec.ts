import { test } from '../../_fixtures/fixtures';

test.describe(`Browse jobs as a guest`, () => {
  test(`Pagination shouldn't be available`, async ({ guestJobsPage }) => {
    await guestJobsPage.open();
    await guestJobsPage.clickViewMore();
    await guestJobsPage.assertModalWindowHasText('Sign up to see more relevant jobs');
  });
});
