import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class RecruiterProfileContactsPage extends BasePage {
  private firstName: Locator;
  private lastName: Locator;
  private linkedin: Locator;
  private saveAndContinue: Locator;

  constructor(page: Page) {
    super(page, '/profile/contacts?preview=recruiter');

    this.firstName = page.getByLabel('First name');
    this.lastName = page.getByLabel('Last name');
    this.linkedin = page.getByLabel('Linkedin (optional)');
    this.saveAndContinue = page.getByRole('button', { name: 'Save and continue' });
  }

  async fillFirstName(firstName: string) {
    await this.firstName.fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.lastName.fill(lastName);
  }

  async fillLinkedin(linkedin: string) {
    await this.linkedin.fill(linkedin);
  }

  async clickSaveAndContinue() {
    await this.saveAndContinue.click();
  }
}
