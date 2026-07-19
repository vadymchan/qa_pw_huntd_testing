import { test } from '../../_fixtures/fixtures';

test.describe(`Browse jobs as a guest`, () => {
  test(`Job details should be visible`, async ({ guestJobsPage }) => {
    await guestJobsPage.open();
    await guestJobsPage.clickJobDetails();
    await guestJobsPage.assertJobDetailsHaveSomeText();
  });
});
