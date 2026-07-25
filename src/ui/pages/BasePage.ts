import { expect, Locator, Page } from '@playwright/test';
import { graphqlWaitForResponse } from '@utils/playwright/graphqlWaitForResponse';
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

  protected async clickAndWaitForOperation(locator: Locator, operationName: string) {
    await graphqlWaitForResponse(this.page, operationName, async () => {
      await locator.click();
    });
  }

  async assertOpened() {
    await this.step(`Assert '${this.path}' is opened`, async () => {
      await expect(this.page).toHaveURL(this.path);
    });
  }
}
