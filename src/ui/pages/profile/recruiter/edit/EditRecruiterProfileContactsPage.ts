import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../../../BasePage';
import { RecruiterProfileContactsComponent } from '../../../../components/profile/recruiter/RecruiterProfileContactsComponent';
import { graphqlWaitForResponse } from '../../../../../utils/playwright/graphqlWaitForResponse';
import { PATHS } from '../../../../constants/paths';

export class EditRecruiterProfileContactsPage extends BasePage {
  public profileContacts: RecruiterProfileContactsComponent;
  private saveChanges: Locator;
  private firstNameValidationMessage: Locator;
  private lastNameValidationMessage: Locator;
  private saveChangesName: string;

  constructor(page: Page) {
    super(page, PATHS.profile.recruiter.contacts);

    this.profileContacts = new RecruiterProfileContactsComponent(page);
    this.saveChangesName = 'Save changes';
    this.saveChanges = page.getByRole('button', { name: this.saveChangesName });
    const validationMessage = page.locator('[class*=FormField_metaBlock]');
    this.firstNameValidationMessage = validationMessage.nth(1);
    this.lastNameValidationMessage = validationMessage.nth(2);
  }

  async clickSaveChanges(waitForResponse: boolean) {
    await this.step(`Click '${this.saveChangesName}'`, async () => {
      const click = () => this.saveChanges.click();
      await (waitForResponse
        ? graphqlWaitForResponse(this.page, 'updateProfileContacts', click)
        : click());
    });
  }

  async assertFirstNameValidationMessage(validationMessage: string) {
    await this.step(
      `Assert 'first name' shows '${validationMessage}' validation message`,
      async () => {
        await expect(this.firstNameValidationMessage).toHaveText(validationMessage);
      },
    );
  }

  async assertLastNameValidationMessage(validationMessage: string) {
    await this.step(
      `Assert 'last name' shows '${validationMessage}' validation message`,
      async () => {
        await expect(this.lastNameValidationMessage).toHaveText(validationMessage);
      },
    );
  }
}
