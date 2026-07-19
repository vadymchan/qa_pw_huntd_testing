import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../../BasePage';
import { CandidateProfileComponent } from '../../../../components/profile/candidate/CandidateProfileComponent';

export class CreateCandidateProfilePage extends BasePage {
  public candidateProfile: CandidateProfileComponent;
  private saveAndContinue: Locator;

  constructor(page: Page) {
    super(page, '/profile/candidate');

    this.candidateProfile = new CandidateProfileComponent(page);
    this.saveAndContinue = page.getByRole('button', { name: 'Save and continue' });
  }

  async clickSaveAndContinue() {
    await this.saveAndContinue.click();
  }
}
