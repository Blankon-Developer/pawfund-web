// eslint.config.mjs
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import localPlugin from "./src/lib/eslint/index.mjs"

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),

  // Custom rules for the project
  {
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    plugins: {
      local: localPlugin
    },
    rules: {
      "local/no-cross-feature-deep-imports": "error",
      "local/no-external-mock-handler-imports": "error",
    },
  },
]);

export default eslintConfig;
