import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';

test.describe(`Browse jobs as a guest`, () => {
  test(`Jobs should be visible`, async ({ page }) => {
    await page.goto('/jobs');

    await expect(
      page
        .getByRole('list')
        .filter({ has: page.locator('[class*=VacancyCard]') })
        .first(),
    ).toBeVisible();
  });
});
