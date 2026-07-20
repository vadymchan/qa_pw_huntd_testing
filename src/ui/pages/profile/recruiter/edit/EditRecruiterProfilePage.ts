import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../../../BasePage';
import { RecruiterProfileComponent } from '../../../../components/profile/recruiter/RecruiterProfileComponent';
import { graphqlWaitForResponse } from '../../../../../utils/playwright/graphqlWaitForResponse';
import { PATHS } from '../../../../constants/paths';

export class EditRecruiterProfilePage extends BasePage {
  public recruiterProfile: RecruiterProfileComponent;
  private roleValidationMessage: Locator;
  private companyValidationMessage: Locator;
  private saveChanges: Locator;

  constructor(page: Page) {
    super(page, PATHS.profile.recruiter.base);

    this.recruiterProfile = new RecruiterProfileComponent(page);
    this.saveChanges = page.getByRole('button', { name: 'Save changes' });
    const validationMessage = page.locator('[class*=FormField_metaBlock]');
    this.roleValidationMessage = validationMessage.first();
    this.companyValidationMessage = validationMessage.last();
  }

  async clickSaveChanges(waitForResponse: boolean) {
    const click = () => this.saveChanges.click();
    await (waitForResponse
      ? graphqlWaitForResponse(this.page, 'updateRecruiterProfile', click)
      : click());
  }

  async assertRoleValidationMessage(roleValidationMessage: string) {
    await expect(this.roleValidationMessage).toHaveText(roleValidationMessage);
  }

  async assertCompanyValidationMessage(companyValidationMessage: string) {
    await expect(this.companyValidationMessage).toHaveText(companyValidationMessage);
  }
}
