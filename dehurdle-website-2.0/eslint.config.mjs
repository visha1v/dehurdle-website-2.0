import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['**/build', '**/eslint.config.mjs'],
  },
  ...fixupConfigRules(
    compat.extends(
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
      'plugin:prettier/recommended',
      'plugin:react/jsx-runtime',
      'plugin:storybook/recommended',
    ),
  ),
  {
    plugins: {
      'react': fixupPluginRules(react),
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      'react-hooks': fixupPluginRules(reactHooks),
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        process: true,
        google: 'readonly',
        GeolocationPosition: 'readonly',
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      'semi': 'error',
      'no-undef': 'error',
      'react-hooks/exhaustive-deps': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-use-before-define': 'off',
      'comma-dangle': 'off',
      'object-curly-spacing': ['error', 'always'],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowShortCircuit: true, allowTernary: true },
      ],
    },
  },
];
