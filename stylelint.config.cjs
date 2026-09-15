/**
 * Stylelint configuration for basic CSS linting.
 * We extend the "standard" config which enforces:
 * - Valid CSS syntax
 * - Consistent formatting and conventions
 */

/** @type {import("stylelint").Config} */
module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recommended-scss'],

  rules: {
    //allows @import instead of forcing url
    'import-notation': 'string',

    // Disallow invalid hex colors
    'color-no-invalid-hex': true,

    // Avoid empty rule blocks
    'block-no-empty': true,

    // Allow camelCase class
    'selector-class-pattern': null,

    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'use',
          'forward',
          'mixin',
          'include',
          'function',
          'tailwind',
          'apply',
          'layer',
          'theme',
          'custom-variant',
        ],
      },
    ],

    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'use',
          'forward',
          'mixin',
          'include',
          'function',
          'tailwind',
          'apply',
          'layer',
          'theme',
          'custom-variant',
        ],
      },
    ],

    // Allow rgba
    'color-function-notation': null,

    // Allow percentages to be decimal numbers rather than strings
    'alpha-value-notation': 'number',

    // Skip scss/no-global-function-names
    'scss/no-global-function-names': null,
  },
};
