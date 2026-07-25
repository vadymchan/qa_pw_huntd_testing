import { expect, Locator, Page } from '@playwright/test';
import { PATHS } from '@ui/constants/paths';
import { BasePage } from '@ui/pages/BasePage';

export class TopCompaniesPage extends BasePage {
  private company: Locator;
  private companyName: Locator;
  private companyLogo: Locator;
  private companyJobs: Locator;
  private companyNames: Locator;
  private companyLogoName: string;

  constructor(page: Page) {
    super(page, PATHS.web3Companies);

    this.companyLogoName = 'Company logo';

    this.company = page.locator('[class*=Web3Companies_companyWrapper]').first();
    this.companyName = this.company.locator('[class*=Web3Companies_companyTitle]');
    this.companyLogo = this.company.locator('a[class*=Web3Companies_companyLogoContainer]');
    this.companyJobs = page.locator('[class*=VacancyCard_companyInfo]');
    this.companyNames = page.locator('[class*=VacancyCard_companyName]');
  }

  async clickCompanyLogo() {
    await this.step(`Click '${this.companyLogoName}'`, async () => {
      await this.companyLogo.click();
    });
  }

  async getCompanyName() {
    return await this.step(`Get company name`, async () => {
      return await this.companyName.textContent();
    });
  }

  async assertJobsAreFilteredByCompany(companyName: string) {
    await this.step(`Assert jobs are filtered by '${companyName}' company`, async () => {
      await expect(this.companyJobs).not.toHaveCount(0);

      const jobsCount = await this.companyJobs.count();

      const expectedCompanyNames = Array(jobsCount).fill(companyName);

      await expect(this.companyNames).toHaveText(expectedCompanyNames);
    });
  }
}
