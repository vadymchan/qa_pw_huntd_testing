import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../../BasePage';
import { RecruiterProfileComponent } from '../../../../components/profile/recruiter/RecruiterProfileComponent';
import { PATHS } from '../../../../constants/paths';

export class CreateRecruiterProfilePage extends BasePage {
  public recruiterProfile: RecruiterProfileComponent;
  private saveAndContinue: Locator;
  private saveAndContinueName: string;

  constructor(page: Page) {
    super(page, PATHS.profile.recruiter.base);

    this.recruiterProfile = new RecruiterProfileComponent(page);
    this.saveAndContinueName = 'Save and continue';
    this.saveAndContinue = page.getByRole('button', { name: this.saveAndContinueName });
  }

  async clickSaveAndContinue() {
    await this.step(`Click '${this.saveAndContinueName}'`, async () => {
      await this.saveAndContinue.click();
    });
  }
}
