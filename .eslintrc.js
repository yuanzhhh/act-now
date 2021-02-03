module.exports = {
    "parser": "@typescript-eslint/eslint-plugin",
    "plugins": ["@typescript-eslint"],
    "extends": [
        "airbnb",
        "airbnb/hooks",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {}
};
