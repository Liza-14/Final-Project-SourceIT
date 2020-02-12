module.exports = {
  "env": {
      "browser": true,
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "sourceType": "module",
      "ecmaVersion": 2018,
  },
  "rules": {
      "quotes": [
          "error",
          "double"
      ],
      "semi": [
          "error",
          "always"
      ],
      "no-console": "off"
  }
};
