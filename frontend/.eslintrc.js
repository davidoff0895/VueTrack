module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:vue/strongly-recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    quotes: [2, 'single', { avoidEscape: true }],
    semi: 'warn',
    'max-len': ['warn', 80],
    'object-curly-spacing': ['warn', 'always'],
    'no-trailing-spaces': 'warn',
    'vue/valid-attribute-name': 'off',
    'vue/valid-model-definition': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    // '@typescript-eslint/no-unused-vars': 'off',
    'comma-dangle': ['warn', 'always-multiline'],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
