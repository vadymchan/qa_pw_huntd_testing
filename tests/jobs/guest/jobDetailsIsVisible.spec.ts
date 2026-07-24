import { test } from '@fixtures/fixtures';

test.describe(`Browse jobs as a guest`, () => {
  test(`Job details should be visible`, async ({ reporter, guestJobsPage }) => {
    await reporter.severity('normal');

    await guestJobsPage.open();
    await guestJobsPage.clickJobDetails();
    await guestJobsPage.assertJobDetailsHaveSomeText();
  });
});
