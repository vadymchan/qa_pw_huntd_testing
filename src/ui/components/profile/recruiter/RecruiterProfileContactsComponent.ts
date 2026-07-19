import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '../../BaseComponent';

export class RecruiterProfileContactsComponent extends BaseComponent {
  private firstName: Locator;
  private lastName: Locator;
  private linkedin: Locator;

  constructor(page: Page) {
    super(page);

    this.firstName = page.getByLabel('First name');
    this.lastName = page.getByLabel('Last name');
    this.linkedin = page.getByLabel('Linkedin (optional)');
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
}
