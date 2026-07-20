import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../../../BasePage';
import { graphqlWaitForResponse } from '../../../../../utils/playwright/graphqlWaitForResponse';
import { CandidateProfileBioComponent } from '../../../../components/profile/candidate/CandidateProfileBioComponent';
import { PATHS } from '../../../../constants/paths';

export class EditCandidateProfileBioPage extends BasePage {
  public profileBio: CandidateProfileBioComponent;
  private saveChanges: Locator;
  private achievementsValidationMessage: Locator;
  private saveChangesName: string;

  constructor(page: Page) {
    super(page, PATHS.profile.candidate.bio);

    this.profileBio = new CandidateProfileBioComponent(page);

    this.saveChangesName = 'Save changes';

    this.saveChanges = page.getByRole('button', { name: this.saveChangesName });

    const validationMessage = page.locator('[class*=FormField_metaBlock]');
    this.achievementsValidationMessage = validationMessage.first();
  }

  async clickSaveChanges(waitForResponse: boolean) {
    await this.step(`Click '${this.saveChangesName}'`, async () => {
      const click = () => this.saveChanges.click();
      await (waitForResponse
        ? await graphqlWaitForResponse(this.page, 'updateCandidateProfile', click)
        : click());
    });
  }

  async assertAchievementsValidationMessage(validationMessage: string) {
    await this.step(
      `Assert 'Achievements' shows '${validationMessage}' validation message`,
      async () => {
        await expect(this.achievementsValidationMessage).toHaveText(validationMessage);
      },
    );
  }
}
