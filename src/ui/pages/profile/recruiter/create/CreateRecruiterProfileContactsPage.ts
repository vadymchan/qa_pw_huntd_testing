import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../../BasePage';
import { RecruiterProfileContactsComponent } from '../../../../components/profile/recruiter/RecruiterProfileContactsComponent';

export class CreateRecruiterProfileContactsPage extends BasePage {
  public component: RecruiterProfileContactsComponent;
  private saveAndContinue: Locator;

  constructor(page: Page) {
    super(page, '/profile/contacts?preview=recruiter');

    this.component = new RecruiterProfileContactsComponent(page);
    this.saveAndContinue = page.getByRole('button', { name: 'Save and continue' });
  }

  async clickSaveAndContinue() {
    await this.saveAndContinue.click();
  }
}
