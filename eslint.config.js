import antfu from '@antfu/eslint-config'
import parserToml from 'toml-eslint-parser'
import pluginToml from 'eslint-plugin-toml'

export default antfu({}, {
  plugins: {
    toml: pluginToml,
  },
  files: ['**/*.toml'],
  languageOptions: {
    parser: parserToml,
  },
  rules: {
    // https://github.com/ota-meshi/eslint-plugin-toml/blob/main/src/configs/standard.ts
    'no-irregular-whitespace': 'off',
    'spaced-comment': 'off',
    'toml/array-bracket-newline': 'error',
    'toml/array-bracket-spacing': 'error',
    'toml/array-element-newline': 'error',
    'toml/comma-style': 'error',
    'toml/indent': 'error',
    'toml/inline-table-curly-spacing': 'error',
    'toml/key-spacing': 'error',
    'toml/keys-order': 'error',
    'toml/no-space-dots': 'error',
    'toml/no-unreadable-number-separator': 'error',
    'toml/padding-line-between-pairs': 'error',
    'toml/padding-line-between-tables': 'error',
    'toml/precision-of-fractional-seconds': 'error',
    'toml/precision-of-integer': 'error',
    'toml/quoted-keys': 'error',
    'toml/spaced-comment': 'error',
    'toml/table-bracket-spacing': 'error',
    'toml/tables-order': 'error',
    'toml/vue-custom-block/no-parsing-error': 'error',
  },
}, {
  rules: {
    'no-console': 0,
    'unicorn/prefer-dom-node-text-content': 0,
  },
})
