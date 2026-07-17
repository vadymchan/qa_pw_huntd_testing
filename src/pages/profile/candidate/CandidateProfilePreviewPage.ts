import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../../BasePage';
import { generateSalaryString } from '../../../utils/generators/generateSalaryString';
import { SalaryType } from '../../../models/auth/candidate/SalaryType';
import { Month } from '../../../models/auth/candidate/Month';
import { Role } from '../../../models/auth/candidate/Role';
import { CoreTechnicalSkill } from '../../../models/auth/candidate/CoreTechnicalSkill';
import { EnglishLevel } from '../../../models/auth/candidate/EnglishLevel';
import { JobExperience } from '../../../models/auth/candidate/JobExperience';
import { CityName } from '../../../models/auth/candidate/CityName';

export class CandidateProfilePreviewPage extends BasePage {
  private desiredPosition: Locator;
  private location: Locator;
  private jobExperience: Locator;
  private salary: Locator;
  private englishLevel: Locator;
  private achivements: Locator;
  private coreTechnicalSkills: Locator;
  private expectations: Locator;
  private desiredRoles: Locator;
  private previousRole: Locator;
  private previousCompany: Locator;
  private previousJobDates: Locator;
  private previousJobAchivements: Locator;
  private fullName: Locator;
  private email: Locator;
  private linkedin: Locator;
  private behance: Locator;
  private gitHub: Locator;

  constructor(page: Page) {
    super(page, '/profile-preview/candidate');

    this.desiredPosition = page.locator('[class*=CandidateProfilePreviewModule_title]');

    const tagLine = page.locator('[class*=ProfileMeta_metaWrapper]').getByRole('listitem');
    this.location = tagLine.first();
    this.jobExperience = tagLine.nth(1);
    this.salary = tagLine.nth(2);
    this.englishLevel = tagLine.last();

    const section = (text: string) =>
      page.locator('[class*=ProfileInfo_item]').filter({
        has: page.locator('[class*=ProfileInfo_itemTitle]').getByText(text),
      });
    this.achivements = section('Achievements / Key results').getByRole('definition');
    this.coreTechnicalSkills = section('Core technical skills').locator(
      '[class*=ProfileInfo_tagsContainer]',
    );
    this.expectations = section('Job expectations').getByRole('definition');
    this.desiredRoles = section('Considering roles');

    const experience = page.locator('li[class*=ProfileWorkHistory_item]');
    this.previousRole = experience.locator('[class*=typography_caption]');
    this.previousCompany = experience.locator('p[class*=typography_smallText]').first();
    this.previousJobDates = experience.locator('[class*=ProfileWorkHistory_term__]').first();
    this.previousJobAchivements = experience.locator(
      '[class*=ProfileWorkHistory_descriptionField]',
    );
    this.fullName = page.locator('p[class*=typography_smallHeading]');
    this.email = page.locator('a[href^="mailto:"]');

    const link = (url: string) => page.getByRole('link', { name: url, exact: true });
    this.linkedin = link('Linkedin');
    this.behance = link('Behance');
    this.gitHub = link('Github');
  }

  async assertDesiredPositionHasText(desiredPosition: string) {
    await expect(this.desiredPosition).toHaveText(desiredPosition);
  }

  async assertLocationContainsText(yourLocation: CityName) {
    await expect(this.location).toContainText(yourLocation);
  }

  async assertJobExperienceHasText(jobExperience: JobExperience) {
    await expect(this.jobExperience).toHaveText(jobExperience);
  }

  async assertSalaryHasText(salaryType: SalaryType, desiredBaseSalary: number) {
    await expect(this.salary).toHaveText(generateSalaryString(salaryType, desiredBaseSalary));
  }

  async assertEnglishLevelHasText(englishLevel: EnglishLevel) {
    await expect(this.englishLevel).toHaveText(englishLevel);
  }

  async assertAchivementsHaveText(achivements: string) {
    await expect(this.achivements).toHaveText(achivements);
  }

  async assertCoreTechnicalSkillsHaveText(coreTechnicalSkills: Array<CoreTechnicalSkill>) {
    for (const skill of coreTechnicalSkills) {
      await expect(this.coreTechnicalSkills.getByText(skill, { exact: true })).toBeVisible();
    }
  }

  async assertExpectationsHaveText(expectations: string) {
    await expect(this.expectations).toHaveText(expectations);
  }

  async assertDesiredRolesHaveText(desiredRoles: Array<Role>) {
    for (const role of desiredRoles) {
      await expect(this.desiredRoles.getByText(role)).toBeVisible();
    }
  }

  async assertPreviousRoleHasText(previousRole: string) {
    await expect(this.previousRole).toHaveText(previousRole);
  }

  async assertPreviousCompanyHasText(previousCompany: string) {
    await expect(this.previousCompany).toHaveText(previousCompany);
  }

  async assertPreviousJobDatesHaveText(
    startMonth: Month,
    startYear: number,
    endMonth?: Month,
    endYear?: number,
  ) {
    const startPart = `${startMonth.slice(0, 3)} ${startYear}`;
    const endPart = endMonth && endYear ? `${endMonth.slice(0, 3)} ${endYear}` : 'current time';

    await expect(this.previousJobDates).toHaveText(`${startPart} - ${endPart}`);
  }

  async assertPreviousJobAchivementsHaveText(previousJobAchivements: string) {
    await expect(this.previousJobAchivements).toHaveText(previousJobAchivements);
  }

  async assertFullNameHasText(firstName: string, lastName: string) {
    await expect(this.fullName).toHaveText(`${firstName} ${lastName}`);
  }

  async assertEmailHasText(email: string) {
    await expect(this.email).toHaveText(email);
  }

  async assertLinkedinHasCorrectUrl(linkedin: string) {
    await expect(this.linkedin).toHaveAttribute('href', linkedin);
  }

  async assertBehanceHasCorrectUrl(behance: string) {
    await expect(this.behance).toHaveAttribute('href', behance);
  }

  async assertGitHubHasCorrectUrl(gitHub: string) {
    await expect(this.gitHub).toHaveAttribute('href', gitHub);
  }
}
