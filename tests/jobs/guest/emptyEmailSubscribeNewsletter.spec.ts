import { EMAIL_IS_REQUIRED } from '@ui/constants/validationMessages';
import { test } from '@fixtures/fixtures';

test.describe(`Browse jobs as a guest`, () => {
  test(`Newsletter should show error when email is empty`, async ({ reporter, guestJobsPage }) => {
    await reporter.severity('normal');

    const email = '';

    await guestJobsPage.open();
    await guestJobsPage.newsletterSubscription.fillEmail(email);
    await guestJobsPage.newsletterSubscription.clickReceiveJobs();
    await guestJobsPage.newsletterSubscription.assertEmailValidationMessage(EMAIL_IS_REQUIRED);
  });
});
