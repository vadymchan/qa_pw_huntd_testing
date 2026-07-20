import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../../../BasePage';
import { graphqlWaitForResponse } from '../../../../../utils/playwright/graphqlWaitForResponse';
import { CandidateProfileContactsComponent } from '../../../../components/profile/candidate/CandidateProfileContactsComponent';
import { PATHS } from '../../../../constants/paths';

export class EditCandidateProfileContactsPage extends BasePage {
  public profileContacts: CandidateProfileContactsComponent;
  private saveChanges: Locator;
  private firstNameValidationMessage: Locator;
  private lastNameValidationMessage: Locator;
  private linkedinValidationMessage: Locator;
  private behanceValidationMessage: Locator;
  private gitHubValidationMessage: Locator;

  constructor(page: Page) {
    super(page, PATHS.profile.candidate.editContacts);

    this.profileContacts = new CandidateProfileContactsComponent(page);
    this.saveChanges = page.getByRole('button', { name: 'Save changes' });
    const validationMessage = page.locator('[class*=FormField_metaBlock]');
    this.firstNameValidationMessage = validationMessage.nth(1);
    this.lastNameValidationMessage = validationMessage.nth(2);
    this.linkedinValidationMessage = validationMessage.nth(3);
    this.behanceValidationMessage = validationMessage.nth(4);
    this.gitHubValidationMessage = validationMessage.last();
  }

  async clickSaveChanges(waitForResponse: boolean) {
    const click = () => this.saveChanges.click();
    await (waitForResponse
      ? await graphqlWaitForResponse(this.page, 'updateProfileContacts', click)
      : click());
  }

  async assertFirstNameValidationMessage(firstNameValidationMessage: string) {
    await expect(this.firstNameValidationMessage).toHaveText(firstNameValidationMessage);
  }

  async assertLastNameValidationMessage(lastNameValidationMessage: string) {
    await expect(this.lastNameValidationMessage).toHaveText(lastNameValidationMessage);
  }

  async assertLinkedinValidationMessage(linkedinValidationMessage: string) {
    await expect(this.linkedinValidationMessage).toHaveText(linkedinValidationMessage);
  }

  async assertBehanceValidationMessage(behanceValidationMessage: string) {
    await expect(this.behanceValidationMessage).toHaveText(behanceValidationMessage);
  }

  async assertGitHubValidationMessage(gitHubValidationMessage: string) {
    await expect(this.gitHubValidationMessage).toHaveText(gitHubValidationMessage);
  }
}
