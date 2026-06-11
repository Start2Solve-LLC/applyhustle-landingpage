import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// FlatCompat lets us reuse the Next.js shareable configs (still distributed in
// the legacy "extends" format) inside ESLint 9's flat config.
const compat = new FlatCompat({ baseDirectory: __dirname });

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  // Never lint build output, deps, or generated types.
  {
    ignores: ['.next/**', 'out/**', 'build/**', 'node_modules/**', 'next-env.d.ts'],
  },

  // Next.js core-web-vitals (perf + React) + TypeScript + accessibility rules.
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'plugin:jsx-a11y/recommended'),

  // Project-wide quality rules.
  {
    plugins: { import: importPlugin },
    rules: {
      // No stray debugging in production; console.warn/error are allowed.
      'no-console': ['error', { allow: ['warn', 'error'] }],

      // Unused code is a hard error, except intentionally-prefixed `_args`.
      'no-unused-vars': 'off', // handled by the typescript-aware rule below
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],

      // Deterministic import ordering (auto-fixable via `eslint --fix`).
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
          pathGroups: [{ pattern: '@/**', group: 'internal', position: 'after' }],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'ignore',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-duplicates': 'error',

      // Marketing copy legitimately contains apostrophes/quotes/em dashes.
      'react/no-unescaped-entities': 'off',
    },
  },

  // CommonJS config files (next.config.js, etc.) legitimately use require().
  {
    files: ['**/*.config.js', '**/*.cjs'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },

  // Turns off any stylistic rules that would fight Prettier — keep this LAST.
  prettier,
];

export default eslintConfig;
