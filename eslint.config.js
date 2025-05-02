import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginNext from "@next/eslint-plugin-next";
import tseslint from "@typescript-eslint/eslint-plugin";

// Standard Next.js ESLint configuration
export default [
  eslintPluginReact.configs.recommended,
  eslintPluginReactHooks.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "@next/next": eslintPluginNext,
    },
    rules: {
      ...eslintPluginNext.configs.recommended.rules,
      ...eslintPluginNext.configs["core-web-vitals"].rules,
      // Add or override rules here if needed
      "react/react-in-jsx-scope": "off", // Next.js doesn't require React import
    },
  },
];
