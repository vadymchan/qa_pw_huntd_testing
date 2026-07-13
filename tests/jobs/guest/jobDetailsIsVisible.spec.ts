import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';

test.describe(`Browse jobs as a guest`, () => {
  test(`Job details should be visible`, async ({ page }) => {
    await page.goto('/jobs');

    await page.locator('[class*=VacancyCard_detailsButton]').first().click();

    await expect(page.locator('article[class*="VacancyCard_detailedInfo"]').first()).toHaveText(
      new RegExp('\\w+'),
    );
  });
});
