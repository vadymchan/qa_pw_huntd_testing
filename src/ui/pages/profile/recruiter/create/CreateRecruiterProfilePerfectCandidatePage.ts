import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../../../BasePage';
import { selectOption } from '../../../../../utils/playwright/selectOption';

export class CreateRecruiterProfilePerfectCandidatePage extends BasePage {
  private roles: Locator;
  private technologies: Locator;
  private jobExperience: Locator;
  private englishLevel: Locator;
  private next: Locator;
  private templateMessage: Locator;
  private send: Locator;

  constructor(page: Page) {
    super(page, '/profile/perfect-candidate');

    this.roles = page.getByLabel('Role');
    this.technologies = page.getByLabel('Technologies');
    this.jobExperience = page.getByLabel('Job experience');
    this.englishLevel = page.getByLabel('English level');
    this.next = page.getByRole('button', { name: 'Next' });
    this.templateMessage = page.locator('#messageBody');
    this.send = page.getByRole('button', { name: 'Send' });
  }

  async selectRoles(roles: Array<string>) {
    for (const role of roles) {
      await selectOption(this.page, this.roles, role);
    }
  }

  async selectTechnologies(technologies: Array<string>) {
    for (const technology of technologies) {
      await this.technologies.fill(technology);
      await this.page
        .locator('.select__option')
        .filter({ hasText: new RegExp(`^${technology}$`) })
        .click();
    }
    await this.technologies.blur();
  }

  async selectJobExperience(jobExperience: string) {
    await selectOption(this.page, this.jobExperience, jobExperience);
  }

  async selectEnglishLevel(englishLevel: string) {
    await selectOption(this.page, this.englishLevel, englishLevel);
  }

  async fillTemplateMessage(templateMessage: string) {
    await this.templateMessage.fill(templateMessage);
  }

  async clickNext() {
    await this.next.click();
  }

  async clickSend() {
    await this.send.click();
    // TODO: consider move to separate place (might be violation of SRP)
    // Sending messages to candidates (bulkSendMessage) takes some time, especially under heavy load
    await expect(this.page).toHaveURL('/chats', { timeout: 20_000 });
  }
}
