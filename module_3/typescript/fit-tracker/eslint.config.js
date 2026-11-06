import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // project restriction: no `as` type conversions, types come from guards
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        { assertionStyle: 'never' },
      ],
      // the rule above allows `as const`, so it is blocked here
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSAsExpression > TSTypeReference[typeName.name="const"]',
          message: 'Do not use `as const`; declare the type instead.',
        },
      ],
      // it suggests `as const` over a literal type, the opposite of this project
      '@typescript-eslint/prefer-as-const': 'off',
    },
  },
]);
