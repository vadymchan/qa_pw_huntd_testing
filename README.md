# Repository Overview

This repository contains a test automation framework for the [Huntd](https://huntd.tech/) application testing.

# How to use this project

## Installation steps

To install the project follow the next steps:

1. Install Node.js.
2. Install Java (8 or higher)
3. Run the installation command in the project root.:

```bash
npm ci
```

4. Run the browsers installation in the project root.

```bash
npx playwright install
```

## How to run the tests

Locally

```bash
npm test
```

Docker

```bash
docker compose run --rm e2e
```

CI/CD - GitHub Actions

- Automatically during push / pull requests
- Manually in GitHub (Workflow dispatch)

## How to generate report

### Locally

Generate report

```
npm run report
```

Open report (it also generates report before opening)

```
npm run report:open
```

### CI/CD

Automatically generated and can be seen [here](https://vadymchan.github.io/qa_pw_huntd_testing/)
