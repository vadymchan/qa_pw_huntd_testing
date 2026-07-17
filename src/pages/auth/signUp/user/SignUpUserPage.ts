import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../../../BasePage';

export class SignUpUserPage extends BasePage {
  private email: Locator;
  private password: Locator;
  private repeatPassword: Locator;
  private createAccount: Locator;
  private emailValidationMessage: Locator;
  private passwordValidationMessage: Locator;
  private repeatPasswordValidationMessage: Locator;

  constructor(page: Page) {
    super(page, '/sign-up');
    this.email = page.getByLabel('Email');
    this.password = page.getByLabel('Password', { exact: true });
    this.repeatPassword = page.getByLabel('Repeat password');
    this.createAccount = page.getByRole('button', { name: 'Create account' });
    this.emailValidationMessage = page.locator('[class*=FormField_metaBlock]').first();
    this.passwordValidationMessage = page.locator('[class*=FormField_metaBlock]').nth(1);
    this.repeatPasswordValidationMessage = page.locator('[class*=FormField_metaBlock]').last();
  }

  async fillEmail(email: string) {
    await this.email.fill(email);
  }

  async fillPassword(password: string) {
    await this.password.fill(password);
  }

  async fillRepeatPassword(repeatPassword: string) {
    await this.repeatPassword.fill(repeatPassword);
  }

  async clickCreateAccount() {
    await this.createAccount.click();
  }

  async assertEmailValidationMessage(validationMessage: string) {
    await expect(this.emailValidationMessage).toHaveText(validationMessage);
  }

  async assertPasswordValidationMessage(validationMessage: string) {
    await expect(this.passwordValidationMessage).toHaveText(validationMessage);
  }

  async assertRepeatPasswordValidationMessage(validationMessage: string) {
    await expect(this.repeatPasswordValidationMessage).toHaveText(validationMessage);
  }
}
