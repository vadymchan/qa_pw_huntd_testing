import { faker } from '@faker-js/faker';
import { test } from '@fixtures/fixtures';
import {
  SUBSCRIPTION_SUCCESS_TEXT,
  SUBSCRIPTION_SUCCESS_TITLE,
} from '@ui/constants/guestJobsMessages';

test.describe(`Browse jobs as a guest`, () => {
  test(`Newsletter form should subscribe successfully with valid email`, async ({
    reporter,
    guestJobsPage,
  }) => {
    await reporter.severity('normal');

    const email = faker.internet.email();

    await guestJobsPage.open();
    await guestJobsPage.newsletterSubscription.fillEmail(email);
    await guestJobsPage.newsletterSubscription.clickReceiveJobs();
    await guestJobsPage.newsletterSubscription.assertFlashMessageTitleHasText(
      SUBSCRIPTION_SUCCESS_TITLE,
    );
    await guestJobsPage.newsletterSubscription.assertFlashMessageTextHasText(
      SUBSCRIPTION_SUCCESS_TEXT,
    );
  });
});
