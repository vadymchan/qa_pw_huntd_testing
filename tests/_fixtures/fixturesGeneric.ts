import { test as base } from '@playwright/test';
import { Reporter } from '../../src/common/reporter';
import { parseTestFilePath } from '../../src/utils/playwright/parseTestFilePath';

type MyTestFixtures = {
  addSuiteHierarchy: void;
};

type MyWorkerFixtures = {
  reporter: Reporter;
};

export const test = base.extend<MyTestFixtures, MyWorkerFixtures>({
  reporter: [
    async ({}, use) => {
      const reporter = new Reporter();
      await use(reporter);
    },
    { scope: 'worker' },
  ],
  addSuiteHierarchy: [
    async ({ reporter }, use, testInfo) => {
      const filePath = testInfo.file;

      const [parentSuite, suite, subSuite] = parseTestFilePath(filePath);

      if (parentSuite) await reporter.parentSuite(parentSuite);
      if (suite) await reporter.suite(suite);
      if (subSuite) await reporter.subSuite(subSuite);

      await use();
    },
    { scope: 'test', auto: true },
  ],
});
