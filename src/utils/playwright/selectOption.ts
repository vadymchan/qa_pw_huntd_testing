import { Locator, Page } from '@playwright/test';

export async function selectOption(page: Page, selectField: Locator, option: string) {
  // Use focus + ArrowDown because react-select hides the actual input, making .click() flaky
  await selectField.focus();
  await page.keyboard.press('ArrowDown');
  await page.locator('.select__option').getByText(option, { exact: true }).click();
  await selectField.blur();
}
