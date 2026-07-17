import { mergeTests } from '@playwright/test';
import { test as testCandidateProfile } from './fixturesCandidateProfile';
import { test as testRecruiterProfile } from './fixturesRecruiterProfile';
import { test as testAuth } from './fixturesAuth';

export const test = mergeTests(testCandidateProfile, testRecruiterProfile, testAuth);

export { expect } from '@playwright/test';
