import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '@ui/components/BaseComponent';

export class CandidateProfileContactsComponent extends BaseComponent {
  private usualProfile: Locator;
  private firstName: Locator;
  private lastName: Locator;
  private linkedin: Locator;
  private behance: Locator;
  private gitHub: Locator;
  private usualProfileName: string;
  private firstNameLabel: string;
  private lastNameLabel: string;
  private linkedinLabel: string;
  private behanceLabel: string;
  private gitHubLabel: string;

  constructor(page: Page) {
    super(page);

    this.usualProfileName = 'Usual avatar';
    this.firstNameLabel = 'First name';
    this.lastNameLabel = 'Last name';
    this.linkedinLabel = 'Linkedin (optional)';
    this.behanceLabel = 'Behance (optional)';
    this.gitHubLabel = 'GitHub (optional)';

    this.usualProfile = page.getByRole('button', { name: this.usualProfileName });
    this.firstName = page.getByLabel(this.firstNameLabel);
    this.lastName = page.getByLabel(this.lastNameLabel);
    this.linkedin = page.getByLabel(this.linkedinLabel);
    this.behance = page.getByLabel(this.behanceLabel);
    this.gitHub = page.getByLabel(this.gitHubLabel);
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

  async fillBehance(behance: string) {
    await this.step(`Fill '${this.behanceLabel}'`, async () => {
      await this.behance.fill(behance);
    });
  }

  async fillGitHub(gitHub: string) {
    await this.step(`Fill '${this.gitHubLabel}'`, async () => {
      await this.gitHub.fill(gitHub);
    });
  }

  async clickUsualProfile() {
    await this.step(`Click '${this.usualProfileName}'`, async () => {
      await this.usualProfile.click();
    });
  }
}
