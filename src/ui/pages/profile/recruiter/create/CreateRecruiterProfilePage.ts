import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../../BasePage';
import { RecruiterProfileComponent } from '../../../../components/profile/recruiter/RecruiterProfileComponent';
import { PATHS } from '../../../../constants/paths';

export class CreateRecruiterProfilePage extends BasePage {
  public recruiterProfile: RecruiterProfileComponent;
  private saveAndContinue: Locator;

  constructor(page: Page) {
    super(page, PATHS.profile.recruiter.base);

    this.recruiterProfile = new RecruiterProfileComponent(page);
    this.saveAndContinue = page.getByRole('button', { name: 'Save and continue' });
  }

  async clickSaveAndContinue() {
    await this.saveAndContinue.click();
  }
}
