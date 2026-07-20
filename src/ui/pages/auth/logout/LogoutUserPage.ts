import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../BasePage';
import { PATHS } from '../../../constants/paths';

export class LogoutUserPage extends BasePage {
  private profile: Locator;
  private signOut: Locator;
  private profileName: string;
  private signOutName: string;

  constructor(page: Page) {
    super(page, PATHS.home);

    this.profileName = 'Profile';
    this.signOutName = 'Sign out';

    this.profile = page.getByRole('button', { name: this.profileName });
    this.signOut = page.getByRole('button', { name: this.signOutName });
  }

  async clickProfile() {
    await this.step(`Click '${this.profileName}'`, async () => {
      await this.profile.click();
    });
  }

  async clickSignOut() {
    await this.step(`Click '${this.signOutName}'`, async () => {
      await this.signOut.click();
    });
  }
}
