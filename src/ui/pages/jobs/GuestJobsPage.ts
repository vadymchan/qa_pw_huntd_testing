import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@ui/pages/BasePage';
import { PATHS } from '@ui/constants/paths';
import { JobCategory } from '@models/jobs/JobCategory';
import { NewsletterSubscriptionComponent } from '@ui/components/jobs/NewsletterSubscriptionComponent';

export class GuestJobsPage extends BasePage {
  public newsletterSubscription: NewsletterSubscriptionComponent;
  private apply: Locator;
  private viewMore: Locator;
  private jobs: Locator;
  private modalWindow: Locator;
  private applyName: string;
  private jobDetailsButton: Locator;
  private jobDetailsText: Locator;
  private jobDetailsName: string;
  private viewMoreName: string;

  constructor(page: Page) {
    super(page, PATHS.jobs.base);

    this.newsletterSubscription = new NewsletterSubscriptionComponent(page);

    this.applyName = '1-click apply';
    this.jobDetailsName = 'Job details';
    this.viewMoreName = 'View more';

    this.apply = page.locator('button', { hasText: this.applyName }).first();
    this.jobDetailsButton = page.locator('[class*=VacancyCard_detailsButton]').first();
    this.jobDetailsText = page.locator('article[class*="VacancyCard_detailedInfo"]').first();
    this.jobs = page.getByRole('list').filter({ has: page.locator('[class*=VacancyCard]') });
    this.viewMore = page.getByRole('button', { name: this.viewMoreName });
    this.modalWindow = page.locator('[class*=VacanciesModal_modalWrapper]').getByRole('paragraph');
  }

  private category(jobCategory: JobCategory): Locator {
    return this.page.locator(
      `a[class*=VacanciesNav_link][href="${PATHS.jobs.category(jobCategory)}"]`,
    );
  }

  async clickApply() {
    await this.step(`Click '${this.applyName}'`, async () => {
      await this.apply.click();
    });
  }

  async clickCategory(jobCategory: JobCategory) {
    await this.step(`Click '${jobCategory}' category`, async () => {
      await this.category(jobCategory).click();
    });
  }

  async clickJobDetails() {
    await this.step(`Click '${this.jobDetailsName}'`, async () => {
      await this.jobDetailsButton.click();
    });
  }

  async clickViewMore() {
    await this.step(`Click '${this.viewMoreName}'`, async () => {
      await this.viewMore.click();
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
}
