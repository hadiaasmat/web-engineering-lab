const eslintJs = require("@eslint/js");

module.exports = [
  eslintJs.configs.recommended,

  {
    files: ["eslint.config.js", "tests/**/*.js"],
    languageOptions: {
      globals: {
        require: "readonly",
        module: "readonly",
      },
    },
  },

  {
    files: ["public/**/*.js"],
    languageOptions: {
      globals: {
        document: "readonly",
        module: "readonly",
      },
    },
  },
];
