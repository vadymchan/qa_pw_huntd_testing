import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '../../BaseComponent';

export class RecruiterProfileComponent extends BaseComponent {
  private role: Locator;
  private company: Locator;

  constructor(page: Page) {
    super(page);

    this.role = page.getByLabel('My role');
    this.company = page.getByLabel('Company');
  }

  async fillRole(role: string) {
    await this.role.fill(role);
  }

  async fillCompany(company: string) {
    await this.company.fill(company);
  }
}
