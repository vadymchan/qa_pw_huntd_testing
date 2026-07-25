import { test as base } from '@playwright/test';
import { GuestJobsPage } from '@ui/pages/jobs/GuestJobsPage';
import { TopCompaniesPage } from '@ui/pages/jobs/TopCompaniesPage';

type MyFixtures = {
  guestJobsPage: GuestJobsPage;
  topCompaniesPage: TopCompaniesPage;
};

export const test = base.extend<MyFixtures>({
  guestJobsPage: async ({ page }, use) => {
    await use(new GuestJobsPage(page));
  },
  topCompaniesPage: async ({ page }, use) => {
    await use(new TopCompaniesPage(page));
  },
});
