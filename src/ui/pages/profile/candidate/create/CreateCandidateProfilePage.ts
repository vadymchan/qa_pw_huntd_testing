import { Locator, Page } from '@playwright/test';
import { BasePage } from '@ui/pages/BasePage';
import { CandidateProfileComponent } from '@ui/components/profile/candidate/CandidateProfileComponent';
import { PATHS } from '@ui/constants/paths';

export class CreateCandidateProfilePage extends BasePage {
  public candidateProfile: CandidateProfileComponent;
  private saveAndContinue: Locator;
  private saveAndContinueName: string;

  constructor(page: Page) {
    super(page, PATHS.profile.candidate.base);

    this.candidateProfile = new CandidateProfileComponent(page);

    this.saveAndContinueName = 'Save and continue';

    this.saveAndContinue = page.getByRole('button', { name: this.saveAndContinueName });
  }

  async clickSaveAndContinue() {
    await this.step(`Click '${this.saveAndContinueName}'`, async () => {
      await this.saveAndContinue.click();
    });
  }
}
