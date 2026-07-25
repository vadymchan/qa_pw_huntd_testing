import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@ui/pages/BasePage';
import { RecruiterProfileContactsComponent } from '@ui/components/profile/recruiter/RecruiterProfileContactsComponent';
import { PATHS } from '@ui/constants/paths';

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

  async clickSaveChanges() {
    await this.step(`Click '${this.saveChangesName}'`, async () => {
      await this.saveChanges.click();
    });
  }

  async clickSaveChangesAndWaitForSave() {
    await this.step(`Click '${this.saveChangesName}'`, async () => {
      await this.clickAndWaitForOperation(this.saveChanges, 'updateProfileContacts');
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
