import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { graphqlWaitForResponse } from '../../../utils/playwright/graphqlWaitForResponse';

export class ChangePasswordPage extends BasePage {
  private changePassword: Locator;
  private currentPassword: Locator;
  private newPassword: Locator;
  private repeatNewPassword: Locator;
  private saveChanges: Locator;
  private currentPasswordValidationMessage: Locator;
  private newPasswordValidationMessage: Locator;
  private repeatNewPasswordValidationMessage: Locator;

  constructor(page: Page) {
    super(page, '/settings/change-password');

    this.changePassword = page.getByRole('button', { name: 'Change password' });
    this.currentPassword = page.getByLabel('Current password');
    this.newPassword = page.getByLabel('New password', { exact: true });
    this.repeatNewPassword = page.getByLabel('Repeat new password');
    this.saveChanges = page.getByRole('button', { name: 'Save changes' });
    const validationMessage = page.locator('[class*=FormField_metaBlock]');
    this.currentPasswordValidationMessage = validationMessage.first();
    this.newPasswordValidationMessage = validationMessage.nth(1);
    this.repeatNewPasswordValidationMessage = validationMessage.last();
  }

  async fillCurrentPassword(currentPassword: string) {
    await this.currentPassword.fill(currentPassword);
  }

  async fillNewPassword(newPassword: string) {
    await this.newPassword.fill(newPassword);
  }

  async fillRepeatNewPassword(repeatNewPassword: string) {
    await this.repeatNewPassword.fill(repeatNewPassword);
  }

  async clickChangePassword() {
    await this.changePassword.click();
  }

  async clickSaveChanges(waitForResponse: boolean) {
    const click = () => this.saveChanges.click();
    await (waitForResponse ? graphqlWaitForResponse(this.page, 'changePassword', click) : click());
  }

  async assertCurrentPasswordValidationMessage(currentPasswordValidationMessage: string) {
    await expect(this.currentPasswordValidationMessage).toHaveText(
      currentPasswordValidationMessage,
    );
  }

  async assertNewPasswordValidationMessage(newPasswordValidationMessage: string) {
    await expect(this.newPasswordValidationMessage).toHaveText(newPasswordValidationMessage);
  }

  async assertRepeatNewPasswordValidationMessage(repeatNewPasswordValidationMessage: string) {
    await expect(this.repeatNewPasswordValidationMessage).toHaveText(
      repeatNewPasswordValidationMessage,
    );
  }
}
