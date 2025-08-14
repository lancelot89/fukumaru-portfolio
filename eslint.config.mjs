// ESLint v9 フラット設定（Next 専用設定に依存せず、汎用の最小構成）
// 目的: Rushstack のパッチ問題を回避しつつ、TS/TSX を lint 可能にする
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import pluginImport from 'eslint-plugin-import';

const importOrderRule = [
  'warn',
  {
    'newlines-between': 'always',
    groups: [["builtin", "external"], ["internal"], ["parent", "sibling", "index"]],
    alphabetize: { order: 'asc', caseInsensitive: true },
  },
];

export default [
  // TypeScript/TSX 用
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      import: pluginImport,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'import/order': importOrderRule,
    },
  },
  // JavaScript/JSX 用
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: { jsx: true },
    },
    plugins: {
      import: pluginImport,
    },
    rules: {
      'import/order': importOrderRule,
    },
  },
  // 無視パターン
  {
    ignores: [
      '**/.next/**',
      '**/node_modules/**',
      '**/dist/**',
      '**/coverage/**',
      '**/.turbo/**',
    ],
  },
];
