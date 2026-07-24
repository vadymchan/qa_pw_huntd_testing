import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@ui/pages/BasePage';
import { PATHS } from '@ui/constants/paths';

export class SignUpUserPage extends BasePage {
  private email: Locator;
  private password: Locator;
  private repeatPassword: Locator;
  private createAccount: Locator;
  private emailValidationMessage: Locator;
  private passwordValidationMessage: Locator;
  private repeatPasswordValidationMessage: Locator;
  private emailLabel: string;
  private passwordLabel: string;
  private repeatPasswordLabel: string;
  private createAccountName: string;

  constructor(page: Page) {
    super(page, PATHS.signUp);

    this.emailLabel = 'Email';
    this.passwordLabel = 'Password';
    this.repeatPasswordLabel = 'Repeat password';
    this.createAccountName = 'Create account';

    this.email = page.getByLabel(this.emailLabel);
    this.password = page.getByLabel(this.passwordLabel, { exact: true });
    this.repeatPassword = page.getByLabel(this.repeatPasswordLabel);
    this.createAccount = page.getByRole('button', { name: this.createAccountName });

    const validationMessage = page.locator('[class*=FormField_metaBlock]');
    this.emailValidationMessage = validationMessage.first();
    this.passwordValidationMessage = validationMessage.nth(1);
    this.repeatPasswordValidationMessage = validationMessage.last();
  }

  async fillEmail(email: string) {
    await this.step(`Fill '${this.emailLabel}'`, async () => {
      await this.email.fill(email);
    });
  }

  async fillPassword(password: string) {
    await this.step(`Fill '${this.passwordLabel}'`, async () => {
      await this.password.fill(password);
    });
  }

  async fillRepeatPassword(repeatPassword: string) {
    await this.step(`Fill '${this.repeatPasswordLabel}'`, async () => {
      await this.repeatPassword.fill(repeatPassword);
    });
  }

  async clickCreateAccount() {
    await this.step(`Click '${this.createAccountName}'`, async () => {
      await this.createAccount.click();
    });
  }

  async assertEmailValidationMessage(validationMessage: string) {
    await this.step(
      `Assert '${this.emailLabel}' shows '${validationMessage}' validation message`,
      async () => {
        await expect(this.emailValidationMessage).toHaveText(validationMessage);
      },
    );
  }

  async assertPasswordValidationMessage(validationMessage: string) {
    await this.step(
      `Assert '${this.passwordLabel}' shows '${validationMessage}' validation message`,
      async () => {
        await expect(this.passwordValidationMessage).toHaveText(validationMessage);
      },
    );
  }

  async assertRepeatPasswordValidationMessage(validationMessage: string) {
    await this.step(
      `Assert '${this.repeatPasswordLabel}' shows '${validationMessage}' validation message`,
      async () => {
        await expect(this.repeatPasswordValidationMessage).toHaveText(validationMessage);
      },
    );
  }
}
