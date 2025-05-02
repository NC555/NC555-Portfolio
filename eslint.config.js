import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginNext from "@next/eslint-plugin-next";
import tseslint from "@typescript-eslint/eslint-plugin";

// Standard Next.js ESLint configuration
export default [
  {
    // Define plugins
    plugins: {
      react: eslintPluginReact,
      "react-hooks": eslintPluginReactHooks,
      "@typescript-eslint": tseslint,
      "@next/next": eslintPluginNext,
    },
    // Define rules, merging from recommended configs
    rules: {
      ...eslintPluginReact.configs.recommended.rules,
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...tseslint.configs.recommended.rules, // Merge TS recommended rules
      ...eslintPluginNext.configs.recommended.rules,
      ...eslintPluginNext.configs["core-web-vitals"].rules,
      "react/react-in-jsx-scope": "off", // Add/override specific rules
      // Add other custom rules here
    },
    // Add other flat config properties like languageOptions, settings, etc. can be added here if needed
  },
];
