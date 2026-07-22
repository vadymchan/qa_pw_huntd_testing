import { rmSync } from 'node:fs';

rmSync('allure-results', { recursive: true, force: true });
console.log('cleared allure-results');