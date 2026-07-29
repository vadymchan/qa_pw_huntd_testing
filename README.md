# Huntd E2E Test Framework

An end-to-end test framework for the [Huntd](https://huntd.tech/) job board, built with Playwright and TypeScript. 85 tests covering guest browsing, candidate and recruiter onboarding, and profile editing; run locally, in Docker, or in CI.

[![E2E tests](https://github.com/vadymchan/huntd_e2e_framework/actions/workflows/e2e.yml/badge.svg)](https://github.com/vadymchan/huntd_e2e_framework/actions/workflows/e2e.yml)

Live Allure report: https://vadymchan.github.io/huntd_e2e_framework/

## Bugs found

Three real defects in the live product, each written up in [docs/bugs](docs/bugs) with repro videos.

- Invisible tooltip intercepts clicks on a required onboarding field, so the option can't be selected. Located with `document.elementFromPoint`, confirmed by disabling `pointer-events` in DevTools. ([BUG-001](docs/bugs/BUG-001-core-technical-skills-select-option-is-not-clickable.md))
- Recruiter onboarding redirects to the wrong route under concurrent load and loses progress: ~20% of runs at 8 workers, none at 1-2. ([BUG-002](docs/bugs/BUG-002-recruiter-onboarding-redirects-to-candidates-under-load.md))
- Profile preference persists location data the UI then hides, leaving it unmanageable. Found by exploratory testing. ([BUG-003](docs/bugs/BUG-003-office-checkbox-is-not-checked-when-clicked-one-time.md))

## Reliability

Register suite failed under parallel runs: 31/50 at 16 workers. Three separate causes, not one: a navigation race, assertion timeouts sized for a backend slower under load, and a server capacity ceiling. Fixed each; `workers=2` documented as the stable default.

Read-only tests moved to a shared auth setup instead of creating a user per test: 25/85 failures -> all green, runtime ~4x faster from the lower signup load.

The first candidate test went from intermittent to 5/5 on `--repeat-each=5` with no `waitForTimeout`, after fixing three root causes (ambiguous locator, the BUG-001 overlay, a third-party autocomplete race).

## Architecture

- POM with components: pages in `src/ui/pages`, shared fragments in `src/ui/components` under a common base.
- Preconditions seeded through the GraphQL API (`src/api/seeders`), not the UI -> faster, isolated tests.
- Test data from object-mother factories with typed overrides (`src/common/factories`).
- Page objects, API clients and data composed with merged Playwright fixtures.
- Allure with a parentSuite/suite/subSuite hierarchy.

Scope and out-of-scope decisions: [docs/test-coverage.md](docs/test-coverage.md).

Stack: Playwright, TypeScript, Allure, Docker, GitHub Actions, ESLint, Prettier, husky with lint-staged, Faker.

## Getting started

Node.js and Java 8+ (Allure) required.

```bash
npm ci
npx playwright install
```

Run locally:

```bash
npm test
```

In Docker:

```bash
docker compose run --rm e2e
```

CI runs the suite on every push and pull request; also triggerable manually from the Actions tab.

## Report

Build and open the Allure report locally:

```bash
npm run report:open
```

Latest CI report: https://vadymchan.github.io/huntd_e2e_framework/
