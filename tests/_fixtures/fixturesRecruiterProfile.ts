import { test as base } from '@playwright/test';
import { ProfileContacts } from '../../src/models/auth/ProfileContacts';
import { RecruiterProfile } from '../../src/models/auth/recruiter/RecruiterProfile';
import { RecruiterProfileContactsPage } from '../../src/pages/profile/recruiter/RecruiterProfileContactsPage';
import { RecruiterProfilePage } from '../../src/pages/profile/recruiter/RecruiterProfilePage';
import { RecruiterProfilePerfectCandidatePage } from '../../src/pages/profile/recruiter/RecruiterProfilePerfectCandidatePage';
import { RecruiterProfilePreviewPage } from '../../src/pages/profile/recruiter/RecruiterProfilePreviewPage';
import { generateRecruiterProfile } from '../../src/utils/generators/generateRecruiterProfile';
import { generateProfileContacts } from '../../src/utils/generators/generateProfileContacts';
import { generatePerfectCandidate } from '../../src/utils/generators/generatePerfectCandidate';
import { PerfectCandidate } from '../../src/models/auth/recruiter/PerfectCandidate';

type MyFixtures = {
  recruiterProfile: RecruiterProfile;
  recruiterProfileContacts: ProfileContacts;
  perfectCandidate: PerfectCandidate;
  recruiterProfileContactsPage: RecruiterProfileContactsPage;
  recruiterProfilePage: RecruiterProfilePage;
  recruiterProfilePerfectCandidatePage: RecruiterProfilePerfectCandidatePage;
  recruiterProfilePreviewPage: RecruiterProfilePreviewPage;
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
  recruiterProfileContactsPage: async ({ page }, use) => {
    await use(new RecruiterProfileContactsPage(page));
  },
  recruiterProfilePage: async ({ page }, use) => {
    await use(new RecruiterProfilePage(page));
  },
  recruiterProfilePerfectCandidatePage: async ({ page }, use) => {
    await use(new RecruiterProfilePerfectCandidatePage(page));
  },
  recruiterProfilePreviewPage: async ({ page }, use) => {
    await use(new RecruiterProfilePreviewPage(page));
  },
});
