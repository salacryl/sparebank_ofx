module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    allowImportExportEverywhere: false,
    ecmaFeatures: {
      globalReturn: false,
    }
  },
  extends: "eslint:recommended",
    rules: {
        // enable additional rules
        "indent": ["error", "tab"],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "double"],
        "semi": ["error", "always"],

        // override default options for rules from base configurations
        "comma-dangle": ["error", "always"],
        "no-cond-assign": ["error", "always"],

        // disable rules from base configurations
		"no-console": "off",
		"prefer-arrow-callback": "error",
		"func-style": ["error", "expression"],
		"camelcase": ["error", { "properties":"always" }],
		"require-jsdoc": ["error", {
			"require": {
				"FunctionDeclaration": true,
				"MethodDefinition": true,
				"ClassDeclaration": true,
				"ArrowFunctionExpression": true,
				"FunctionExpression": true
			}
		}],
		"valid-jsdoc": "error" ,
    }
};