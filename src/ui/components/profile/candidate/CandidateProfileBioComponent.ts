import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '../../BaseComponent';

export class CandidateProfileBioComponent extends BaseComponent {
  private achivements: Locator;
  private expectations: Locator;

  constructor(page: Page) {
    super(page);

    this.achivements = page.getByLabel('Achievements / Key results');
    this.expectations = page.getByLabel('Expectations from work (optional)');
  }

  async fillAchivements(achivements: string) {
    await this.achivements.fill(achivements);
  }

  async fillWorkExpectations(expectations: string) {
    await this.expectations.fill(expectations);
  }
}
