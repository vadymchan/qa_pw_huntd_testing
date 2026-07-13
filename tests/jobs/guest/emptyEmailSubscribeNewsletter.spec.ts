import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';

test.describe(`Browse jobs as a guest`, () => {
  test(`Newsletter should show error when email is empty`, async ({ page }) => {
    const email = '';

    await page.goto('/jobs');

    await page.getByPlaceholder('Email').fill(email);
    await page.getByRole('button', { name: 'Receive jobs' }).click();

    await expect(page.locator('[class*=FormField_metaBlock]').last()).toHaveText(
      'Email is required',
    );
  });
});
