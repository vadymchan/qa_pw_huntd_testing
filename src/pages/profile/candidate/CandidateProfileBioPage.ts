import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class CandidateProfileBioPage extends BasePage {
  private achivements: Locator;
  private expectations: Locator;
  private saveAndContinue: Locator;

  constructor(page: Page) {
    super(page, '/profile/candidate/bio');

    this.achivements = page.getByLabel('Achievements / Key results');
    this.expectations = page.getByLabel('Expectations from work (optional)');
    this.saveAndContinue = page.getByRole('button', { name: 'Save and continue' });
  }

  async fillAchivements(achivements: string) {
    await this.achivements.fill(achivements);
  }

  async fillWorkExpectations(expectations: string) {
    await this.expectations.fill(expectations);
  }

  async clickSaveAndContinue() {
    await this.saveAndContinue.click();
  }
}
