import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@ui/pages/BasePage';
import { RecruiterProfileComponent } from '@ui/components/profile/recruiter/RecruiterProfileComponent';
import { graphqlWaitForResponse } from '@utils/playwright/graphqlWaitForResponse';
import { PATHS } from '@ui/constants/paths';

export class EditRecruiterProfilePage extends BasePage {
  public recruiterProfile: RecruiterProfileComponent;
  private saveChanges: Locator;
  private roleValidationMessage: Locator;
  private companyValidationMessage: Locator;
  private saveChangesName: string;

  constructor(page: Page) {
    super(page, PATHS.profile.recruiter.base);

    this.recruiterProfile = new RecruiterProfileComponent(page);

    this.saveChangesName = 'Save changes';

    this.saveChanges = page.getByRole('button', { name: this.saveChangesName });

    const validationMessage = page.locator('[class*=FormField_metaBlock]');
    this.roleValidationMessage = validationMessage.first();
    this.companyValidationMessage = validationMessage.last();
  }

  async clickSaveChanges(waitForResponse: boolean) {
    await this.step(`Click '${this.saveChangesName}'`, async () => {
      const click = () => this.saveChanges.click();
      await (waitForResponse
        ? graphqlWaitForResponse(this.page, 'updateRecruiterProfile', click)
        : click());
    });
  }

  async assertRoleValidationMessage(validationMessage: string) {
    await this.step(`Assert 'Role' shows '${validationMessage}' validation message`, async () => {
      await expect(this.roleValidationMessage).toHaveText(validationMessage);
    });
  }

  async assertCompanyValidationMessage(validationMessage: string) {
    await this.step(
      `Assert 'Company' shows '${validationMessage}' validation message`,
      async () => {
        await expect(this.companyValidationMessage).toHaveText(validationMessage);
      },
    );
  }
}
