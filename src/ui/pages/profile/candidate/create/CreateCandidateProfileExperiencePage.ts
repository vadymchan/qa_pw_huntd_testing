import { Locator, Page } from '@playwright/test';
import { BasePage } from '@ui/pages/BasePage';
import { CandidateProfileExperienceComponent } from '@ui/components/profile/candidate/CandidateProfileExperienceComponent';
import { PATHS } from '@ui/constants/paths';

export class CreateCandidateProfileExperiencePage extends BasePage {
  public profileExperience: CandidateProfileExperienceComponent;
  private addManually: Locator;
  private saveAndContinue: Locator;
  private addManuallyName: string;
  private saveAndContinueName: string;

  constructor(page: Page) {
    super(page, PATHS.profile.candidate.experience);

    this.profileExperience = new CandidateProfileExperienceComponent(page);

    this.addManuallyName = 'Add manually';
    this.saveAndContinueName = 'Save and continue';

    this.addManually = page.getByRole('button', { name: this.addManuallyName });
    this.saveAndContinue = page.getByRole('button', { name: this.saveAndContinueName });
  }

  async clickAddManually() {
    await this.step(`Click '${this.addManuallyName}'`, async () => {
      await this.addManually.click();
    });
  }

  async clickSaveAndContinue() {
    await this.step(`Click '${this.saveAndContinueName}'`, async () => {
      await this.saveAndContinue.click();
    });
  }
}
