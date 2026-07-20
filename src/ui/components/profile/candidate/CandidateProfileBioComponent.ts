import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '../../BaseComponent';

export class CandidateProfileBioComponent extends BaseComponent {
  private achievements: Locator;
  private expectations: Locator;
  private achievementsLabel: string;
  private expectationsLabel: string;

  constructor(page: Page) {
    super(page);

    this.achievementsLabel = 'Achievements / Key results';
    this.expectationsLabel = 'Expectations from work (optional)';

    this.achievements = page.getByLabel(this.achievementsLabel);
    this.expectations = page.getByLabel(this.expectationsLabel);
  }

  async fillAchievements(achievements: string) {
    await this.step(`Fill '${this.achievementsLabel}'`, async () => {
      await this.achievements.fill(achievements);
    });
  }

  async fillWorkExpectations(expectations: string) {
    await this.step(`Fill '${this.expectationsLabel}'`, async () => {
      await this.expectations.fill(expectations);
    });
  }
}
