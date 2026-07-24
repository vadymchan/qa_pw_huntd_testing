import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@ui/pages/BasePage';
import { PATHS } from '@ui/constants/paths';

export class SignInUserPage extends BasePage {
  private email: Locator;
  private password: Locator;
  private signIn: Locator;
  private emailValidationMessage: Locator;
  private passwordValidationMessage: Locator;
  private emailLabel: string;
  private passwordLabel: string;
  private signInName: string;

  constructor(page: Page) {
    super(page, PATHS.signIn);

    this.emailLabel = 'Email';
    this.passwordLabel = 'Password';
    this.signInName = 'Sign In';

    this.email = page.getByLabel(this.emailLabel);
    this.password = page.getByLabel(this.passwordLabel);
    this.signIn = page.getByRole('button', { name: this.signInName, exact: true });

    const validationMessage = page.locator('[class*=FormField_metaBlock]');
    this.emailValidationMessage = validationMessage.first();
    this.passwordValidationMessage = validationMessage.last();
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

  async clickSignIn() {
    await this.step(`Click '${this.signInName}'`, async () => {
      await this.signIn.click();
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
}
