import { APPLYING_FOR_A_JOB_IS_NOT_AVAILABLE } from '../../../src/ui/constants/guestJobsMessages';
import { test } from '../../_fixtures/fixtures';

test.describe(`Browse jobs as a guest`, () => {
  test(`Applying for a job shouldn't be available`, async ({ guestJobsPage }) => {
    await guestJobsPage.open();
    await guestJobsPage.clickApply();
    await guestJobsPage.assertModalWindowHasText(APPLYING_FOR_A_JOB_IS_NOT_AVAILABLE);
  });
});
