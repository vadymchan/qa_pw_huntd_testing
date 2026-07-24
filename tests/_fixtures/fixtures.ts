import { mergeTests } from '@playwright/test';
import { test as testGeneric } from '@fixtures/fixturesGeneric';
import { test as testAuth } from '@fixtures/fixturesAuth';
import { test as testCandidateProfile } from '@fixtures/fixturesCandidateProfile';
import { test as testRecruiterProfile } from '@fixtures/fixturesRecruiterProfile';
import { test as testJobs } from '@fixtures/fixturesJobs';
import { test as testAcccount } from '@fixtures/fixturesAccount';

export const test = mergeTests(
  testGeneric,
  testAuth,
  testCandidateProfile,
  testRecruiterProfile,
  testJobs,
  testAcccount,
);

export { expect } from '@playwright/test';
