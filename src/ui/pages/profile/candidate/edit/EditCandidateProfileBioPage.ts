import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../../../BasePage';
import { graphqlWaitForResponse } from '../../../../../utils/playwright/graphqlWaitForResponse';
import { CandidateProfileBioComponent } from '../../../../components/profile/candidate/CandidateProfileBioComponent';
import { PATHS } from '../../../../constants/paths';

export class EditCandidateProfileBioPage extends BasePage {
  public profileBio: CandidateProfileBioComponent;
  private saveChanges: Locator;
  private achivementsValidationMessage: Locator;

  constructor(page: Page) {
    super(page, PATHS.profile.candidate.bio);

    this.profileBio = new CandidateProfileBioComponent(page);
    this.saveChanges = page.getByRole('button', { name: 'Save changes' });
    const validationMessage = page.locator('[class*=FormField_metaBlock]');
    this.achivementsValidationMessage = validationMessage.first();
  }

  async clickSaveChanges(waitForResponse: boolean) {
    const click = () => this.saveChanges.click();
    await (waitForResponse
      ? await graphqlWaitForResponse(this.page, 'updateCandidateProfile', click)
      : click());
  }

  async assertAchivementsValidationMessage(achivementsValidationMessage: string) {
    await expect(this.achivementsValidationMessage).toHaveText(achivementsValidationMessage);
  }
}
