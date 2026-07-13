import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';

test.describe(`Browse jobs as a guest`, () => {
  test(`Pagination shouldn't be available`, async ({ page }) => {
    await page.goto('/jobs');

    await page.getByRole('button', { name: 'View more' }).click();

    await expect(
      page.locator('[class*=VacanciesModal_modalWrapper]').getByRole('paragraph'),
    ).toHaveText('Sign up to see more relevant jobs');
  });
});
