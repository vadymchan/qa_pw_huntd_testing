import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../../../BasePage';
import { RecruiterProfileContactsComponent } from '../../../../components/profile/recruiter/RecruiterProfileContactsComponent';
import { graphqlWaitForResponse } from '../../../../../utils/playwright/graphqlWaitForResponse';

export class EditRecruiterProfileContactsPage extends BasePage {
  public profileContacts: RecruiterProfileContactsComponent;
  private firstNameValidationMessage: Locator;
  private lastNameValidationMessage: Locator;
  private saveChanges: Locator;

  constructor(page: Page) {
    super(page, '/profile/contacts?preview=recruiter');

    this.profileContacts = new RecruiterProfileContactsComponent(page);
    this.saveChanges = page.getByRole('button', { name: 'Save changes' });
    const validationMessage = page.locator('[class*=FormField_metaBlock]');
    this.firstNameValidationMessage = validationMessage.nth(1);
    this.lastNameValidationMessage = validationMessage.nth(2);
  }

  async clickSaveChanges(waitForResponse: boolean) {
    const click = () => this.saveChanges.click();
    await (waitForResponse
      ? graphqlWaitForResponse(this.page, 'updateProfileContacts', click)
      : click());
  }

  async assertFirstNameValidationMessage(firstNameValidationMessage: string) {
    await expect(this.firstNameValidationMessage).toHaveText(firstNameValidationMessage);
  }

  async assertLastNameValidationMessage(lastNameValidationMessage: string) {
    await expect(this.lastNameValidationMessage).toHaveText(lastNameValidationMessage);
  }
}
