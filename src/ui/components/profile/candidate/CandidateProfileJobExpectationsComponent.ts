import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '@ui/components/BaseComponent';
import { selectOption } from '@utils/playwright/selectOption';
import { SalaryType } from '@models/auth/candidate/SalaryType';
import { EnglishLevel } from '@models/auth/candidate/EnglishLevel';
import { JobExperience } from '@models/auth/candidate/JobExperience';
import { CityName } from '@models/auth/candidate/CityName';

export class CandidateProfileJobExpectationsComponent extends BaseComponent {
  private desiredBaseSalary: Locator;
  private jobExperience: Locator;
  private englishLevel: Locator;
  private yourLocation: Locator;
  private desiredBaseSalaryLabel: string;
  private jobExperienceLabel: string;
  private englishLevelLabel: string;
  private yourLocationLabel: string;

  constructor(page: Page) {
    super(page);

    this.desiredBaseSalaryLabel = 'Desired base salary, $';
    this.jobExperienceLabel = 'Job experience';
    this.englishLevelLabel = 'English level';
    this.yourLocationLabel = 'Your Location';

    this.desiredBaseSalary = page.getByLabel(this.desiredBaseSalaryLabel, { exact: false });
    this.jobExperience = page.getByLabel(this.jobExperienceLabel);
    this.englishLevel = page.getByLabel(this.englishLevelLabel);
    this.yourLocation = page.getByLabel(this.yourLocationLabel);
  }

  async fillDesiredBaseSalary(desiredBaseSalary: string) {
    await this.step(`Fill '${this.desiredBaseSalaryLabel}'`, async () => {
      await this.desiredBaseSalary.pressSequentially(desiredBaseSalary);
    });
  }

  async clearDesiredBaseSalary() {
    await this.step(`Clear '${this.desiredBaseSalaryLabel}'`, async () => {
      await this.desiredBaseSalary.focus();
      await this.page.keyboard.press('Control+A');
      await this.page.keyboard.press('Delete');
    });
  }

  async selectJobExperience(jobExperience: JobExperience) {
    await this.step(`Select '${this.jobExperienceLabel}'`, async () => {
      await selectOption(this.page, this.jobExperience, jobExperience);
    });
  }

  async selectEnglishLevel(englishLevel: EnglishLevel) {
    await this.step(`Select '${this.englishLevelLabel}'`, async () => {
      await selectOption(this.page, this.englishLevel, englishLevel);
    });
  }

  async selectYourLocation(yourLocation: CityName) {
    await this.step(`Select '${this.yourLocationLabel}'`, async () => {
      const responsePromise = this.page.waitForResponse((r) => r.url().includes('GetPlaceDetails'));
      await this.yourLocation.fill(yourLocation);
      await this.page.locator('.pac-item').first().click();
      await responsePromise;
    });
  }

  private salaryType(salaryType: SalaryType) {
    return this.page.getByRole('button', { name: salaryType, exact: true });
  }

  async clickSalaryType(salaryType: SalaryType) {
    await this.step(`Click 'Salary Type'`, async () => {
      await this.salaryType(salaryType).click();
    });
  }
}
