// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {
    'vue/require-default-prop': 'off',
    'import/consistent-type-specifier-style': 'off',
    'vue/html-self-closing': 'off',
  },
});
