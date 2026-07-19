import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import playwright from 'eslint-plugin-playwright';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig([
  globalIgnores(['playwright-report/', 'test-results/']),
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['tests/**'],
    extends: [playwright.configs['flat/recommended']],
    rules: {
      'playwright/expect-expect': [
        'error',
        {
          // no raw expect is used (use POM instead)
          assertFunctionPatterns: ['^assert.*'],
        },
      ],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          // ignore unused register fixtures in tests (they return void and are used in creating new user)
          argsIgnorePattern: '^register',
        },
      ],
    },
  },
  {
    files: ['tests/**/*.setup.ts'],
    rules: {
      // setup verifies via throws (API client fail-fast), not assertions
      'playwright/expect-expect': 'off',
    },
  },
  tseslint.configs.recommended,
  eslintConfigPrettier,
]);
