import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../../BasePage';
import { CandidateProfileBioComponent } from '../../../../components/profile/candidate/CandidateProfileBioComponent';
import { PATHS } from '../../../../constants/paths';

export class CreateCandidateProfileBioPage extends BasePage {
  public profileBio: CandidateProfileBioComponent;
  private saveAndContinue: Locator;

  constructor(page: Page) {
    super(page, PATHS.profile.candidate.bio);

    this.profileBio = new CandidateProfileBioComponent(page);
    this.saveAndContinue = page.getByRole('button', { name: 'Save and continue' });
  }

  async clickSaveAndContinue() {
    await this.saveAndContinue.click();
  }
}
