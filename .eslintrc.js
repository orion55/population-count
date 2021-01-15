module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-console': 'off',
    'react/prop-types': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'max-len': ['error', { code: 300 }],
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'linebreak-style': ['error', 'windows'],
    'react/button-has-type': 'off',
    'no-param-reassign': 'off',
    'no-use-before-define': 'off',
    'no-unused-vars': 'off',
    'react/no-array-index-key': 'off',
    'no-return-await': 'off',
    'import/no-named-as-default': 'off',
    camelcase: 'off',
    'no-nested-ternary': 'off',
    'no-debugger': 'off',
  },
};
