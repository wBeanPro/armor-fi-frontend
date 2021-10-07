module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ['plugin:react/recommended', 'plugin:prettier/recommended'],
  plugins: [],
  // add your custom rules here
  rules: {
    'react/prop-types': 0,
    'react/no-deprecated': 0,
    'react/no-unescaped-entities': 0,
    semi: ['error', 'never'],
  },
  settings: {
    react: {
      version: 'latest',
    },
  },
};
