import { fixupConfig } from "@eslint/js";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginNext from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";

// Standard Next.js ESLint configuration
export default tseslint.config(
  fixupConfig(eslintPluginReact.configs.recommended),
  fixupConfig(eslintPluginReactHooks.configs.recommended),
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
  }
);
