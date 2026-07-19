import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class RecruiterProfilePreviewPage extends BasePage {
  private fullName: Locator;
  private role: Locator;
  private company: Locator;
  private email: Locator;

  constructor(page: Page) {
    super(page, '/profile-preview/recruiter');

    this.fullName = page.getByRole('heading', { level: 1 });
    const tagLine = page.locator('[class*=ProfileMeta_recruiterMetaItem]');
    this.role = tagLine.first();
    this.company = tagLine.last();
    this.email = page.locator('a[href^="mailto:"]');
  }

  async assertFullNameHasText(firstName: string, lastName: string) {
    await expect(this.fullName).toHaveText(`${firstName} ${lastName}`);
  }

  async assertRoleHasText(role: string) {
    await expect(this.role).toHaveText(role);
  }

  async assertCompanyHasText(company: string) {
    await expect(this.company).toHaveText(company);
  }

  async assertEmailHasText(email: string) {
    await expect(this.email).toHaveText(email);
  }
}
