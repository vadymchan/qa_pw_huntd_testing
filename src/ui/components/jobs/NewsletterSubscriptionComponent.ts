import { expect, Locator, Page } from '@playwright/test';
import { BaseComponent } from '@ui/components/BaseComponent';

export class NewsletterSubscriptionComponent extends BaseComponent {
  private email: Locator;
  private receiveJobs: Locator;
  private flashMessageTitle: Locator;
  private flashMessageText: Locator;
  private emailValidationMessage: Locator;
  private emailLabel: string;
  private receiveJobsName: string;

  constructor(page: Page) {
    super(page);

    this.emailLabel = 'Email';
    this.receiveJobsName = 'Receive jobs';
    this.email = page.getByPlaceholder(this.emailLabel);
    this.emailValidationMessage = page.locator('[class*=FormField_metaBlock]').last();
    this.receiveJobs = page.getByRole('button', { name: this.receiveJobsName });
    this.flashMessageTitle = page.locator('[class*=FlashMessageItem_profileTitle]');
    this.flashMessageText = page.locator('[class*=FlashMessageItem_text]');
  }

  async fillEmail(email: string) {
    await this.step(`Fill '${this.emailLabel}'`, async () => {
      await this.email.fill(email);
    });
  }

  async clickReceiveJobs() {
    await this.step(`Click '${this.receiveJobsName}'`, async () => {
      await this.receiveJobs.click();
    });
  }

  async assertFlashMessageTitleHasText(flashMessageTitle: string) {
    await this.step(`Assert flash message title has '${flashMessageTitle}' text`, async () => {
      await expect(this.flashMessageTitle).toHaveText(flashMessageTitle);
    });
  }

  async assertFlashMessageTextHasText(flashMessageText: string) {
    await this.step(`Assert flash message text has '${flashMessageText}' text`, async () => {
      await expect(this.flashMessageText).toHaveText(flashMessageText);
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
}
