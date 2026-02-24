const expoConfig = require("eslint-config-expo/flat.js");
const { defineConfig, globalIgnores } = require("eslint/config");
const tseslint = require("typescript-eslint");
const prettierConfig = require("eslint-config-prettier/flat");
const react = require("eslint-plugin-react");
const globals = require("globals");
const esReactHooks = require("eslint-plugin-react-hooks");
const esReactRefresh = require("eslint-plugin-react-refresh");

module.exports = defineConfig([
  expoConfig,
  prettierConfig,
  tseslint.configs.recommended,
  globalIgnores(["dist/*", ".expo/*", "web-build/*", "node_modules/*"]),
  react.configs.flat["jsx-runtime"],
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    plugins: {
      "react-hooks": esReactHooks,
      "react-refresh": esReactRefresh,
    },
    rules: {
      ...esReactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "react/prop-types": "off",
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
      parser: tseslint.parser,
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "es2022",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
          alwaysTryTypes: true,
        },
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
]);
