import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../../BasePage';
import { RecruiterProfileComponent } from '../../../../components/profile/recruiter/RecruiterProfileComponent';

export class CreateRecruiterProfilePage extends BasePage {
  public recruiterProfile: RecruiterProfileComponent;
  private saveAndContinue: Locator;

  constructor(page: Page) {
    super(page, '/profile/recruiter');

    this.recruiterProfile = new RecruiterProfileComponent(page);
    this.saveAndContinue = page.getByRole('button', { name: 'Save and continue' });
  }

  async clickSaveAndContinue() {
    await this.saveAndContinue.click();
  }
}
