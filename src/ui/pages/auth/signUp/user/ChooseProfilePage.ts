import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../../BasePage';

export class ChooseProfilePage extends BasePage {
  private candidate: Locator;
  private recruiter: Locator;

  constructor(page: Page) {
    super(page, '/choose-profile');

    this.candidate = page.getByRole('link', {
      name: 'Candidate hunting for interesting job offers',
    });
    this.recruiter = page.getByRole('link', { name: 'Recruiter hiring talent' });
  }

  async clickCandidate() {
    await this.candidate.click();
  }

  async clickRecruiter() {
    await this.recruiter.click();
  }
}
