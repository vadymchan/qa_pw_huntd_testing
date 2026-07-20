import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../../../BasePage';
import { graphqlWaitForResponse } from '../../../../../utils/playwright/graphqlWaitForResponse';
import { CandidateProfileExperienceComponent } from '../../../../components/profile/candidate/CandidateProfileExperienceComponent';
import { PATHS } from '../../../../constants/paths';

export class EditCandidateProfileExperiencePage extends BasePage {
  public profileExperience: CandidateProfileExperienceComponent;
  private add: Locator;
  private edit: Locator;
  private delete: Locator;
  private roleValidationMessage: Locator;
  private companyNameValidationMessage: Locator;
  private startMonthValidationMessage: Locator;
  private startYearValidationMessage: Locator;
  private endYearValidationMessage: Locator;
  private addName: string;
  private editName: string;
  private deleteName: string;

  constructor(page: Page) {
    super(page, PATHS.profile.candidate.experience);

    this.profileExperience = new CandidateProfileExperienceComponent(page);

    this.addName = 'Add';
    this.editName = 'Edit';
    this.deleteName = 'Delete';

    this.add = page.getByRole('button', { name: this.addName });
    this.edit = page.getByRole('button').filter({ has: page.locator('.icon-edit') });
    this.delete = page.getByRole('button').filter({ has: page.locator('.icon-trash') });

    const validationMessage = page.locator('[class*=FormField_metaBlock]');
    this.roleValidationMessage = validationMessage.first();
    this.companyNameValidationMessage = validationMessage.nth(1);
    this.startMonthValidationMessage = validationMessage.nth(2);
    this.startYearValidationMessage = validationMessage.nth(3);
    this.endYearValidationMessage = validationMessage.nth(5);
  }

  async clickAdd() {
    await this.step(`Click '${this.addName}'`, async () => {
      await this.add.click();
    });
  }

  async clickEdit() {
    await this.step(`Click '${this.editName}'`, async () => {
      await this.edit.click();
    });
  }

  async clickDelete() {
    await this.step(`Click '${this.deleteName}'`, async () => {
      const click = () => this.delete.click();
      await graphqlWaitForResponse(this.page, 'deleteWorkPlace', click);
    });
  }

  async assertRoleValidationMessage(validationMessage: string) {
    await this.step(
      `Assert 'Role' shows '${validationMessage}' validation message`,
      async () => {
        await expect(this.roleValidationMessage).toHaveText(validationMessage);
      },
    );
  }

  async assertCompanyNameValidationMessage(validationMessage: string) {
    await this.step(
      `Assert 'Company name' shows '${validationMessage}' validation message`,
      async () => {
        await expect(this.companyNameValidationMessage).toHaveText(validationMessage);
      },
    );
  }

  async assertStartMonthValidationMessage(validationMessage: string) {
    await this.step(
      `Assert 'Start month' shows '${validationMessage}' validation message`,
      async () => {
        await expect(this.startMonthValidationMessage).toHaveText(validationMessage);
      },
    );
  }

  async assertStartYearValidationMessage(validationMessage: string) {
    await this.step(
      `Assert 'Start year' shows '${validationMessage}' validation message`,
      async () => {
        await expect(this.startYearValidationMessage).toHaveText(validationMessage);
      },
    );
  }

  async assertEndYearValidationMessage(validationMessage: string) {
    await this.step(
      `Assert 'End year' shows '${validationMessage}' validation message`,
      async () => {
        await expect(this.endYearValidationMessage).toHaveText(validationMessage);
      },
    );
  }
}
