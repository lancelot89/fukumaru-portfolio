/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier'
  ],
  settings: {
    'import/resolver': {
      typescript: true,
      node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] }
    }
  },
  rules: {
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
        groups: [['builtin', 'external'], ['internal'], ['parent', 'sibling', 'index']],
        alphabetize: { order: 'asc', caseInsensitive: true }
      }
    ],
    'import/no-unresolved': ['error', { ignore: ['^.+\\.css$'] }]
  }
};
