import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../../BasePage';
import { generateSalaryString } from '../../../../utils/generators/generateSalaryString';
import { SalaryType } from '../../../../models/auth/candidate/SalaryType';
import { Month } from '../../../../models/auth/candidate/Month';
import { Role } from '../../../../models/auth/candidate/Role';
import { CoreTechnicalSkill } from '../../../../models/auth/candidate/CoreTechnicalSkill';
import { EnglishLevel } from '../../../../models/auth/candidate/EnglishLevel';
import { JobExperience } from '../../../../models/auth/candidate/JobExperience';
import { CityName } from '../../../../models/auth/candidate/CityName';
import { PATHS } from '../../../constants/paths';

export class CandidateProfilePreviewPage extends BasePage {
  private desiredPosition: Locator;
  private location: Locator;
  private jobExperience: Locator;
  private salary: Locator;
  private englishLevel: Locator;
  private achievements: Locator;
  private coreTechnicalSkills: Locator;
  private expectations: Locator;
  private desiredRoles: Locator;
  private experience: Locator;
  private previousRole: Locator;
  private previousCompany: Locator;
  private previousJobDates: Locator;
  private previousJobAchievements: Locator;
  private fullName: Locator;
  private email: Locator;
  private linkedin: Locator;
  private behance: Locator;
  private gitHub: Locator;

  constructor(page: Page) {
    super(page, PATHS.profile.candidate.preview);

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
    this.achievements = section('Achievements / Key results').getByRole('definition');
    this.coreTechnicalSkills = section('Core technical skills').locator(
      '[class*=ProfileInfo_tagsContainer]',
    );
    this.expectations = section('Job expectations').getByRole('definition');
    this.desiredRoles = section('Considering roles');

    this.experience = page.locator('li[class*=ProfileWorkHistory_item]');
    this.previousRole = this.experience.locator('[class*=typography_caption]').first();
    this.previousCompany = this.experience.locator('p[class*=typography_smallText]').first();
    this.previousJobDates = this.experience.locator('[class*=ProfileWorkHistory_term__]').first();
    this.previousJobAchievements = this.experience
      .locator('[class*=ProfileWorkHistory_descriptionField]')
      .first();
    this.fullName = page.locator('p[class*=typography_smallHeading]');
    this.email = page.locator('a[href^="mailto:"]');

    const link = (url: string) => page.getByRole('link', { name: url, exact: true });
    this.linkedin = link('Linkedin');
    this.behance = link('Behance');
    this.gitHub = link('Github');
  }

  async assertDesiredPositionHasText(desiredPosition: string) {
    await this.step(`Assert 'Desired position' has '${desiredPosition}' text`, async () => {
      await expect(this.desiredPosition).toHaveText(desiredPosition);
    });
  }

  async assertLocationContainsText(yourLocation: CityName) {
    await this.step(`Assert 'Location' has '${yourLocation}' text`, async () => {
      await expect(this.location).toContainText(yourLocation);
    });
  }

  async assertJobExperienceHasText(jobExperience: JobExperience) {
    await this.step(`Assert 'Job experience' has '${jobExperience}' text`, async () => {
      await expect(this.jobExperience).toHaveText(jobExperience);
    });
  }

  async assertSalaryHasText(salaryType: SalaryType, desiredBaseSalary: number) {
    const salary = generateSalaryString(salaryType, desiredBaseSalary);
    await this.step(`Assert 'Salary type' has '${salary}' text`, async () => {
      await expect(this.salary).toHaveText(salary);
    });
  }

  async assertEnglishLevelHasText(englishLevel: EnglishLevel) {
    await this.step(`Assert 'English level' has '${englishLevel}' text`, async () => {
      await expect(this.englishLevel).toHaveText(englishLevel);
    });
  }

  async assertAchievementsHaveText(achievements: string) {
    await this.step(`Assert 'Achievements' has '${achievements}' text`, async () => {
      await expect(this.achievements).toHaveText(achievements);
    });
  }

  async assertCoreTechnicalSkillsHaveText(coreTechnicalSkills: Array<CoreTechnicalSkill>) {
    await this.step(
      `Assert 'Core technical skills' has '${coreTechnicalSkills}' elements`,
      async () => {
        for (const skill of coreTechnicalSkills) {
          await expect(this.coreTechnicalSkills.getByText(skill, { exact: true })).toBeVisible();
        }
      },
    );
  }

  async assertExpectationsHaveText(expectations: string) {
    await this.step(`Assert 'Expectations' has '${expectations}' text`, async () => {
      await expect(this.expectations).toHaveText(expectations);
    });
  }

  async assertDesiredRolesHaveText(desiredRoles: Array<Role>) {
    await this.step(`Assert 'Desired roles' has '${desiredRoles}' elements`, async () => {
      for (const role of desiredRoles) {
        await expect(this.desiredRoles.getByText(role)).toBeVisible();
      }
    });
  }

  async assertNoWorkExperienceIsVisible() {
    await this.step(`Assert no 'Work Experience' is visible`, async () => {
      await expect(this.experience).toBeHidden();
    });
  }

  async assertPreviousRoleHasText(previousRole: string) {
    await this.step(`Assert 'Previous role' has '${previousRole}' text`, async () => {
      await expect(this.previousRole).toHaveText(previousRole);
    });
  }

  async assertPreviousCompanyHasText(previousCompany: string) {
    await this.step(`Assert 'Previous company' has '${previousCompany}' text`, async () => {
      await expect(this.previousCompany).toHaveText(previousCompany);
    });
  }

  async assertPreviousJobDatesHaveText(
    startMonth: Month,
    startYear: number,
    endMonth?: Month,
    endYear?: number,
  ) {
    const startPart = `${startMonth.slice(0, 3)} ${startYear}`;
    const endPart = endMonth && endYear ? `${endMonth.slice(0, 3)} ${endYear}` : 'current time';
    const jobDates = `${startPart} - ${endPart}`;
    await this.step(`Assert 'Previous job dates' has '${jobDates}' text`, async () => {
      await expect(this.previousJobDates).toHaveText(jobDates);
    });
  }

  async assertPreviousJobAchievementsHaveText(previousJobAchievements: string) {
    await this.step(
      `Assert 'Previous job achievements' has '${previousJobAchievements}' text`,
      async () => {
        await expect(this.previousJobAchievements).toHaveText(previousJobAchievements);
      },
    );
  }

  async assertFullNameHasText(firstName: string, lastName: string) {
    const fullName = `${firstName} ${lastName}`;
    await this.step(`Assert 'Full name' has '${fullName}' text`, async () => {
      await expect(this.fullName).toHaveText(fullName);
    });
  }

  async assertEmailHasText(email: string) {
    await this.step(`Assert 'Email' has '${email}' text`, async () => {
      await expect(this.email).toHaveText(email);
    });
  }

  async assertLinkedinHasCorrectUrl(linkedin: string) {
    await this.step(`Assert 'Linkedin' has '${linkedin}' text`, async () => {
      await expect(this.linkedin).toHaveAttribute('href', linkedin);
    });
  }

  async assertBehanceHasCorrectUrl(behance: string) {
    await this.step(`Assert 'Behance' has '${behance}' text`, async () => {
      await expect(this.behance).toHaveAttribute('href', behance);
    });
  }

  async assertGitHubHasCorrectUrl(gitHub: string) {
    await this.step(`Assert 'GitHub' has '${gitHub}' text`, async () => {
      await expect(this.gitHub).toHaveAttribute('href', gitHub);
    });
  }
}
