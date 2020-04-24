module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'eslint-plugin-import-helpers',
  ],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    "react-hooks/exhaustive-deps": 'warn',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'import/prefer-default-export': 'off',
    'import/extensions': ['error', 'ignorePackages', { 'ts': 'never', 'tsx': 'never' }],
    'no-console': 'off',
    'react/jsx-curly-spacing': [2, { 'when': 'always', 'allowMultiline': true }],
    '@typescript-eslint/explicit-function-return-type': ['error', { 'allowExpressions': true }],
    'template-curly-spacing': ['error', 'always'],
    'react/jsx-one-expression-per-line': 'off',


    'import-helpers/order-imports': [
      'warn',
      { // example configuration
          newlinesBetween: 'always',
          groups: [
            '/react/',
            '/react-native/',
            '/\b(?!react-icons|react-native-vector-icons)\b^react/',
            'module',
            '/^@rocketseat/',
            '/^react-icons/',
            '/^react-native-vector-icons/',
            '/^styled-components/',
            '/^date-fns/',
            '/services/',
            '/pages/',
            '/components/',
            '/styles/',
            '/^~/',
            ['parent', 'sibling', 'index'],
          ],
          alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {}
    }
  }
};
