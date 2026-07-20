import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../../BasePage';
import { RecruiterProfileContactsComponent } from '../../../../components/profile/recruiter/RecruiterProfileContactsComponent';
import { PATHS } from '../../../../constants/paths';

export class CreateRecruiterProfileContactsPage extends BasePage {
  public component: RecruiterProfileContactsComponent;
  private saveAndContinue: Locator;

  constructor(page: Page) {
    super(page, PATHS.profile.recruiter.contacts);

    this.component = new RecruiterProfileContactsComponent(page);
    this.saveAndContinue = page.getByRole('button', { name: 'Save and continue' });
  }

  async clickSaveAndContinue() {
    await this.saveAndContinue.click();
  }
}
