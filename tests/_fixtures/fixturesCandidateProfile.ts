import { test as base } from '@playwright/test';
import { CandidateProfile } from '../../src/models/auth/candidate/CandidateProfile';
import { WorkPlace } from '../../src/models/auth/candidate/WorkPlace';
import { ProfileContacts } from '../../src/models/auth/ProfileContacts';
import { CandidateProfileBioPage } from '../../src/pages/profile/candidate/CandidateProfileBioPage';
import { CandidateProfileContactsPage } from '../../src/pages/profile/candidate/CandidateProfileContactsPage';
import { CandidateProfileExperiencePage } from '../../src/pages/profile/candidate/CandidateProfileExperiencePage';
import { CandidateProfileFeedbackPage } from '../../src/pages/profile/candidate/CandidateProfileFeedbackPage';
import { CandidateProfileJobExpectationsPage } from '../../src/pages/profile/candidate/CandidateProfileJobExpectationsPage';
import { CandidateProfilePage } from '../../src/pages/profile/candidate/CandidateProfilePage';
import { CandidateProfilePreviewPage } from '../../src/pages/profile/candidate/CandidateProfilePreviewPage';
import { generateCandidateProfile } from '../../src/utils/generators/generateCandidateProfile';
import { generateWorkPlace } from '../../src/utils/generators/generateWorkPlace';
import { generateProfileContacts } from '../../src/utils/generators/generateProfileContacts';

type MyFixtures = {
  candidateProfile: CandidateProfile;
  workPlace: WorkPlace;
  candidateProfileContacts: ProfileContacts;
  candidateProfileBioPage: CandidateProfileBioPage;
  candidateProfileContactsPage: CandidateProfileContactsPage;
  candidateProfileExperiencePage: CandidateProfileExperiencePage;
  candidateProfileFeedbackPage: CandidateProfileFeedbackPage;
  candidateProfileJobExpectationsPage: CandidateProfileJobExpectationsPage;
  candidateProfilePage: CandidateProfilePage;
  candidateProfilePreviewPage: CandidateProfilePreviewPage;
};

export const test = base.extend<MyFixtures>({
  candidateProfile: async ({}, use) => {
    const candidateProfile = generateCandidateProfile();
    await use(candidateProfile);
  },
  workPlace: async ({}, use) => {
    const workPlace = generateWorkPlace();
    await use(workPlace);
  },
  candidateProfileContacts: async ({}, use) => {
    const candidateProfileContacts = generateProfileContacts();
    await use(candidateProfileContacts);
  },
  candidateProfileBioPage: async ({ page }, use) => {
    await use(new CandidateProfileBioPage(page));
  },
  candidateProfileContactsPage: async ({ page }, use) => {
    await use(new CandidateProfileContactsPage(page));
  },
  candidateProfileExperiencePage: async ({ page }, use) => {
    await use(new CandidateProfileExperiencePage(page));
  },
  candidateProfileFeedbackPage: async ({ page }, use) => {
    await use(new CandidateProfileFeedbackPage(page));
  },
  candidateProfileJobExpectationsPage: async ({ page }, use) => {
    await use(new CandidateProfileJobExpectationsPage(page));
  },
  candidateProfilePage: async ({ page }, use) => {
    await use(new CandidateProfilePage(page));
  },
  candidateProfilePreviewPage: async ({ page }, use) => {
    await use(new CandidateProfilePreviewPage(page));
  },
});
