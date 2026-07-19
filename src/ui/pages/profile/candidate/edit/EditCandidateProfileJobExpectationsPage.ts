import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../../../BasePage';
import { graphqlWaitForResponse } from '../../../../../utils/playwright/graphqlWaitForResponse';
import { CandidateProfileJobExpectationsComponent } from '../../../../components/profile/candidate/CandidateProfileJobExpectationsComponent';

export class EditCandidateProfileJobExpectationsPage extends BasePage {
  public profileJobExpectations: CandidateProfileJobExpectationsComponent;
  private saveChanges: Locator;
  private desiredBaseSalaryValidationMessage: Locator;

  constructor(page: Page) {
    super(page, '/profile/candidate/job-expectations');

    this.profileJobExpectations = new CandidateProfileJobExpectationsComponent(page);
    this.saveChanges = page.getByRole('button', { name: 'Save changes' });
    const validationMessage = page.locator('[class*=FormField_metaBlock]');
    this.desiredBaseSalaryValidationMessage = validationMessage.first();
  }

  async clickSaveChanges(waitForResponse: boolean) {
    const click = () => this.saveChanges.click();
    await (waitForResponse
      ? graphqlWaitForResponse(this.page, 'updateCandidateProfile', click)
      : click());
  }

  async assertDesiredBaseSalaryValidationMessage(desiredBaseSalaryValidationMessage: string) {
    await expect(this.desiredBaseSalaryValidationMessage).toHaveText(
      desiredBaseSalaryValidationMessage,
    );
  }
}
