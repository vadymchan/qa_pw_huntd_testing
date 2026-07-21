import { test as base } from '@playwright/test';
import { ProfileContacts } from '../../src/common/models/auth/ProfileContacts';
import { RecruiterProfile } from '../../src/common/models/auth/recruiter/RecruiterProfile';
import { PerfectCandidate } from '../../src/common/models/auth/recruiter/PerfectCandidate';
import { CreateRecruiterProfileContactsPage } from '../../src/ui/pages/profile/recruiter/create/CreateRecruiterProfileContactsPage';
import { CreateRecruiterProfilePage } from '../../src/ui/pages/profile/recruiter/create/CreateRecruiterProfilePage';
import { CreateRecruiterProfilePerfectCandidatePage } from '../../src/ui/pages/profile/recruiter/create/CreateRecruiterProfilePerfectCandidatePage';
import { RecruiterProfilePreviewPage } from '../../src/ui/pages/profile/recruiter/RecruiterProfilePreviewPage';
import { EditRecruiterProfileContactsPage } from '../../src/ui/pages/profile/recruiter/edit/EditRecruiterProfileContactsPage';
import { EditRecruiterProfilePage } from '../../src/ui/pages/profile/recruiter/edit/EditRecruiterProfilePage';
import { createRecruiterProfile } from '../../src/common/factories/createRecruiterProfile';
import { createProfileContacts } from '../../src/common/factories/createProfileContacts';
import { createPerfectCandidate } from '../../src/common/factories/createPerfectCandidate';

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
    const recruiterProfile = createRecruiterProfile();
    await use(recruiterProfile);
  },
  recruiterProfileContacts: async ({}, use) => {
    // TODO: make parameterized with Builder (instead of generator)
    const recruiterProfileContacts = createProfileContacts();
    await use(recruiterProfileContacts);
  },
  perfectCandidate: async ({}, use) => {
    const perfectCandidate = createPerfectCandidate();
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
