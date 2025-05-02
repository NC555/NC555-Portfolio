import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginNext from "@next/eslint-plugin-next";
import tseslint from "@typescript-eslint/eslint-plugin";

// Standard Next.js ESLint configuration
export default [
  eslintPluginReact.configs.recommended,
  eslintPluginReactHooks.configs.recommended,
  tseslint.configs.recommended,
  {
    // Attempting to resolve "plugins" format error by removing the explicit plugins key
    rules: {
      ...eslintPluginNext.configs.recommended.rules,
      ...eslintPluginNext.configs["core-web-vitals"].rules,
      "react/react-in-jsx-scope": "off", // Next.js doesn't require React import
      // Add or override rules here if needed
    },
  },
];
