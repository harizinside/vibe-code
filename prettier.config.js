//  @ts-check

/** @type {import('prettier').Config} */
const config = {
  semi: false,
  singleQuote: false,
  trailingComma: "all",
  bracketSpacing: true,
  printWidth: 80,
  tabWidth: 2,
  plugins: [
    "prettier-plugin-tailwindcss",
    "@trivago/prettier-plugin-sort-imports",
  ],
}

export default config
