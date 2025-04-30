// ESLint configuration for the standalone portfolnoy web application
/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["next/core-web-vitals", "@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  rules: {
    // Add custom rules if needed
  },
};
