import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '@ui/components/BaseComponent';

export class RecruiterProfileComponent extends BaseComponent {
  private role: Locator;
  private company: Locator;
  private roleLabel: string;
  private companyLabel: string;

  constructor(page: Page) {
    super(page);

    this.roleLabel = 'My role';
    this.companyLabel = 'Company';

    this.role = page.getByLabel(this.roleLabel);
    this.company = page.getByLabel(this.companyLabel);
  }

  async fillRole(role: string) {
    await this.step(`Fill '${this.roleLabel}'`, async () => {
      await this.role.fill(role);
    });
  }

  async fillCompany(company: string) {
    await this.step(`Fill '${this.companyLabel}'`, async () => {
      await this.company.fill(company);
    });
  }
}
