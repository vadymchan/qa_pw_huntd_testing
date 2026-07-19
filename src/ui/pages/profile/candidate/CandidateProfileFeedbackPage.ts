import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class CandidateProfileFeedbackPage extends BasePage {
  private header: Locator;

  constructor(page: Page) {
    super(page, '/profile/feedback?preview=candidate');

    this.header = page.getByRole('heading', { level: 1 });
  }

  async assertHeaderHasText(header: string) {
    await expect(this.header).toHaveText(header);
  }
}
