import { PAGINATION_IS_NOT_AVAILABLE } from '../../../src/utils/constants/guestJobsMessages';
import { test } from '../../_fixtures/fixtures';

test.describe(`Browse jobs as a guest`, () => {
  test(`Pagination shouldn't be available`, async ({ guestJobsPage }) => {
    await guestJobsPage.open();
    await guestJobsPage.clickViewMore();
    await guestJobsPage.assertModalWindowHasText(PAGINATION_IS_NOT_AVAILABLE);
  });
});
