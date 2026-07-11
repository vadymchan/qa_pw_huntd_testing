import { mergeTests } from '@playwright/test';
import { test as testAuth } from './fixturesAuth';

export const test = mergeTests(testAuth);
