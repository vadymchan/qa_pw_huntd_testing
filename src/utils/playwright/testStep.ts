import { test } from '@playwright/test';

export async function testStep<T>(testTitle: string, stepToRun: () => Promise<T> | T): Promise<T> {
  return await test.step(testTitle, stepToRun);
}
