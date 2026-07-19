import { mergeTests } from '@playwright/test';
import { test as testCandidateProfile } from './fixturesCandidateProfile';
import { test as testRecruiterProfile } from './fixturesRecruiterProfile';
import { test as testAuth } from './fixturesAuth';
import { test as testJobs } from './fixturesJobs';
import { test as testAcccount } from './fixturesAccount';

export const test = mergeTests(
  testAuth,
  testCandidateProfile,
  testRecruiterProfile,
  testJobs,
  testAcccount,
);

export { expect } from '@playwright/test';
