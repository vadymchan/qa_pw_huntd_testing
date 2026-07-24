## 2026-07-19 - Increased test suite speed by 4 times while keeping the tests stable

- What: reducing the number of workers slows down test runs; using auto set workers caused flakiness because of server load
- Numbers: 25/85 failed on default config; tests 4 times faster on auto set workers (compared to previous fix of 2 workers)
- How: remove user creation for read-only tests by adding setup auth stage and reusing session - server is less loaded
- Artifacts: https://playwright.dev/docs/auth; tests/auth.setup.ts

## 2026-07-15 - Found a UI/state desync on a profile preference via exploratory testing

- What: one click opens the location input without checking the box; the entered locations get saved and shown on the public profile, while the 'Office' option persists as off - Edit Profile hides them, so the user cannot manage data that is publicly visible.
- How: manual roundtrip verification - click -> save -> Profile -> Edit Profile - to establish what is actually persisted vs what the UI shows
- Artifacts: docs/bugs/BUG-003-office-checkbox-is-not-checked-when-clicked-one-time.md

## 2026-07-14 - Diagnosed mass parallel-run failures: 31/50 -> stable green

- What: register suite collapsed under parallel execution (16 workers); separated test defects from environment limits and fixed each accordingly
- Numbers: 31/50 failed on default config -> stable green on the documented default (workers=2)
- How: classified failures via traces - a navigation race (fixed with a web-first URL assertion, not a timeout), assertion budgets sized to a measured slow backend call, and a server capacity ceiling (mitigated by an evidence-based workers default with a documented rationale); side effect: uncovered BUG-002
- Artifacts: playwright.config.ts, tests/auth/sign-up/recruiter/\*.spec.ts, docs/bugs/BUG-002-recruiter-onboarding-redirects-to-candidates-under-load.md

## 2026-07-14 - Found load-dependent routing bug

- What: under concurrent load the app redirects a recruiter to '/candidates' instead of the next wizard step after saving Contacts - onboarding progress is lost; caught by my parallel test runs
- Numbers: ~20% of recruiter onboarding flows at 8 concurrent sessions; not reproducible at 1-2
- How: parallel run failures -> trace analysis -> isolated the wrong redirect in Network (3 variations) -> filed BUG-002; added fail-fast URL assertions after each wizard step so silent timeouts became self-describing failures
- Artifacts: tests/auth/sign-up/recruiter/\*, docs/bugs/BUG-002-recruiter-onboarding-redirects-to-candidates-under-load.md

## 2026-07-05 - Found a real production bug with an autotest

- What: an invisible tooltip intercepts clicks on a required onboarding field ('Core technical skills'), so the option cannot be selected - caught by my first automated test, later reproduced manually at any viewport
- How: the test failed -> located the intercepting element via document.elementFromPoint -> proved causality by disabling pointer-events in DevTools (click works)
- Artifacts: docs/bugs/BUG-001-core-technical-skills-select-option-is-not-clickable.md

## 2026-07-05 - Stabilized the first test from flaky to 5/5 without a single waitForTimeout

- What: the candidate registration test failed intermittently; made it fully deterministic
- Numbers: intermittent failures -> 5/5 green on --repeat-each=5
- How: diagnosed three distinct root causes - ambiguous locator matching (fixed with anchored regex), an invisible overlay intercepting clicks (became BUG-001), and a third-party autocomplete race (targeted waitForResponse on GetPlaceDetails) - web-first assertions instead of sleeps
- Artifacts: tests/auth/sign-up/candidate/validRequiredFields.spec.ts
