import { expect, Page } from '@playwright/test';
import { testStep } from '@utils/playwright/testStep';

export class BasePage {
  constructor(
    protected page: Page,
    protected path: string,
  ) {}

  protected async step<T>(title: string, stepToRun: () => Promise<T> | T): Promise<T> {
    return await testStep(title, stepToRun);
  }

  async open() {
    await this.page.goto(this.path);
  }

  async assertOpened() {
    await this.step(`Assert '${this.path}' is opened`, async () => {
      await expect(this.page).toHaveURL(this.path);
    });
  }
}
