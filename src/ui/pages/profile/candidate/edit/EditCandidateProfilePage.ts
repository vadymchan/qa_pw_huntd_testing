import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../../../BasePage';
import { graphqlWaitForResponse } from '../../../../../utils/playwright/graphqlWaitForResponse';
import { CandidateProfileComponent } from '../../../../components/profile/candidate/CandidateProfileComponent';
import { PATHS } from '../../../../constants/paths';

export class EditCandidateProfilePage extends BasePage {
  public candidateProfile: CandidateProfileComponent;
  private saveChanges: Locator;
  private clearDesiredRoles: Locator;
  private clearCoreTechnicalSkills: Locator;
  private desiredPositionValidationMessage: Locator;
  private coreTechnicalSkillsValidationMessage: Locator;
  private saveChangesName: string;
  private clearDesiredRolesName: string;
  private clearCoreTechnicalSkillsName: string;

  constructor(page: Page) {
    super(page, PATHS.profile.candidate.base);

    this.candidateProfile = new CandidateProfileComponent(page);

    this.saveChangesName = 'Save changes';
    this.clearDesiredRolesName = 'Desired roles';
    this.clearCoreTechnicalSkillsName = 'Core technical skills';

    this.saveChanges = page.getByRole('button', { name: this.saveChangesName });
    const clearButton = (buttonName: string) =>
      this.page
        .locator('.select__control')
        .filter({ has: page.getByLabel(buttonName) })
        .locator('.select__clear-indicator');
    this.clearDesiredRoles = clearButton(this.clearDesiredRolesName);
    this.clearCoreTechnicalSkills = clearButton(this.clearCoreTechnicalSkillsName);

    const validationMessage = page.locator('[class*=FormField_metaBlock]');
    this.desiredPositionValidationMessage = validationMessage.first();
    this.coreTechnicalSkillsValidationMessage = validationMessage.last();
  }

  async clickSaveChanges(waitForResponse: boolean) {
    await this.step(`Click '${this.saveChangesName}'`, async () => {
      const click = () => this.saveChanges.click();
      await (waitForResponse
        ? graphqlWaitForResponse(this.page, 'updateCandidateProfile', click)
        : click());
    });
  }

  async clickClearDesiredRoles() {
    await this.step(`Click '${this.clearDesiredRolesName}'`, async () => {
      await this.clearDesiredRoles.click();
    });
  }

  async clickClearCoreTechnicalSkills() {
    await this.step(`Click '${this.clearCoreTechnicalSkillsName}'`, async () => {
      await this.clearCoreTechnicalSkills.click();
    });
  }

  async assertDesiredPositionValidationMessage(desiredPositionValidationMessage: string) {
    await this.step(
      `Assert 'Desired position' shows '${desiredPositionValidationMessage}' validation message`,
      async () => {
        await expect(this.desiredPositionValidationMessage).toHaveText(
          desiredPositionValidationMessage,
        );
      },
    );
  }

  async assertCoreTechnicalSkillsValidationMessage(coreTechnicalSkillsValidationMessage: string) {
    await this.step(
      `Assert 'Core technical skills' shows '${coreTechnicalSkillsValidationMessage}' validation message`,
      async () => {
        await expect(this.coreTechnicalSkillsValidationMessage).toHaveText(
          coreTechnicalSkillsValidationMessage,
        );
      },
    );
  }
}
