import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../../../BasePage';
import { selectOption } from '../../../../../utils/playwright/selectOption';
import { PATHS } from '../../../../constants/paths';
import { PerfectCandidateTechnology } from '../../../../../common/models/auth/recruiter/PerfectCandidateTechnology';
import { PerfectCandidateRole } from '../../../../../common/models/auth/recruiter/PerfectCandidateRole';
import { PerfectCandidateJobExperience } from '../../../../../common/models/auth/recruiter/PerfectCandidateJobExperience';
import { PerfectCandidateEnglishLevel } from '../../../../../common/models/auth/recruiter/PerfectCandidateEnglishLevel';

export class CreateRecruiterProfilePerfectCandidatePage extends BasePage {
  private roles: Locator;
  private technologies: Locator;
  private jobExperience: Locator;
  private englishLevel: Locator;
  private next: Locator;
  private templateMessage: Locator;
  private send: Locator;
  private rolesLabel: string;
  private technologiesLabel: string;
  private jobExperienceLabel: string;
  private englishLevelLabel: string;
  private nextName: string;
  private templateMessageLabel: string;
  private sendName: string;

  constructor(page: Page) {
    super(page, PATHS.profile.recruiter.perfectCandidate);

    this.rolesLabel = 'Role';
    this.technologiesLabel = 'Technologies';
    this.jobExperienceLabel = 'Job experience';
    this.englishLevelLabel = 'English level';
    this.nextName = 'Next';
    this.templateMessageLabel = 'Template message';
    this.sendName = 'Send';

    this.roles = page.getByLabel(this.rolesLabel);
    this.technologies = page.getByLabel(this.technologiesLabel);
    this.jobExperience = page.getByLabel(this.jobExperienceLabel);
    this.englishLevel = page.getByLabel(this.englishLevelLabel);
    this.next = page.getByRole('button', { name: this.nextName });
    this.templateMessage = page.locator('#messageBody');
    this.send = page.getByRole('button', { name: this.sendName });
  }

  async fillTemplateMessage(templateMessage: string) {
    await this.step(`Fill '${this.templateMessageLabel}'`, async () => {
      await this.templateMessage.fill(templateMessage);
    });
  }

  async selectRoles(roles: Array<PerfectCandidateRole>) {
    await this.step(`Select '${this.rolesLabel}'`, async () => {
      for (const role of roles) {
        await selectOption(this.page, this.roles, role);
      }
    });
  }

  async selectTechnologies(technologies: Array<PerfectCandidateTechnology>) {
    await this.step(`Select '${this.technologiesLabel}'`, async () => {
      for (const technology of technologies) {
        await this.technologies.fill(technology);
        await this.page
          .locator('.select__option')
          .filter({ hasText: new RegExp(`^${technology}$`) })
          .click();
      }
      await this.technologies.blur();
    });
  }

  async selectJobExperience(jobExperience: PerfectCandidateJobExperience) {
    await this.step(`Select '${this.jobExperience}'`, async () => {
      await selectOption(this.page, this.jobExperience, jobExperience);
    });
  }

  async selectEnglishLevel(englishLevel: PerfectCandidateEnglishLevel) {
    await this.step(`Select '${this.englishLevelLabel}'`, async () => {
      await selectOption(this.page, this.englishLevel, englishLevel);
    });
  }

  async clickNext() {
    await this.step(`Click '${this.nextName}'`, async () => {
      await this.next.click();
    });
  }

  async clickSend() {
    await this.step(`Click '${this.sendName}'`, async () => {
      await this.send.click();
      // TODO: consider move to separate place (might be violation of SRP)
      // Sending messages to candidates (bulkSendMessage) takes some time, especially under heavy load
      await expect(this.page).toHaveURL('/chats', { timeout: 20_000 });
    });
  }
}
