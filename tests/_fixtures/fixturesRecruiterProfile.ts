import { test as base } from '@playwright/test';
import { ProfileContacts } from '../../src/models/auth/ProfileContacts';
import { RecruiterProfile } from '../../src/models/auth/recruiter/RecruiterProfile';
import { PerfectCandidate } from '../../src/models/auth/recruiter/PerfectCandidate';
import { CreateRecruiterProfileContactsPage } from '../../src/ui/pages/profile/recruiter/create/CreateRecruiterProfileContactsPage';
import { CreateRecruiterProfilePage } from '../../src/ui/pages/profile/recruiter/create/CreateRecruiterProfilePage';
import { CreateRecruiterProfilePerfectCandidatePage } from '../../src/ui/pages/profile/recruiter/create/CreateRecruiterProfilePerfectCandidatePage';
import { RecruiterProfilePreviewPage } from '../../src/ui/pages/profile/recruiter/RecruiterProfilePreviewPage';
import { EditRecruiterProfileContactsPage } from '../../src/ui/pages/profile/recruiter/edit/EditRecruiterProfileContactsPage';
import { EditRecruiterProfilePage } from '../../src/ui/pages/profile/recruiter/edit/EditRecruiterProfilePage';
import { generateRecruiterProfile } from '../../src/utils/generators/generateRecruiterProfile';
import { generateProfileContacts } from '../../src/utils/generators/generateProfileContacts';
import { generatePerfectCandidate } from '../../src/utils/generators/generatePerfectCandidate';

type MyFixtures = {
  recruiterProfile: RecruiterProfile;
  recruiterProfileContacts: ProfileContacts;
  perfectCandidate: PerfectCandidate;
  createRecruiterProfileContactsPage: CreateRecruiterProfileContactsPage;
  createRecruiterProfilePage: CreateRecruiterProfilePage;
  createRecruiterProfilePerfectCandidatePage: CreateRecruiterProfilePerfectCandidatePage;
  recruiterProfilePreviewPage: RecruiterProfilePreviewPage;
  editRecruiterProfileContactsPage: EditRecruiterProfileContactsPage;
  editRecruiterProfilePage: EditRecruiterProfilePage;
};

export const test = base.extend<MyFixtures>({
  recruiterProfile: async ({}, use) => {
    const recruiterProfile = generateRecruiterProfile();
    await use(recruiterProfile);
  },
  recruiterProfileContacts: async ({}, use) => {
    // TODO: make parameterized with Builder (instead of generator)
    const recruiterProfileContacts = generateProfileContacts();
    await use(recruiterProfileContacts);
  },
  perfectCandidate: async ({}, use) => {
    const perfectCandidate = generatePerfectCandidate();
    await use(perfectCandidate);
  },
  createRecruiterProfileContactsPage: async ({ page }, use) => {
    await use(new CreateRecruiterProfileContactsPage(page));
  },
  createRecruiterProfilePage: async ({ page }, use) => {
    await use(new CreateRecruiterProfilePage(page));
  },
  createRecruiterProfilePerfectCandidatePage: async ({ page }, use) => {
    await use(new CreateRecruiterProfilePerfectCandidatePage(page));
  },
  recruiterProfilePreviewPage: async ({ page }, use) => {
    await use(new RecruiterProfilePreviewPage(page));
  },
  editRecruiterProfileContactsPage: async ({ page }, use) => {
    await use(new EditRecruiterProfileContactsPage(page));
  },
  editRecruiterProfilePage: async ({ page }, use) => {
    await use(new EditRecruiterProfilePage(page));
  },
});
