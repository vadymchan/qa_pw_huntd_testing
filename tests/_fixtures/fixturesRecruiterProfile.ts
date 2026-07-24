import { test as base } from '@playwright/test';
import { ProfileContacts } from '@models/auth/ProfileContacts';
import { RecruiterProfile } from '@models/auth/recruiter/RecruiterProfile';
import { PerfectCandidate } from '@models/auth/recruiter/PerfectCandidate';
import { CreateRecruiterProfileContactsPage } from '@ui/pages/profile/recruiter/create/CreateRecruiterProfileContactsPage';
import { CreateRecruiterProfilePage } from '@ui/pages/profile/recruiter/create/CreateRecruiterProfilePage';
import { CreateRecruiterProfilePerfectCandidatePage } from '@ui/pages/profile/recruiter/create/CreateRecruiterProfilePerfectCandidatePage';
import { RecruiterProfilePreviewPage } from '@ui/pages/profile/recruiter/RecruiterProfilePreviewPage';
import { EditRecruiterProfileContactsPage } from '@ui/pages/profile/recruiter/edit/EditRecruiterProfileContactsPage';
import { EditRecruiterProfilePage } from '@ui/pages/profile/recruiter/edit/EditRecruiterProfilePage';
import { createRecruiterProfile } from '@factories/createRecruiterProfile';
import { createProfileContacts } from '@factories/createProfileContacts';
import { createPerfectCandidate } from '@factories/createPerfectCandidate';

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
    const recruiterProfileContacts = createProfileContacts({
      behanceUrl: undefined,
      githubUrl: undefined,
    });
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
