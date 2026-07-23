import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { graphqlWaitForResponse } from '../../../utils/playwright/graphqlWaitForResponse';
import { PATHS } from '../../constants/paths';

export class ChangePasswordPage extends BasePage {
  private changePassword: Locator;
  private currentPassword: Locator;
  private newPassword: Locator;
  private repeatNewPassword: Locator;
  private saveChanges: Locator;
  private currentPasswordValidationMessage: Locator;
  private newPasswordValidationMessage: Locator;
  private repeatNewPasswordValidationMessage: Locator;
  private changePasswordName: string;
  private currentPasswordLabel: string;
  private newPasswordLabel: string;
  private repeatNewPasswordLabel: string;
  private saveChangesName: string;

  constructor(page: Page) {
    super(page, PATHS.changePassword);

    this.changePasswordName = 'Change password';
    this.currentPasswordLabel = 'Current password';
    this.newPasswordLabel = 'New password';
    this.repeatNewPasswordLabel = 'Repeat new password';
    this.saveChangesName = 'Save changes';

    this.changePassword = page.getByRole('button', { name: this.changePasswordName });
    this.currentPassword = page.getByLabel(this.currentPasswordLabel);
    this.newPassword = page.getByLabel(this.newPasswordLabel, { exact: true });
    this.repeatNewPassword = page.getByLabel(this.repeatNewPasswordLabel);
    this.saveChanges = page.getByRole('button', { name: this.saveChangesName });

    const validationMessage = page.locator('[class*=FormField_metaBlock]');
    this.currentPasswordValidationMessage = validationMessage.first();
    this.newPasswordValidationMessage = validationMessage.nth(1);
    this.repeatNewPasswordValidationMessage = validationMessage.last();
  }

  async fillCurrentPassword(currentPassword: string) {
    await this.step(`Fill '${this.currentPasswordLabel}'`, async () => {
      await this.currentPassword.fill(currentPassword);
    });
  }

  async fillNewPassword(newPassword: string) {
    await this.step(`Fill '${this.newPasswordLabel}'`, async () => {
      await this.newPassword.fill(newPassword);
    });
  }

  async fillRepeatNewPassword(repeatNewPassword: string) {
    await this.step(`Fill '${this.repeatNewPasswordLabel}'`, async () => {
      await this.repeatNewPassword.fill(repeatNewPassword);
    });
  }

  async clickChangePassword() {
    await this.step(`Click '${this.changePasswordName}'`, async () => {
      await this.changePassword.click();
    });
  }

  async clickSaveChanges(waitForResponse: boolean) {
    await this.step(`Click '${this.saveChangesName}'`, async () => {
      const click = () => this.saveChanges.click();
      await (waitForResponse
        ? graphqlWaitForResponse(this.page, 'changePassword', click)
        : click());
    });
  }

  async assertCurrentPasswordValidationMessage(validationMessage: string) {
    await this.step(
      `Assert '${this.currentPasswordLabel}' shows '${validationMessage}' validation message`,
      async () => {
        await expect(this.currentPasswordValidationMessage).toHaveText(validationMessage);
      },
    );
  }

  async assertNewPasswordValidationMessage(validationMessage: string) {
    await this.step(
      `Assert '${this.newPasswordLabel}' shows '${validationMessage}' validation message`,
      async () => {
        await expect(this.newPasswordValidationMessage).toHaveText(validationMessage);
      },
    );
  }

  async assertRepeatNewPasswordValidationMessage(validationMessage: string) {
    await this.step(
      `Assert '${this.repeatNewPasswordLabel}' shows '${validationMessage}' validation message`,
      async () => {
        await expect(this.repeatNewPasswordValidationMessage).toHaveText(validationMessage);
      },
    );
  }
}
