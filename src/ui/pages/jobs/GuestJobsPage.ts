import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@ui/pages/BasePage';
import { PATHS } from '@ui/constants/paths';

export class GuestJobsPage extends BasePage {
  private apply: Locator;
  private email: Locator;
  private emailValidationMessage: Locator;
  private receiveJobs: Locator;
  private category: Locator;
  private topCompanies: Locator;
  private company: Locator;
  private companyName: Locator;
  private companyLogo: Locator;
  private companyJobs: Locator;
  private companyNames: Locator;
  private jobDetailsButton: Locator;
  private jobDetailsText: Locator;
  private jobs: Locator;
  private viewMore: Locator;
  private modalWindow: Locator;
  private flashMessageTitle: Locator;
  private flashMessageText: Locator;
  private applyName: string;
  private emailLabel: string;
  private receiveJobsName: string;
  private categoryName: string;
  private topCompaniesName: string;
  private companyLogoName: string;
  private jobDetailsName: string;
  private viewMoreName: string;

  constructor(page: Page) {
    super(page, PATHS.jobs);

    this.applyName = '1-click apply';
    this.emailLabel = 'Email';
    this.receiveJobsName = 'Receive jobs';
    this.categoryName = 'Category';
    this.topCompaniesName = 'Top companies';
    this.companyLogoName = 'Company logo';
    this.jobDetailsName = 'Job details';
    this.viewMoreName = 'View more';

    this.apply = page.locator('button', { hasText: this.applyName }).first();
    this.email = page.getByPlaceholder(this.emailLabel);
    this.emailValidationMessage = page.locator('[class*=FormField_metaBlock]').last();
    this.receiveJobs = page.getByRole('button', { name: this.receiveJobsName });
    this.category = page.locator('a[class*=VacanciesNav_link]').first();
    this.topCompanies = page.getByRole('link', { name: this.topCompaniesName });
    this.company = page.locator('[class*=Web3Companies_companyWrapper]').first();
    this.companyName = this.company.locator('[class*=Web3Companies_companyTitle]');
    this.companyLogo = this.company.locator('a[class*=Web3Companies_companyLogoContainer]');
    this.companyJobs = page.locator('[class*=VacancyCard_companyInfo]');
    this.companyNames = this.companyJobs = page.locator('[class*=VacancyCard_companyInfo]');
    this.jobDetailsButton = page.locator('[class*=VacancyCard_detailsButton]').first();
    this.jobDetailsText = page.locator('article[class*="VacancyCard_detailedInfo"]').first();
    this.jobs = page.getByRole('list').filter({ has: page.locator('[class*=VacancyCard]') });
    this.viewMore = page.getByRole('button', { name: this.viewMoreName });
    this.modalWindow = page.locator('[class*=VacanciesModal_modalWrapper]').getByRole('paragraph');
    this.flashMessageTitle = page.locator('[class*=FlashMessageItem_profileTitle]');
    this.flashMessageText = page.locator('[class*=FlashMessageItem_text]');
  }

  async fillEmail(email: string) {
    await this.step(`Fill '${this.emailLabel}'`, async () => {
      await this.email.fill(email);
    });
  }

  async clickApply() {
    await this.step(`Click '${this.applyName}'`, async () => {
      await this.apply.click();
    });
  }

  async clickReceiveJobs() {
    await this.step(`Click '${this.receiveJobsName}'`, async () => {
      await this.receiveJobs.click();
    });
  }

  async clickCategory() {
    await this.step(`Click '${this.categoryName}'`, async () => {
      await this.category.click();
    });
  }

  async clickTopCompanies() {
    await this.step(`Click '${this.topCompaniesName}'`, async () => {
      await this.topCompanies.click();
    });
  }

  async clickCompanyLogo() {
    await this.step(`Click '${this.companyLogoName}'`, async () => {
      await this.companyLogo.click();
    });
  }

  async clickJobDetails() {
    await this.step(`Click '${this.jobDetailsText}'`, async () => {
      await this.jobDetailsButton.click();
    });
  }

  async clickViewMore() {
    await this.step(`Click '${this.viewMoreName}'`, async () => {
      await this.viewMore.click();
    });
  }

  async getCategoryUrl() {
    return await this.step(`Get category url`, async () => {
      return await this.category.getAttribute('href');
    });
  }

  async getCompanyImageUrl() {
    return await this.step(`Get company image url`, async () => {
      return await this.company.getByRole('img').getAttribute('src');
    });
  }

  async getCompanyName() {
    return await this.step(`Get company name`, async () => {
      return await this.companyName.textContent();
    });
  }

  async assertEmailValidationMessage(validationMessage: string) {
    await this.step(
      `Assert '${this.emailLabel}' shows '${validationMessage}' validation message`,
      async () => {
        await expect(this.emailValidationMessage).toHaveText(validationMessage);
      },
    );
  }

  // TODO: consider moving outside (not tightly related to GuestJobsPage)
  async assertRedirectedToCategoryPage(categoryUrl: string) {
    await this.step(`Assert page is redirrected to '${categoryUrl}'`, async () => {
      await expect(this.page).toHaveURL(categoryUrl);
    });
  }

  async assertJobsAreFilteredByCompany(companyName: string, companyImageUrl: string) {
    await this.step(`Assert jobs are filtered by '${companyName}' company`, async () => {
      const jobsCount = await this.companyJobs.count();

      const expectedCompanyNames = Array(jobsCount).fill(companyName);

      await expect(this.companyNames).toHaveText(expectedCompanyNames);

      const companyImages = this.companyJobs.getByRole('img');

      for (let i = 0; i < jobsCount; i++) {
        const companyImage = companyImages.nth(i);
        await expect(companyImage).toHaveAttribute('src', companyImageUrl);
      }
    });
  }

  async assertJobDetailsHaveSomeText() {
    await this.step(`Assert jobs details have some text`, async () => {
      await expect(this.jobDetailsText).toHaveText(new RegExp('\\w+'));
    });
  }

  async assertJobsToBeVisible() {
    await this.step(`Assert jobs are visible`, async () => {
      await expect(this.jobs).toBeVisible();
    });
  }

  async assertModalWindowHasText(modalWindow: string) {
    await this.step(`Assert modal window has '${modalWindow}' text`, async () => {
      await expect(this.modalWindow).toHaveText(modalWindow);
    });
  }

  async assertFlashMessageTitleHasText(flashMessageTitle: string) {
    await this.step(`Assert flash message title has '${flashMessageTitle}' text`, async () => {
      await expect(this.flashMessageTitle).toHaveText(flashMessageTitle);
    });
  }

  async assertFlashMessageTextHasText(flashMessageText: string) {
    await this.step(`Assert flash message text has '${flashMessageText}' text`, async () => {
      await expect(this.flashMessageText).toHaveText(flashMessageText);
    });
  }
}
