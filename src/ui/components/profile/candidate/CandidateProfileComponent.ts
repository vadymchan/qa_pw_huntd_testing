import { expect, Locator, Page } from '@playwright/test';
import { BaseComponent } from '../../BaseComponent';
import { Role } from '../../../../common/models/auth/candidate/Role';
import { CoreTechnicalSkill } from '../../../../common/models/auth/candidate/CoreTechnicalSkill';
import { selectOption } from '../../../../utils/playwright/selectOption';

export class CandidateProfileComponent extends BaseComponent {
  private desiredPosition: Locator;
  private desiredRoles: Locator;
  private coreTechnicalSkills: Locator;
  private desiredPositionLabel: string;
  private desiredRolesLabel: string;
  private coreTechnicalSkillsLabel: string;

  constructor(page: Page) {
    super(page);

    this.desiredPositionLabel = 'Desired position';
    this.desiredRolesLabel = 'Desired roles';
    this.coreTechnicalSkillsLabel = 'Core technical skills';

    this.desiredPosition = page.getByLabel(this.desiredPositionLabel);
    this.desiredRoles = page.getByLabel(this.desiredRolesLabel);
    this.coreTechnicalSkills = page.getByLabel(this.coreTechnicalSkillsLabel);
  }

  async fillDesiredPosition(desiredPosition: string) {
    await this.step(`Fill '${this.desiredPositionLabel}'`, async () => {
      await this.desiredPosition.fill(desiredPosition);
    });
  }

  async selectDesiredRoles(desiredRoles: Array<Role>) {
    await this.step(`Select '${this.desiredRolesLabel}'`, async () => {
      for (const role of desiredRoles) {
        await selectOption(this.page, this.desiredRoles, role);
      }
    });
  }

  async selectCoreTechnicalSkills(coreTechnicalSkills: Array<CoreTechnicalSkill>) {
    await this.step(`Select '${this.coreTechnicalSkillsLabel}'`, async () => {
      for (const skill of coreTechnicalSkills) {
        await this.coreTechnicalSkills.fill(skill);
        await expect(
          this.page.locator('.select__option').filter({ hasText: new RegExp(`^${skill}$`) }),
        ).toBeVisible();
        // Use workaround because of BUG-001
        await this.page.keyboard.press('Enter');
      }
    });
  }
}
