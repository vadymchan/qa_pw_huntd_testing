import { test } from '@fixtures/fixtures';

test.describe(`Browse jobs as a guest`, () => {
  test(`Jobs should filtered by category`, async ({ reporter, guestJobsPage }) => {
    await reporter.severity('normal');

    await guestJobsPage.open();
    const categoryUrl = (await guestJobsPage.getCategoryUrl())!;
    await guestJobsPage.clickCategory();
    await guestJobsPage.assertRedirectedToCategoryPage(categoryUrl);
  });
});
