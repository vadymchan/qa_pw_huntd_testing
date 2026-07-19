import { faker } from '@faker-js/faker';
import { test } from '../../_fixtures/fixtures';
import {
  SUBSCRIPTION_SUCCESS_TEXT,
  SUBSCRIPTION_SUCCESS_TITLE,
} from '../../../src/utils/constants/guestJobsMessages';

test.describe(`Browse jobs as a guest`, () => {
  test(`Newsletter form should subscribe successfully with valid email`, async ({
    guestJobsPage,
  }) => {
    const email = faker.internet.email();

    await guestJobsPage.open();
    await guestJobsPage.fillEmail(email);
    await guestJobsPage.clickReceiveJobs();
    await guestJobsPage.assertFlashMessageTitleHasText(SUBSCRIPTION_SUCCESS_TITLE);
    await guestJobsPage.assertFlashMessageTextHasText(SUBSCRIPTION_SUCCESS_TEXT);
  });
});
