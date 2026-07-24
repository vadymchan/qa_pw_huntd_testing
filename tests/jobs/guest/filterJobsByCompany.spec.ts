import { test } from '@fixtures/fixtures';

test.describe(`Browse jobs as a guest`, () => {
  test(`Jobs should filtered by company`, async ({ reporter, guestJobsPage }) => {
    await reporter.severity('normal');

    await guestJobsPage.open();
    await guestJobsPage.clickTopCompanies();
    const companyImageUrl = (await guestJobsPage.getCompanyImageUrl())!;
    const companyName = (await guestJobsPage.getCompanyName())!;
    await guestJobsPage.clickCompanyLogo();
    await guestJobsPage.assertJobsAreFilteredByCompany(companyName, companyImageUrl);
  });
});
