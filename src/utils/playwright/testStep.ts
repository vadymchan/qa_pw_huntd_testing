import { test } from '@playwright/test';

export async function testStep(testTitle: string, stepToRun) {
  return await test.step(testTitle, stepToRun);
}
