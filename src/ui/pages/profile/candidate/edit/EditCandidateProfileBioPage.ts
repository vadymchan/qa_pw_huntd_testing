import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@ui/pages/BasePage';
import { CandidateProfileBioComponent } from '@ui/components/profile/candidate/CandidateProfileBioComponent';
import { PATHS } from '@ui/constants/paths';

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

  async clickSaveChanges() {
    await this.step(`Click '${this.saveChangesName}'`, async () => {
      await this.saveChanges.click();
    });
  }

  async clickSaveChangesAndWaitForSave() {
    await this.step(`Click '${this.saveChangesName}'`, async () => {
      await this.clickAndWaitForOperation(this.saveChanges, 'updateCandidateProfile');
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
