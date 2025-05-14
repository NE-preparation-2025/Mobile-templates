module.exports = {
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
    rules: {
      "react/prop-types": "off"
}

  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  plugins: ["react"],
  rules: {
    // custom rules go here, like turning off prop-types if you want:
    // "react/prop-types": "off"
  },
};
