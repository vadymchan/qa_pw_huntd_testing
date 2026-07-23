import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../../BasePage';
import { CandidateProfileBioComponent } from '../../../../components/profile/candidate/CandidateProfileBioComponent';
import { PATHS } from '../../../../constants/paths';

export class CreateCandidateProfileBioPage extends BasePage {
  public profileBio: CandidateProfileBioComponent;
  private saveAndContinue: Locator;
  private saveAndContinueName: string;

  constructor(page: Page) {
    super(page, PATHS.profile.candidate.bio);

    this.profileBio = new CandidateProfileBioComponent(page);

    this.saveAndContinueName = 'Save and continue';

    this.saveAndContinue = page.getByRole('button', { name: this.saveAndContinueName });
  }

  async clickSaveAndContinue() {
    await this.step(`Click '${this.saveAndContinueName}'`, async () => {
      await this.saveAndContinue.click();
    });
  }
}
