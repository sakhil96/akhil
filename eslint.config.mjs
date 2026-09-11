import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    settings: {
      next: {
        rootDir: 'src/src',
      },
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "src/src/.next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "src/src/next-env.d.ts",
    "**/__MACOSX/**",
    "**/._*",
  ]),
]);

export default eslintConfig;
