import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';

test.describe(`Browse jobs as a guest`, () => {
  test(`Pagination shouldn't be available`, async ({ page }) => {
    await page.goto('/jobs');

    await page.locator('button', { hasText: '1-click apply' }).first().click();

    await expect(
      page.locator('[class*=VacanciesModal_modalWrapper]').getByRole('paragraph'),
    ).toHaveText(`Create a profile to apply for a job`);
  });
});
