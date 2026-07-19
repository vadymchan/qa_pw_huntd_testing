import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '../../BaseComponent';
import { selectOption } from '../../../../utils/playwright/selectOption';
import { Month } from '../../../../models/auth/candidate/Month';
import { graphqlWaitForResponse } from '../../../../utils/playwright/graphqlWaitForResponse';

export class CandidateProfileExperienceComponent extends BaseComponent {
  private role: Locator;
  private companyName: Locator;
  private startMonth: Locator;
  private startYear: Locator;
  private endDate: Locator;
  private endMonth: Locator;
  private endYear: Locator;
  private achivements: Locator;
  private save: Locator;

  constructor(page: Page) {
    super(page);

    this.role = page.getByLabel('Role');
    this.companyName = page.getByLabel('Company name');
    this.startMonth = page.locator('#startMonth');
    this.startYear = page.locator('[name="startYear"]');
    this.endDate = page.getByRole('button', { name: 'End date' });
    this.endMonth = page.locator('#endMonth');
    this.endYear = page.locator('[name="endYear"]');
    this.achivements = page.getByLabel('Achievements');
    this.save = page.getByRole('button', { name: 'Save' });
  }

  async fillRole(role: string) {
    await this.role.fill(role);
  }

  async fillCompanyName(companyName: string) {
    await this.companyName.fill(companyName);
  }

  async fillStartYear(startYear: string) {
    await this.startYear.fill(startYear);
  }

  async fillEndYear(endYear: string) {
    await this.endYear.fill(endYear);
  }

  async fillAchivements(achivements: string) {
    await this.achivements.fill(achivements);
  }

  async selectStartMonth(startMonth: Month) {
    await selectOption(this.page, this.startMonth, startMonth);
  }

  async selectEndMonth(endMonth: Month) {
    await selectOption(this.page, this.endMonth, endMonth);
  }

  async clickEndDate() {
    await this.endDate.click();
  }

  async clickSave(waitForResponse: boolean, operationType?: 'Create' | 'Update') {
    const click = () => this.save.click();

    if (!waitForResponse) {
      await click();
      return;
    }

    const operationName = operationType === 'Create' ? 'createWorkPlace' : 'updateWorkPlace';
    await graphqlWaitForResponse(this.page, operationName, click);
  }
}
