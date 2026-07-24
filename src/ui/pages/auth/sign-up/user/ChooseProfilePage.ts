import { Locator, Page } from '@playwright/test';
import { BasePage } from '@ui/pages/BasePage';
import { PATHS } from '@ui/constants/paths';

export class ChooseProfilePage extends BasePage {
  private candidate: Locator;
  private recruiter: Locator;
  private candidateName: string;
  private recruiterName: string;

  constructor(page: Page) {
    super(page, PATHS.chooseProfile);

    this.candidateName = 'Candidate hunting for interesting job offers';
    this.recruiterName = 'Recruiter hiring talent';

    this.candidate = page.getByRole('link', {
      name: this.candidateName,
    });
    this.recruiter = page.getByRole('link', { name: this.recruiterName });
  }

  async clickCandidate() {
    await this.step(`Click '${this.candidateName}'`, async () => {
      await this.candidate.click();
    });
  }

  async clickRecruiter() {
    await this.step(`Click '${this.recruiterName}'`, async () => {
      await this.recruiter.click();
    });
  }
}
