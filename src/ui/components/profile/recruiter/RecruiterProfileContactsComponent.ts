import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '@ui/components/BaseComponent';

export class RecruiterProfileContactsComponent extends BaseComponent {
  private firstName: Locator;
  private lastName: Locator;
  private linkedin: Locator;
  private firstNameLabel: string;
  private lastNameLabel: string;
  private linkedinLabel: string;

  constructor(page: Page) {
    super(page);

    this.firstNameLabel = 'First name';
    this.lastNameLabel = 'Last name';
    this.linkedinLabel = 'Linkedin (optional)';

    this.firstName = page.getByLabel(this.firstNameLabel);
    this.lastName = page.getByLabel(this.lastNameLabel);
    this.linkedin = page.getByLabel(this.linkedinLabel);
  }

  async fillFirstName(firstName: string) {
    await this.step(`Fill '${this.firstNameLabel}'`, async () => {
      await this.firstName.fill(firstName);
    });
  }

  async fillLastName(lastName: string) {
    await this.step(`Fill '${this.lastNameLabel}'`, async () => {
      await this.lastName.fill(lastName);
    });
  }

  async fillLinkedin(linkedin: string) {
    await this.step(`Fill '${this.linkedinLabel}'`, async () => {
      await this.linkedin.fill(linkedin);
    });
  }
}
