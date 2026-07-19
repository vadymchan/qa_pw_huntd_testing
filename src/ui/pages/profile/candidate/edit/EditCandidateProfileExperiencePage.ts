import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../../../BasePage';
import { graphqlWaitForResponse } from '../../../../../utils/playwright/graphqlWaitForResponse';
import { CandidateProfileExperienceComponent } from '../../../../components/profile/candidate/CandidateProfileExperienceComponent';

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

  constructor(page: Page) {
    super(page, '/profile/candidate/experience');

    this.profileExperience = new CandidateProfileExperienceComponent(page);
    this.add = page.getByRole('button', { name: 'Add' });
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
    await this.add.click();
  }

  async clickEdit() {
    await this.edit.click();
  }

  async clickDelete() {
    const click = () => this.delete.click();
    await graphqlWaitForResponse(this.page, 'deleteWorkPlace', click);
  }

  async assertRoleValidationMessage(roleValidationMessage: string) {
    await expect(this.roleValidationMessage).toHaveText(roleValidationMessage);
  }

  async assertCompanyNameValidationMessage(companyNameValidationMessage: string) {
    await expect(this.companyNameValidationMessage).toHaveText(companyNameValidationMessage);
  }

  async assertStartMonthValidationMessage(startMonthValidationMessage: string) {
    await expect(this.startMonthValidationMessage).toHaveText(startMonthValidationMessage);
  }

  async assertStartYearValidationMessage(startYearValidationMessage: string) {
    await expect(this.startYearValidationMessage).toHaveText(startYearValidationMessage);
  }

  async assertEndYearValidationMessage(endYearValidationMessage: string) {
    await expect(this.endYearValidationMessage).toHaveText(endYearValidationMessage);
  }
}
