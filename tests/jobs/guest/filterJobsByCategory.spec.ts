import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';

test.describe(`Browse jobs as a guest`, () => {
  test(`Jobs should filtered by category`, async ({ page }) => {
    await page.goto('/jobs');

    const category = page.locator('a[class*=VacanciesNav_link]').first();
    const categoryUrl = (await category.getAttribute('href'))!;

    await category.click();

    await expect(page).toHaveURL(categoryUrl);
  });
});
