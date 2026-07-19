import { test as base } from '@playwright/test';
import { ChangePasswordPage } from '../../src/ui/pages/account/ChangePasswordPage';

type MyFixture = {
  changePasswordPage: ChangePasswordPage;
};

export const test = base.extend<MyFixture>({
  changePasswordPage: async ({ page }, use) => {
    await use(new ChangePasswordPage(page));
  },
});
