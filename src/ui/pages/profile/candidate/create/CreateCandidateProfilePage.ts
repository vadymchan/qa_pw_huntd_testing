import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../../BasePage';
import { CandidateProfileComponent } from '../../../../components/profile/candidate/CandidateProfileComponent';
import { PATHS } from '../../../../constants/paths';

export class CreateCandidateProfilePage extends BasePage {
  public candidateProfile: CandidateProfileComponent;
  private saveAndContinue: Locator;

  constructor(page: Page) {
    super(page, PATHS.profile.candidate.base);

    this.candidateProfile = new CandidateProfileComponent(page);
    this.saveAndContinue = page.getByRole('button', { name: 'Save and continue' });
  }

  async clickSaveAndContinue() {
    await this.saveAndContinue.click();
  }
}
