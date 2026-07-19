import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '../../BaseComponent';

export class CandidateProfileContactsComponent extends BaseComponent {
  private usualProfile: Locator;
  private firstName: Locator;
  private lastName: Locator;
  private linkedin: Locator;
  private behance: Locator;
  private gitHub: Locator;

  constructor(page: Page) {
    super(page);

    this.usualProfile = page.getByRole('button', { name: 'Usual avatar' });
    this.firstName = page.getByLabel('First name');
    this.lastName = page.getByLabel('Last name');
    this.linkedin = page.getByLabel('Linkedin (optional)');
    this.behance = page.getByLabel('Behance (optional)');
    this.gitHub = page.getByLabel('GitHub (optional)');
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

  async fillBehance(behance: string) {
    await this.behance.fill(behance);
  }

  async fillGitHub(gitHub: string) {
    await this.gitHub.fill(gitHub);
  }

  async clickUsualProfile() {
    await this.usualProfile.click();
  }
}
