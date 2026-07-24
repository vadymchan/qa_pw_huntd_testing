import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@ui/pages/BasePage';
import { graphqlWaitForResponse } from '@utils/playwright/graphqlWaitForResponse';
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

  async clickSaveChanges(waitForResponse: boolean) {
    await this.step(`Click '${this.saveChangesName}'`, async () => {
      const click = () => this.saveChanges.click();
      await (waitForResponse
        ? graphqlWaitForResponse(this.page, 'updateCandidateProfile', click)
        : click());
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
