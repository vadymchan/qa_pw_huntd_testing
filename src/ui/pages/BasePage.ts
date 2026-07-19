import { expect, Page } from '@playwright/test';
import { testStep } from '../../utils/playwright/testStep';

export class BasePage {
  constructor(
    protected page: Page,
    protected url: string, // TODO: consider if we need url contract in BasePage
  ) {}

  protected async step<T>(title: string, stepToRun: () => Promise<T> | T): Promise<T> {
    return await testStep(title, stepToRun);
  }

  async open() {
    await this.page.goto(this.url);
  }

  async assertOpened() {
    await expect(this.page).toHaveURL(this.url);
  }
}
