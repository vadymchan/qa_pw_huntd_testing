import { APPLYING_FOR_A_JOB_IS_NOT_AVAILABLE } from '../../../src/ui/constants/guestJobsMessages';
import { test } from '../../_fixtures/fixtures';

test.describe(`Browse jobs as a guest`, () => {
  test(`Applying for a job shouldn't be available`, async ({ reporter, guestJobsPage }) => {
    await reporter.severity('normal');

    await guestJobsPage.open();
    await guestJobsPage.clickApply();
    await guestJobsPage.assertModalWindowHasText(APPLYING_FOR_A_JOB_IS_NOT_AVAILABLE);
  });
});
