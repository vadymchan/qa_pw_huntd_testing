import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';

test.describe(`Browse jobs as a guest`, () => {
  test(`Jobs should filtered by company`, async ({ page }) => {
    await page.goto('/jobs');

    await page.getByRole('link', { name: 'Top companies' }).click();

    const company = page.locator('[class*=Web3Companies_companyWrapper]').first();

    const companyImageUrl = (await company.getByRole('img').getAttribute('src'))!;
    const companyName = await company.locator('[class*=Web3Companies_companyTitle]').textContent();

    await company.locator('a[class*=Web3Companies_companyLogoContainer]').click();

    const companyJobs = page.locator('[class*=VacancyCard_companyInfo]');

    const jobsCount = await companyJobs.count();

    const expectedCompanyNames = Array(jobsCount).fill(companyName);

    await expect(companyJobs.locator('[class*=VacancyCard_companyName]')).toHaveText(
      expectedCompanyNames,
    );

    for (let i = 0; i < jobsCount; i++) {
      const jobImage = companyJobs.getByRole('img').nth(i);
      await expect(jobImage).toHaveAttribute('src', companyImageUrl);
    }
  });
});
