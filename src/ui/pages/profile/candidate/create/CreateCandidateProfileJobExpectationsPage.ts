import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../../BasePage';
import { CandidateProfileJobExpectationsComponent } from '../../../../components/profile/candidate/CandidateProfileJobExpectationsComponent';
import { PATHS } from '../../../../constants/paths';

export class CreateCandidateProfileJobExpectationsPage extends BasePage {
  public profileJobExpectations: CandidateProfileJobExpectationsComponent;
  private saveAndContinue: Locator;
  private saveAndContinueName: string;

  constructor(page: Page) {
    super(page, PATHS.profile.candidate.jobExpectations);

    this.profileJobExpectations = new CandidateProfileJobExpectationsComponent(page);

    this.saveAndContinueName = 'Save and continue';
    
    this.saveAndContinue = page.getByRole('button', { name: this.saveAndContinueName });
  }

  async clickSaveAndContinue() {
    await this.step(`Click '${this.saveAndContinueName}'`, async () => {
      await this.saveAndContinue.click();
    });
  }
}
