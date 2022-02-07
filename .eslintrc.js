module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb-base",
    "plugin:prettier/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier", "import"],

  rules: {
    "prettier/prettier": "error",
    "import/prefer-default-export": "off",
    "no-console": "off",
    "no-shadow": "off",
    "import/extensions": "off",
    "import/no-default-export": "off",
    "no-promise-executor-return": "off",
    "import/order": [
      "error",
      {
        "newlines-between": "never",
        groups: [
          ["builtin", "external"],
          ["internal", "parent", "sibling", "index"],
        ],
      },
    ],
    "no-use-before-define": [
      "error",
      {
        functions: false,
        classes: true,
        variables: true,
      },
    ],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-use-before-define": [
      "error",
      {
        functions: false,
        classes: true,
        variables: true,
        typedefs: true,
      },
    ],
    "import/no-extraneous-dependencies": "off",
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "./tsconfig.json",
      },
    },
  },
};
