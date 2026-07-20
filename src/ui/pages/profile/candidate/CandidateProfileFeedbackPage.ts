import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../../BasePage';
import { PATHS } from '../../../constants/paths';

export class CandidateProfileFeedbackPage extends BasePage {
  private header: Locator;

  constructor(page: Page) {
    super(page, PATHS.profile.candidate.feedback);

    this.header = page.getByRole('heading', { level: 1 });
  }

  async assertHeaderHasText(header: string) {
    await expect(this.header).toHaveText(header);
  }
}
