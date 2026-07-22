import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const RESULTS = 'allure-results';
const REPORT = 'allure-report';

// Locally the previous history sits in allure-report/history.
// In CI it comes from the gh-pages checkout, via ALLURE_HISTORY.
const historySource = process.env.ALLURE_HISTORY ?? `${REPORT}/history`;

mkdirSync(RESULTS, { recursive: true });

if (existsSync(historySource)) {
  cpSync(historySource, `${RESULTS}/history`, { recursive: true });
  console.log(`history carried forward from ${historySource}`);
} else {
  console.log(`no history at ${historySource} - this report starts a new trend`);
}

execFileSync('allure', ['generate', RESULTS, '--clean', '-o', REPORT], {
  stdio: 'inherit',
  shell: true,
});

console.log(`report written to ${REPORT}`);
