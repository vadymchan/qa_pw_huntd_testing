import { test as base } from '@playwright/test';
import { CandidateProfile } from '../../src/common/models/auth/candidate/CandidateProfile';
import { WorkPlace } from '../../src/common/models/auth/candidate/WorkPlace';
import { ProfileContacts } from '../../src/common/models/auth/ProfileContacts';
import { CreateCandidateProfileBioPage } from '../../src/ui/pages/profile/candidate/create/CreateCandidateProfileBioPage';
import { CreateCandidateProfileContactsPage } from '../../src/ui/pages/profile/candidate/create/CreateCandidateProfileContactsPage';
import { CreateCandidateProfileExperiencePage } from '../../src/ui/pages/profile/candidate/create/CreateCandidateProfileExperiencePage';
import { CreateCandidateProfileJobExpectationsPage } from '../../src/ui/pages/profile/candidate/create/CreateCandidateProfileJobExpectationsPage';
import { CreateCandidateProfilePage } from '../../src/ui/pages/profile/candidate/create/CreateCandidateProfilePage';
import { EditCandidateProfilePage } from '../../src/ui/pages/profile/candidate/edit/EditCandidateProfilePage';
import { EditCandidateProfileBioPage } from '../../src/ui/pages/profile/candidate/edit/EditCandidateProfileBioPage';
import { EditCandidateProfileContactsPage } from '../../src/ui/pages/profile/candidate/edit/EditCandidateProfileContactsPage';
import { EditCandidateProfileExperiencePage } from '../../src/ui/pages/profile/candidate/edit/EditCandidateProfileExperiencePage';
import { EditCandidateProfileJobExpectationsPage } from '../../src/ui/pages/profile/candidate/edit/EditCandidateProfileJobExpectationsPage';
import { CandidateProfileFeedbackPage } from '../../src/ui/pages/profile/candidate/CandidateProfileFeedbackPage';
import { CandidateProfilePreviewPage } from '../../src/ui/pages/profile/candidate/CandidateProfilePreviewPage';
import { createCandidateProfile } from '../../src/common/factories/createCandidateProfile';
import { createWorkPlace } from '../../src/common/factories/createWorkPlace';
import { createProfileContacts } from '../../src/common/factories/createProfileContacts';

type MyFixtures = {
  candidateProfile: CandidateProfile;
  workPlace: WorkPlace;
  candidateProfileContacts: ProfileContacts;
  createCandidateProfileBioPage: CreateCandidateProfileBioPage;
  createCandidateProfileContactsPage: CreateCandidateProfileContactsPage;
  createCandidateProfileExperiencePage: CreateCandidateProfileExperiencePage;
  createCandidateProfileJobExpectationsPage: CreateCandidateProfileJobExpectationsPage;
  createCandidateProfilePage: CreateCandidateProfilePage;
  editCandidateProfileBioPage: EditCandidateProfileBioPage;
  editCandidateProfileContactsPage: EditCandidateProfileContactsPage;
  editCandidateProfileExperiencePage: EditCandidateProfileExperiencePage;
  editCandidateProfileJobExpectationsPage: EditCandidateProfileJobExpectationsPage;
  editCandidateProfilePage: EditCandidateProfilePage;
  candidateProfileFeedbackPage: CandidateProfileFeedbackPage;
  candidateProfilePreviewPage: CandidateProfilePreviewPage;
};

export const test = base.extend<MyFixtures>({
  candidateProfile: async ({}, use) => {
    const candidateProfile = createCandidateProfile();
    await use(candidateProfile);
  },
  workPlace: async ({}, use) => {
    const workPlace = createWorkPlace();
    await use(workPlace);
  },
  candidateProfileContacts: async ({}, use) => {
    const candidateProfileContacts = createProfileContacts();
    await use(candidateProfileContacts);
  },
  createCandidateProfileBioPage: async ({ page }, use) => {
    await use(new CreateCandidateProfileBioPage(page));
  },
  createCandidateProfileContactsPage: async ({ page }, use) => {
    await use(new CreateCandidateProfileContactsPage(page));
  },
  createCandidateProfileExperiencePage: async ({ page }, use) => {
    await use(new CreateCandidateProfileExperiencePage(page));
  },
  createCandidateProfileJobExpectationsPage: async ({ page }, use) => {
    await use(new CreateCandidateProfileJobExpectationsPage(page));
  },
  createCandidateProfilePage: async ({ page }, use) => {
    await use(new CreateCandidateProfilePage(page));
  },
  editCandidateProfileBioPage: async ({ page }, use) => {
    await use(new EditCandidateProfileBioPage(page));
  },
  editCandidateProfileContactsPage: async ({ page }, use) => {
    await use(new EditCandidateProfileContactsPage(page));
  },
  editCandidateProfileExperiencePage: async ({ page }, use) => {
    await use(new EditCandidateProfileExperiencePage(page));
  },
  editCandidateProfileJobExpectationsPage: async ({ page }, use) => {
    await use(new EditCandidateProfileJobExpectationsPage(page));
  },
  editCandidateProfilePage: async ({ page }, use) => {
    await use(new EditCandidateProfilePage(page));
  },
  candidateProfileFeedbackPage: async ({ page }, use) => {
    await use(new CandidateProfileFeedbackPage(page));
  },
  candidateProfilePreviewPage: async ({ page }, use) => {
    await use(new CandidateProfilePreviewPage(page));
  },
});
