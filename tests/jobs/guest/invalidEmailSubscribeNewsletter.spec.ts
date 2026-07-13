import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';

test.describe(`Browse jobs as a guest`, () => {
  test(`Newsletter should show error when email has incorrect format`, async ({ page }) => {
    const email = 'incorrect format';

    await page.goto('/jobs');

    await page.getByPlaceholder('Email').fill(email);
    await page.getByRole('button', { name: 'Receive jobs' }).click();

    await expect(page.locator('[class*=FormField_metaBlock]').last()).toHaveText('Wrong email');
  });
});
