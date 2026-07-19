import { faker } from '@faker-js/faker';
import { test } from '../../_fixtures/fixtures';

test.describe(`Browse jobs as a guest`, () => {
  test(`Newsletter form should subscribe successfully with valid email`, async ({
    guestJobsPage,
  }) => {
    const email = faker.internet.email();

    await guestJobsPage.open();
    await guestJobsPage.fillEmail(email);
    await guestJobsPage.clickReceiveJobs();
    await guestJobsPage.assertFlashMessageTitleHasText('Subscription created');
    await guestJobsPage.assertFlashMessageTextHasText('We will notify you by email about new jobs');
  });
});
