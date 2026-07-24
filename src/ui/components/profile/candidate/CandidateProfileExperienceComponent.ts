import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '@ui/components/BaseComponent';
import { selectOption } from '@utils/playwright/selectOption';
import { Month } from '@models/auth/candidate/Month';
import { graphqlWaitForResponse } from '@utils/playwright/graphqlWaitForResponse';

export class CandidateProfileExperienceComponent extends BaseComponent {
  private role: Locator;
  private companyName: Locator;
  private startMonth: Locator;
  private startYear: Locator;
  private endDate: Locator;
  private endMonth: Locator;
  private endYear: Locator;
  private achievements: Locator;
  private save: Locator;
  private roleLabel: string;
  private companyNameLabel: string;
  private startMonthLabel: string;
  private startYearLabel: string;
  private endDateName: string;
  private endMonthLabel: string;
  private endYearLabel: string;
  private achievementsLabel: string;
  private saveName: string;

  constructor(page: Page) {
    super(page);

    this.roleLabel = 'Role';
    this.companyNameLabel = 'Company name';
    this.startMonthLabel = 'Start month';
    this.startYearLabel = 'Start year';
    this.endDateName = 'End date';
    this.endMonthLabel = 'End month';
    this.endYearLabel = 'End year';
    this.achievementsLabel = 'Achievements';
    this.saveName = 'Save';

    this.role = page.getByLabel(this.roleLabel);
    this.companyName = page.getByLabel(this.companyNameLabel);
    this.startMonth = page.locator('#startMonth');
    this.startYear = page.locator('[name="startYear"]');
    this.endDate = page.getByRole('button', { name: this.endDateName });
    this.endMonth = page.locator('#endMonth');
    this.endYear = page.locator('[name="endYear"]');
    this.achievements = page.getByLabel(this.achievementsLabel);
    this.save = page.getByRole('button', { name: this.saveName });
  }

  async fillRole(role: string) {
    await this.step(`Fill '${this.roleLabel}'`, async () => {
      await this.role.fill(role);
    });
  }

  async fillCompanyName(companyName: string) {
    await this.step(`Fill '${this.companyNameLabel}'`, async () => {
      await this.companyName.fill(companyName);
    });
  }

  async fillStartYear(startYear: string) {
    await this.step(`Fill '${this.startYearLabel}'`, async () => {
      await this.startYear.fill(startYear);
    });
  }

  async fillEndYear(endYear: string) {
    await this.step(`Fill '${this.endYearLabel}'`, async () => {
      await this.endYear.fill(endYear);
    });
  }

  async fillAchievements(achievements: string) {
    await this.step(`Fill '${this.achievementsLabel}'`, async () => {
      await this.achievements.fill(achievements);
    });
  }

  async selectStartMonth(startMonth: Month) {
    await this.step(`Select '${this.startMonthLabel}'`, async () => {
      await selectOption(this.page, this.startMonth, startMonth);
    });
  }

  async selectEndMonth(endMonth: Month) {
    await this.step(`Select '${this.endMonthLabel}'`, async () => {
      await selectOption(this.page, this.endMonth, endMonth);
    });
  }

  async clickEndDate() {
    await this.step(`Click '${this.endDateName}'`, async () => {
      await this.endDate.click();
    });
  }

  async clickSave(waitForResponse: boolean, operationType?: 'Create' | 'Update') {
    await this.step(`Click '${this.saveName}'`, async () => {
      const click = () => this.save.click();

      if (!waitForResponse) {
        await click();
        return;
      }

      const operationName = operationType === 'Create' ? 'createWorkPlace' : 'updateWorkPlace';
      await graphqlWaitForResponse(this.page, operationName, click);
    });
  }
}
