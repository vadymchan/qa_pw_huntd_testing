import { test as base } from '@playwright/test';
import { GuestJobsPage } from '@ui/pages/jobs/GuestJobsPage';

type MyFixtures = {
  guestJobsPage: GuestJobsPage;
};

export const test = base.extend<MyFixtures>({
  guestJobsPage: async ({ page }, use) => {
    await use(new GuestJobsPage(page));
  },
});
