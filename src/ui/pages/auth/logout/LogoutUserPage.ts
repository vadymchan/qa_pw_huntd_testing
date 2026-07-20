import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../BasePage';
import { PATHS } from '../../../constants/paths';

export class LogoutUserPage extends BasePage {
  private profile: Locator;
  private signOut: Locator;

  constructor(page: Page) {
    super(page, PATHS.home);

    this.profile = page.getByRole('button', { name: 'Profile' });
    this.signOut = page.getByRole('button', { name: 'Sign out' });
  }

  async clickProfile() {
    await this.profile.click();
  }

  async clickSignOut() {
    await this.signOut.click();
  }
}
