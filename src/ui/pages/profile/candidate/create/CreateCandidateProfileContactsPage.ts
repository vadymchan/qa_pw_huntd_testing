import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../../BasePage';
import { CandidateProfileContactsComponent } from '../../../../components/profile/candidate/CandidateProfileContactsComponent';
import { PATHS } from '../../../../constants/paths';

export class CreateCandidateProfileContactsPage extends BasePage {
  public profileContacts: CandidateProfileContactsComponent;
  private activateProfile: Locator;

  constructor(page: Page) {
    super(page, PATHS.profile.candidate.createContacts);

    this.profileContacts = new CandidateProfileContactsComponent(page);
    this.activateProfile = page.getByRole('button', { name: 'Activate profile' });
  }

  async clickActivateProfile() {
    await this.activateProfile.click();
  }
}
