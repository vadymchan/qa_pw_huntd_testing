import { expect, Locator, Page } from '@playwright/test';
import { BaseComponent } from '../../BaseComponent';
import { Role } from '../../../../models/auth/candidate/Role';
import { CoreTechnicalSkill } from '../../../../models/auth/candidate/CoreTechnicalSkill';
import { selectOption } from '../../../../utils/playwright/selectOption';

export class CandidateProfileComponent extends BaseComponent {
  private desiredPosition: Locator;
  private desiredRoles: Locator;
  private coreTechnicalSkills: Locator;

  constructor(page: Page) {
    super(page);

    this.desiredPosition = page.getByLabel('Desired position');
    this.desiredRoles = page.getByLabel('Desired roles');
    this.coreTechnicalSkills = page.getByLabel('Core technical skills');
  }

  async fillDesiredPosition(desiredPosition: string) {
    await this.desiredPosition.fill(desiredPosition);
  }

  async selectDesiredRoles(desiredRoles: Array<Role>) {
    for (const role of desiredRoles) {
      await selectOption(this.page, this.desiredRoles, role);
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
}
