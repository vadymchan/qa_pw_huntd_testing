import { PAGINATION_IS_NOT_AVAILABLE } from '../../../src/ui/constants/guestJobsMessages';
import { test } from '../../_fixtures/fixtures';

test.describe(`Browse jobs as a guest`, () => {
  test(`Pagination shouldn't be available`, async ({ reporter, guestJobsPage }) => {
    await reporter.severity('normal');

    await guestJobsPage.open();
    await guestJobsPage.clickViewMore();
    await guestJobsPage.assertModalWindowHasText(PAGINATION_IS_NOT_AVAILABLE);
  });
});
