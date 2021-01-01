module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module",
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ["eslint:recommended", "prettier"],
  plugins: ["vue"],
  rules: {},
  overrides: [
    {
      files: ["*.vue", "*.ts"],
      extends: [
        "plugin:vue/recommended",
        "@vue/typescript/recommended",
        "prettier/vue",
      ],
    },
  ],
};
