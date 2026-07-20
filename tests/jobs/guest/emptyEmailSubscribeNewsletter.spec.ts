import { EMAIL_IS_REQUIRED } from '../../../src/ui/constants/validationMessages';
import { test } from '../../_fixtures/fixtures';

test.describe(`Browse jobs as a guest`, () => {
  test(`Newsletter should show error when email is empty`, async ({ guestJobsPage }) => {
    const email = '';

    await guestJobsPage.open();
    await guestJobsPage.fillEmail(email);
    await guestJobsPage.clickReceiveJobs();
    await guestJobsPage.assertEmailValidationMessage(EMAIL_IS_REQUIRED);
  });
});
