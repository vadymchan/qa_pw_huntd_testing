import * as allure from 'allure-js-commons';

// Wrapper around allure
export class Reporter {
  async parentSuite(name: string) {
    await allure.parentSuite(name);
  }

  async suite(name: string) {
    await allure.suite(name);
  }

  async subSuite(name: string) {
    await allure.subSuite(name);
  }

  async severity(name: string) {
    await allure.severity(name);
  }
}
