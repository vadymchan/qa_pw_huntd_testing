import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class RecruiterProfilePage extends BasePage {
  private role: Locator;
  private company: Locator;
  private saveAndContinue: Locator;

  constructor(page: Page) {
    super(page, '/profile/recruiter');

    this.role = page.getByLabel('My role');
    this.company = page.getByLabel('Company');
    this.saveAndContinue = page.getByRole('button', { name: 'Save and continue' });
  }

  async fillRole(role: string) {
    await this.role.fill(role);
  }

  async fillCompany(company: string) {
    await this.company.fill(company);
  }

  async clickSaveAndContinue() {
    await this.saveAndContinue.click();
  }
}
