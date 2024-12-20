import typescriptParser from '@typescript-eslint/parser';
export default [
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    ignores: ['.next/', 'node_modules'],
    rules: {
      'no-unused-vars': 'warn',
    },
  },
];
