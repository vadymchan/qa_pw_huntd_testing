import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@ui/pages/BasePage';
import { CandidateProfileJobExpectationsComponent } from '@ui/components/profile/candidate/CandidateProfileJobExpectationsComponent';
import { PATHS } from '@ui/constants/paths';

export class EditCandidateProfileJobExpectationsPage extends BasePage {
  public profileJobExpectations: CandidateProfileJobExpectationsComponent;
  private saveChanges: Locator;
  private desiredBaseSalaryValidationMessage: Locator;
  private saveChangesName: string;

  constructor(page: Page) {
    super(page, PATHS.profile.candidate.jobExpectations);

    this.profileJobExpectations = new CandidateProfileJobExpectationsComponent(page);

    this.saveChangesName = 'Save changes';

    this.saveChanges = page.getByRole('button', { name: this.saveChangesName });

    const validationMessage = page.locator('[class*=FormField_metaBlock]');
    this.desiredBaseSalaryValidationMessage = validationMessage.first();
  }

  async clickSaveChanges() {
    await this.step(`Click '${this.saveChangesName}'`, async () => {
      await this.saveChanges.click();
    });
  }

  async clickSaveChangesAndWaitForSave() {
    await this.step(`Click '${this.saveChangesName}'`, async () => {
      await this.clickAndWaitForOperation(this.saveChanges, 'updateCandidateProfile');
    });
  }

  async assertDesiredBaseSalaryValidationMessage(validationMessage: string) {
    await this.step(
      `Assert 'Desired base salary' shows '${validationMessage}' validation message`,
      async () => {
        await expect(this.desiredBaseSalaryValidationMessage).toHaveText(validationMessage);
      },
    );
  }
}
