import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../../BasePage';
import { CandidateProfileJobExpectationsComponent } from '../../../../components/profile/candidate/CandidateProfileJobExpectationsComponent';

export class CreateCandidateProfileJobExpectationsPage extends BasePage {
  public profileJobExpectations: CandidateProfileJobExpectationsComponent;
  private saveAndContinue: Locator;

  constructor(page: Page) {
    super(page, '/profile/candidate/job-expectations');

    this.profileJobExpectations = new CandidateProfileJobExpectationsComponent(page);
    this.saveAndContinue = page.getByRole('button', { name: 'Save and continue' });
  }

  async clickSaveAndContinue() {
    await this.saveAndContinue.click();
  }
}
