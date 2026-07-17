import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../BasePage';
import { selectOption } from '../../../utils/playwright/selectOption';
import { SalaryType } from '../../../models/auth/candidate/SalaryType';
import { EnglishLevel } from '../../../models/auth/candidate/EnglishLevel';
import { JobExperience } from '../../../models/auth/candidate/JobExperience';
import { CityName } from '../../../models/auth/candidate/CityName';

export class CandidateProfileJobExpectationsPage extends BasePage {
  private desiredBaseSalary: Locator;
  private jobExperience: Locator;
  private englishLevel: Locator;
  private yourLocation: Locator;
  private saveAndContinue: Locator;

  constructor(page: Page) {
    super(page, '/profile/candidate/job-expectations');

    this.desiredBaseSalary = page.getByLabel('Desired base salary, $', { exact: false });
    this.jobExperience = page.getByLabel('Job experience');
    this.englishLevel = page.getByLabel('English level');
    this.yourLocation = page.getByLabel('Your Location');
    this.saveAndContinue = page.getByRole('button', { name: 'Save and continue' });
  }

  async fillDesiredBaseSalary(desiredBaseSalary: string) {
    await this.desiredBaseSalary.pressSequentially(desiredBaseSalary);
  }

  async selectJobExperience(jobExperience: JobExperience) {
    await selectOption(this.page, this.jobExperience, jobExperience);
  }

  async selectEnglishLevel(englishLevel: EnglishLevel) {
    await selectOption(this.page, this.englishLevel, englishLevel);
  }

  async selectYourLocation(yourLocation: CityName) {
    const responsePromise = this.page.waitForResponse((r) => r.url().includes('GetPlaceDetails'));
    await this.yourLocation.fill(yourLocation);
    await this.page.locator('.pac-item').first().click();
    await responsePromise;
  }

  private salaryType(salaryType: SalaryType) {
    return this.page.getByRole('button', { name: salaryType, exact: true });
  }

  async clickSalaryType(salaryType: SalaryType) {
    await this.salaryType(salaryType).click();
  }

  async clickSaveAndContinue() {
    await this.saveAndContinue.click();
  }
}
