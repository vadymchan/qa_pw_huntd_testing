import { test as base } from '@playwright/test';
import { ChangePasswordPage } from '../../src/ui/pages/account/ChangePasswordPage';

type MyFixtures = {
  changePasswordPage: ChangePasswordPage;
};

export const test = base.extend<MyFixtures>({
  changePasswordPage: async ({ page }, use) => {
    await use(new ChangePasswordPage(page));
  },
});
