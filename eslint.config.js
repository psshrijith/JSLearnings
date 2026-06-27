import globals from "globals";

export default [
  {
    ignores: ["node_modules/**"],
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
      ecmaVersion: 2022,
      sourceType: "module",
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": "warn",
      "prefer-const": "warn",
      "eqeqeq": ["error", "always"],
      "no-var": "error",
      "no-implicit-globals": "error",
    },
  },
];
