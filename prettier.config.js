module.exports = {
  printWidth: 80,
  endOfLine: "lf",
  jsxSingleQuote: true,
  semi: true,
  useTabs: false,
  tabWidth: 2,
  trailingComma: "all",
  singleQuote: true,
  arrowParens: "always",
  tailwindConfig: "./tailwind.config.js",
  plugins: [require('prettier-plugin-tailwindcss')],
}
