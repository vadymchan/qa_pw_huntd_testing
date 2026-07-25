import { test } from '@fixtures/fixtures';

test.describe(`Browse jobs as a guest`, () => {
  test(`Jobs should be filtered by company`, async ({ reporter, topCompaniesPage }) => {
    await reporter.severity('normal');

    await topCompaniesPage.open();
    const companyName = (await topCompaniesPage.getCompanyName())!;
    await topCompaniesPage.clickCompanyLogo();
    await topCompaniesPage.assertJobsAreFilteredByCompany(companyName);
  });
});
