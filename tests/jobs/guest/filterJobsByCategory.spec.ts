import { test } from '../../_fixtures/fixtures';

test.describe(`Browse jobs as a guest`, () => {
  test(`Jobs should filtered by category`, async ({ guestJobsPage }) => {
    await guestJobsPage.open();
    const categoryUrl = (await guestJobsPage.getCategoryUrl())!;
    await guestJobsPage.clickCategory();
    await guestJobsPage.assertRedirectedToCategoryPage(categoryUrl);
  });
});
