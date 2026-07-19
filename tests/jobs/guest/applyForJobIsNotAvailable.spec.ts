import { test } from '../../_fixtures/fixtures';

test.describe(`Browse jobs as a guest`, () => {
  test(`Applying for a job shouldn't be available`, async ({ guestJobsPage }) => {
    await guestJobsPage.open();
    await guestJobsPage.clickApply();
    await guestJobsPage.assertModalWindowHasText('Create a profile to apply for a job');
  });
});
