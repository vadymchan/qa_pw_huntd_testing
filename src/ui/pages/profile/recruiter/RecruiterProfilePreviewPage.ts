import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@ui/pages/BasePage';
import { PATHS } from '@ui/constants/paths';

export class RecruiterProfilePreviewPage extends BasePage {
  private fullName: Locator;
  private role: Locator;
  private company: Locator;
  private email: Locator;

  constructor(page: Page) {
    super(page, PATHS.profile.recruiter.preview);

    this.fullName = page.getByRole('heading', { level: 1 });
    const tagLine = page.locator('[class*=ProfileMeta_recruiterMetaItem]');
    this.role = tagLine.first();
    this.company = tagLine.last();
    this.email = page.locator('a[href^="mailto:"]');
  }

  async assertFullNameHasText(firstName: string, lastName: string) {
    const fullName = `${firstName} ${lastName}`;
    await this.step(`Assert 'Full name' has '${fullName}' text`, async () => {
      await expect(this.fullName).toHaveText(fullName);
    });
  }

  async assertRoleHasText(role: string) {
    await this.step(`Assert 'Role' has '${role}' text`, async () => {
      await expect(this.role).toHaveText(role);
    });
  }

  async assertCompanyHasText(company: string) {
    await this.step(`Assert 'Company' has '${company}' text`, async () => {
      await expect(this.company).toHaveText(company);
    });
  }

  async assertEmailHasText(email: string) {
    await this.step(`Assert 'Email' has '${email}' text`, async () => {
      await expect(this.email).toHaveText(email);
    });
  }
}
