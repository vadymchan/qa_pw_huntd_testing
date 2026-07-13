import { faker } from '@faker-js/faker';
import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';

test.describe(`Browse jobs as a guest`, () => {
  test(`Newsletter form should subscribe successfully with valid email`, async ({ page }) => {
    const email = faker.internet.email();

    await page.goto('/jobs');

    await page.getByPlaceholder('Email').fill(email);
    await page.getByRole('button', { name: 'Receive jobs' }).click();

    await expect(page.locator('[class*=FlashMessageItem_profileTitle]')).toHaveText(
      'Subscription created',
    );
    await expect(page.locator('[class*=FlashMessageItem_text]')).toHaveText(
      'We will notify you by email about new jobs',
    );
  });
});
