module.exports = {
  extends: ["stylelint-config-standard"],
  plugins: ["stylelint-scss"],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
          "extend"
        ]
      }
    ],
    "scss/at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["tailwind", "apply", "variants", "responsive", "screen"]
      }
    ],
    "declaration-block-trailing-semicolon": null,
    "no-descending-specificity": null,
    "no-empty-source": null,
    "selector-pseudo-element-no-unknown": [
      true,
      {
        ignorePseudoElements: ["v-deep"]
      }
    ]
  }
};
