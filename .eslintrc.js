module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  env: {
    browser: true,
    node: true,
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src", "node_modules"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
      typescript: {},
    },
    react: {
      version: "detect",
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:prettier/recommended",
    "plugin:import/errors",
    "plugin:import/typescript",
    // 'plugin:sonarjs/recommended',
    "prettier",
    // 'plugin:react-hooks/recommended',
    // 'plugin:sonarjs/recommended',
  ],
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": [
      "off",
      {
        bracketSpacing: true,
        jsxBracketSameLine: false,
        singleQuote: true,
        trailingComma: "all",
        printWidth: 80,
        tabWidth: 2,
        semi: true,
        endOfLine: "auto",
        proseWrap: "never",
        overrides: [
          {
            files: ["**/*.json", "**/*.html"],
            options: {
              singleQuote: false,
            },
          },
        ],
      },
    ],
    "@typescript-eslint/no-explicit-any": 0, //1
    "@typescript-eslint/ban-types": "off", //'warn'
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "react/display-name": "off", //'warn'
    "react/no-unused-prop-types": "off",
    eqeqeq: ["warn", "always", { null: "ignore" }],
    // 'import/no-internal-modules': 'warn',
    "no-constant-condition": "off",
  },
};
