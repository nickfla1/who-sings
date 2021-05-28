module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowTypedFunctionExpressions: true,
      },
    ],
    'eslint-comments/no-unlimited-disable': 'off',
  },
};
