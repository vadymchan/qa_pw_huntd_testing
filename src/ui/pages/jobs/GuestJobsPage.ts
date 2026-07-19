import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

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

  constructor(page: Page) {
    super(page, '/jobs');

    this.apply = page.locator('button', { hasText: '1-click apply' }).first();
    this.email = page.getByPlaceholder('Email');
    this.emailValidationMessage = page.locator('[class*=FormField_metaBlock]').last();
    this.receiveJobs = page.getByRole('button', { name: 'Receive jobs' });
    this.category = page.locator('a[class*=VacanciesNav_link]').first();
    this.topCompanies = page.getByRole('link', { name: 'Top companies' });
    this.company = page.locator('[class*=Web3Companies_companyWrapper]').first();
    this.companyName = this.company.locator('[class*=Web3Companies_companyTitle]');
    this.companyLogo = this.company.locator('a[class*=Web3Companies_companyLogoContainer]');
    this.companyJobs = page.locator('[class*=VacancyCard_companyInfo]');
    this.companyNames = this.companyJobs = page.locator('[class*=VacancyCard_companyInfo]');
    this.jobDetailsButton = page.locator('[class*=VacancyCard_detailsButton]').first();
    this.jobDetailsText = page.locator('article[class*="VacancyCard_detailedInfo"]').first();
    this.jobs = page.getByRole('list').filter({ has: page.locator('[class*=VacancyCard]') });
    this.viewMore = page.getByRole('button', { name: 'View more' });
    this.modalWindow = page.locator('[class*=VacanciesModal_modalWrapper]').getByRole('paragraph');
    this.flashMessageTitle = page.locator('[class*=FlashMessageItem_profileTitle]');
    this.flashMessageText = page.locator('[class*=FlashMessageItem_text]');
  }

  async fillEmail(email: string) {
    await this.email.fill(email);
  }

  async clickApply() {
    await this.apply.click();
  }

  async clickReceiveJobs() {
    await this.receiveJobs.click();
  }

  async clickCategory() {
    await this.category.click();
  }

  async clickTopCompanies() {
    await this.topCompanies.click();
  }

  async clickCompanyLogo() {
    await this.companyLogo.click();
  }

  async clickJobDetails() {
    await this.jobDetailsButton.click();
  }

  async clickViewMore() {
    await this.viewMore.click();
  }

  async getCategoryUrl() {
    return await this.category.getAttribute('href');
  }

  async getCompanyImageUrl() {
    return await this.company.getByRole('img').getAttribute('src');
  }

  async getCompanyName() {
    return await this.companyName.textContent();
  }

  async assertEmailValidationMessage(emailValidationMessage: string) {
    await expect(this.emailValidationMessage).toHaveText(emailValidationMessage);
  }

  // TODO: consider moving outside (not tightly related to GuestJobsPage)
  async assertRedirectedToCategoryPage(categoryUrl: string) {
    await expect(this.page).toHaveURL(categoryUrl);
  }

  async assertJobsAreFilteredByCompany(companyName: string, companyImageUrl: string) {
    const jobsCount = await this.companyJobs.count();

    const expectedCompanyNames = Array(jobsCount).fill(companyName);

    await expect(this.companyNames).toHaveText(expectedCompanyNames);

    const companyImages = this.companyJobs.getByRole('img');

    for (let i = 0; i < jobsCount; i++) {
      const companyImage = companyImages.nth(i);
      await expect(companyImage).toHaveAttribute('src', companyImageUrl);
    }
  }

  async assertJobDetailsHaveSomeText() {
    await expect(this.jobDetailsText).toHaveText(new RegExp('\\w+'));
  }

  async assertJobsToBeVisible() {
    await expect(this.jobs).toBeVisible();
  }

  async assertModalWindowHasText(modalWindow: string) {
    await expect(this.modalWindow).toHaveText(modalWindow);
  }

  async assertFlashMessageTitleHasText(flashMessageTitle: string) {
    await expect(this.flashMessageTitle).toHaveText(flashMessageTitle);
  }

  async assertFlashMessageTextHasText(flashMessageText: string) {
    await expect(this.flashMessageText).toHaveText(flashMessageText);
  }
}
