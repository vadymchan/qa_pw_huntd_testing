import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../../BasePage';
import { CandidateProfileExperienceComponent } from '../../../../components/profile/candidate/CandidateProfileExperienceComponent';
import { PATHS } from '../../../../constants/paths';

export class CreateCandidateProfileExperiencePage extends BasePage {
  public profileExperience: CandidateProfileExperienceComponent;
  private addManually: Locator;

  private saveAndContinue: Locator;

  constructor(page: Page) {
    super(page, PATHS.profile.candidate.experience);

    this.profileExperience = new CandidateProfileExperienceComponent(page);
    this.addManually = page.getByRole('button', { name: 'Add manually' });
    this.saveAndContinue = page.getByRole('button', { name: 'Save and continue' });
  }

  async clickAddManually() {
    await this.addManually.click();
  }

  async clickSaveAndContinue() {
    await this.saveAndContinue.click();
  }
}
