import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../../BasePage';
import { Role } from '../../../models/auth/candidate/Role';
import { CoreTechnicalSkill } from '../../../models/auth/candidate/CoreTechnicalSkill';

export class CandidateProfilePage extends BasePage {
  private desiredPosition: Locator;
  private desiredRoles: Locator;
  private coreTechnicalSkills: Locator;
  private saveAndContinue: Locator;
  private profile: Locator;
  private logout: Locator;

  constructor(page: Page) {
    super(page, '/profile/candidate');

    this.desiredPosition = page.getByLabel('Desired position');
    this.desiredRoles = page.getByLabel('Desired roles');
    this.coreTechnicalSkills = page.getByLabel('Core technical skills');
    this.saveAndContinue = page.getByRole('button', { name: 'Save and continue' });
    this.profile = page.getByRole('button', { name: 'Profile' });
    this.logout = page.getByRole('button', { name: 'Sign out' });
  }

  async fillDesiredPosition(desiredPosition: string) {
    await this.desiredPosition.fill(desiredPosition);
  }

  async selectDesiredRoles(desiredRoles: Array<Role>) {
    for (const role of desiredRoles) {
      await this.desiredRoles.focus();
      await this.page.keyboard.press('ArrowDown');
      await this.page.locator('.select__option').getByText(role, { exact: true }).click();
    }
  }

  async selectCoreTechnicalSkills(coreTechnicalSkills: Array<CoreTechnicalSkill>) {
    for (const skill of coreTechnicalSkills) {
      await this.coreTechnicalSkills.fill(skill);
      await expect(
        this.page.locator('.select__option').filter({ hasText: new RegExp(`^${skill}$`) }),
      ).toBeVisible();
      // Use workaround because of BUG-001
      await this.page.keyboard.press('Enter');
    }
  }

  async clickSaveAndContinue() {
    await this.saveAndContinue.click();
  }

  async clickProfile() {
    await this.profile.click();
  }

  async clickLogout() {
    await this.logout.click();
  }
}
