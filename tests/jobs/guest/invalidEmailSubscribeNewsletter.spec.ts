import { EMAIL_IS_INCORRECT } from '../../../src/ui/constants/validationMessages';
import { test } from '../../_fixtures/fixtures';

test.describe(`Browse jobs as a guest`, () => {
  test(`Newsletter should show error when email has incorrect format`, async ({
    guestJobsPage,
  }) => {
    const email = 'incorrect format';

    await guestJobsPage.open();
    await guestJobsPage.fillEmail(email);
    await guestJobsPage.clickReceiveJobs();
    await guestJobsPage.assertEmailValidationMessage(EMAIL_IS_INCORRECT);
  });
});
