import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class SignInUserPage extends BasePage {
  private email: Locator;
  private password: Locator;
  private signIn: Locator;
  private emailValidationMessage: Locator;
  private passwordValidationMessage: Locator;

  constructor(page: Page) {
    super(page, '/sign-in');

    this.email = page.getByLabel('Email');
    this.password = page.getByLabel('Password');
    this.signIn = page.getByRole('button', { name: 'Sign In', exact: true });
    this.emailValidationMessage = page.locator('[class*=FormField_metaBlock]').first();
    this.passwordValidationMessage = page.locator('[class*=FormField_metaBlock]').last();
  }

  async fillEmail(email: string) {
    await this.email.fill(email);
  }

  async fillPassword(password: string) {
    await this.password.fill(password);
  }

  async clickSignIn() {
    await this.signIn.click();
  }

  async assertEmailValidationMessage(validationMessage: string) {
    await expect(this.emailValidationMessage).toHaveText(validationMessage);
  }

  async assertPasswordValidationMessage(passwordValidationMessage: string) {
    await expect(this.passwordValidationMessage).toHaveText(passwordValidationMessage);
  }
}
