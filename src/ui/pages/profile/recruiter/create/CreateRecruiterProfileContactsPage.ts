import { Locator, Page } from '@playwright/test';
import { BasePage } from '@ui/pages/BasePage';
import { RecruiterProfileContactsComponent } from '@ui/components/profile/recruiter/RecruiterProfileContactsComponent';
import { PATHS } from '@ui/constants/paths';

export class CreateRecruiterProfileContactsPage extends BasePage {
  public profileContacts: RecruiterProfileContactsComponent;
  private saveAndContinue: Locator;
  private saveAndContinueName: string;

  constructor(page: Page) {
    super(page, PATHS.profile.recruiter.contacts);

    this.profileContacts = new RecruiterProfileContactsComponent(page);

    this.saveAndContinueName = 'Save and continue';

    this.saveAndContinue = page.getByRole('button', { name: this.saveAndContinueName });
  }

  async clickSaveAndContinue() {
    await this.step(`Click '${this.saveAndContinueName}'`, async () => {
      await this.saveAndContinue.click();
    });
  }
}
