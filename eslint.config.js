//  @ts-check

import { tanstackConfig } from "@tanstack/eslint-config"
import * as drizzle from "eslint-plugin-drizzle"
import prettierConfig from "eslint-config-prettier"

export default [
  ...tanstackConfig,
  {
    plugins: {
      drizzle,
    },
    rules: {
      "import/no-cycle": "off",
      "import/order": "off",
      "sort-imports": "off",
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/require-await": "off",
      "pnpm/json-enforce-catalog": "off",
    },
  },
  prettierConfig,
  {
    ignores: ["eslint.config.js", "prettier.config.js"],
  },
]
