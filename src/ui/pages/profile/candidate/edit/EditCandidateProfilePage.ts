import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../../../BasePage';
import { graphqlWaitForResponse } from '../../../../../utils/playwright/graphqlWaitForResponse';
import { CandidateProfileComponent } from '../../../../components/profile/candidate/CandidateProfileComponent';

export class EditCandidateProfilePage extends BasePage {
  public candidateProfile: CandidateProfileComponent;
  private saveChanges: Locator;
  private clearDesiredRoles: Locator;
  private clearCoreTechnicalSkills: Locator;
  private desiredPositionValidationMessage: Locator;
  private coreTechnicalSkillsValidationMessage: Locator;

  constructor(page: Page) {
    super(page, '/profile/candidate');

    this.candidateProfile = new CandidateProfileComponent(page);
    this.saveChanges = page.getByRole('button', { name: 'Save changes' });
    const clearButton = (buttonName: string) =>
      this.page
        .locator('.select__control')
        .filter({ has: page.getByLabel(buttonName) })
        .locator('.select__clear-indicator');
    this.clearDesiredRoles = clearButton('Desired roles');
    this.clearCoreTechnicalSkills = clearButton('Core technical skills');
    const validationMessage = page.locator('[class*=FormField_metaBlock]');
    this.desiredPositionValidationMessage = validationMessage.first();
    this.coreTechnicalSkillsValidationMessage = validationMessage.last();
  }

  async clickSaveChanges(waitForResponse: boolean) {
    const click = () => this.saveChanges.click();
    await (waitForResponse
      ? graphqlWaitForResponse(this.page, 'updateCandidateProfile', click)
      : click());
  }

  async clickClearDesiredRoles() {
    await this.clearDesiredRoles.click();
  }

  async clickClearCoreTechnicalSkills() {
    await this.clearCoreTechnicalSkills.click();
  }

  async assertDesiredPositionValidationMessage(desiredPositionValidationMessage: string) {
    await expect(this.desiredPositionValidationMessage).toHaveText(
      desiredPositionValidationMessage,
    );
  }

  async assertCoreTechnicalSkillsValidationMessage(coreTechnicalSkillsValidationMessage: string) {
    await expect(this.coreTechnicalSkillsValidationMessage).toHaveText(
      coreTechnicalSkillsValidationMessage,
    );
  }
}
