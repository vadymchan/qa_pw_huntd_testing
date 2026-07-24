import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@ui/pages/BasePage';
import { graphqlWaitForResponse } from '@utils/playwright/graphqlWaitForResponse';
import { CandidateProfileContactsComponent } from '@ui/components/profile/candidate/CandidateProfileContactsComponent';
import { PATHS } from '@ui/constants/paths';

export class EditCandidateProfileContactsPage extends BasePage {
  public profileContacts: CandidateProfileContactsComponent;
  private saveChanges: Locator;
  private firstNameValidationMessage: Locator;
  private lastNameValidationMessage: Locator;
  private linkedinValidationMessage: Locator;
  private behanceValidationMessage: Locator;
  private gitHubValidationMessage: Locator;
  private saveChangesName: string;

  constructor(page: Page) {
    super(page, PATHS.profile.candidate.editContacts);

    this.profileContacts = new CandidateProfileContactsComponent(page);

    this.saveChangesName = 'Save changes';

    this.saveChanges = page.getByRole('button', { name: this.saveChangesName });

    const validationMessage = page.locator('[class*=FormField_metaBlock]');
    this.firstNameValidationMessage = validationMessage.nth(1);
    this.lastNameValidationMessage = validationMessage.nth(2);
    this.linkedinValidationMessage = validationMessage.nth(3);
    this.behanceValidationMessage = validationMessage.nth(4);
    this.gitHubValidationMessage = validationMessage.last();
  }

  async clickSaveChanges(waitForResponse: boolean) {
    await this.step(`Click '${this.saveChangesName}'`, async () => {
      const click = () => this.saveChanges.click();
      await (waitForResponse
        ? await graphqlWaitForResponse(this.page, 'updateProfileContacts', click)
        : click());
    });
  }

  async assertFirstNameValidationMessage(validationMessage: string) {
    await this.step(
      `Assert 'First name' shows '${validationMessage}' validation message`,
      async () => {
        await expect(this.firstNameValidationMessage).toHaveText(validationMessage);
      },
    );
  }

  async assertLastNameValidationMessage(validationMessage: string) {
    await this.step(
      `Assert 'Last name' shows '${validationMessage}' validation message`,
      async () => {
        await expect(this.lastNameValidationMessage).toHaveText(validationMessage);
      },
    );
  }

  async assertLinkedinValidationMessage(validationMessage: string) {
    await this.step(
      `Assert 'Linkedin' shows '${validationMessage}' validation message`,
      async () => {
        await expect(this.linkedinValidationMessage).toHaveText(validationMessage);
      },
    );
  }

  async assertBehanceValidationMessage(validationMessage: string) {
    await this.step(
      `Assert 'Behance' shows '${validationMessage}' validation message`,
      async () => {
        await expect(this.behanceValidationMessage).toHaveText(validationMessage);
      },
    );
  }

  async assertGitHubValidationMessage(validationMessage: string) {
    await this.step(`Assert 'GitHub' shows '${validationMessage}' validation message`, async () => {
      await expect(this.gitHubValidationMessage).toHaveText(validationMessage);
    });
  }
}
