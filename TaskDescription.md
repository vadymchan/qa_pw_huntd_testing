# Practice task: Test automation framework for the Parabank

## Preparation:

1. Open the forked repo in VSCode.
2. Create a new branch: git checkout -b task_solution
3. Run the installation commands `npm ci` & `npx playwright install`.

## Main task:

1. Analyze the [Huntd](https://huntd.tech/) application for the required test coverage.
2. Create the test coverage for the Huntd functionality.
3. Organize your test folders in the Suite hierarhy: `parentSuite`, `suite` and `subSuite`.
4. Follow the OOP and Composition principles:

- use base classes
- use components

5. Chose Builder or Factory method pattern and use it for test data creation.
6. Use Facade and Composite pattern where applicable.
7. Create docker file to run the tests in Docker.
8. Create workflow file for executing tests in the GitHub Actions. Add jobs to run tests, generate and publish test report.
9. Optionaly: use APIs for preparing the pre-conditions. Note, that this application use GraphQL queries, but you can send them using HTTP methods same as for REST.
10. . Add the README.md "How to run the tests" & "How to generate report" sections.

## Task Reporting:

1. Add and commit all your updates.
2. Push the code to the origin.
3. Create PR for your changes.
4. Fix all the suggestions from the Code review until PR is approved.
