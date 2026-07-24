import { Locator, Page } from '@playwright/test';
import { BasePage } from '@ui/pages/BasePage';
import { CandidateProfileContactsComponent } from '@ui/components/profile/candidate/CandidateProfileContactsComponent';
import { PATHS } from '@ui/constants/paths';

export class CreateCandidateProfileContactsPage extends BasePage {
  public profileContacts: CandidateProfileContactsComponent;
  private activateProfile: Locator;
  private activateProfileName: string;

  constructor(page: Page) {
    super(page, PATHS.profile.candidate.createContacts);

    this.profileContacts = new CandidateProfileContactsComponent(page);

    this.activateProfileName = 'Activate profile';

    this.activateProfile = page.getByRole('button', { name: this.activateProfileName });
  }

  async clickActivateProfile() {
    await this.step(`Click '${this.activateProfileName}'`, async () => {
      await this.activateProfile.click();
    });
  }
}
