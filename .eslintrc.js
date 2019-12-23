module.exports = {
  'root': true,
  'parser': 'vue-eslint-parser',
  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module',
    'parser': 'babel-eslint'
  },
  'env': {
    'es6': true,
    'browser': true,
    'commonjs': true
  },
  'plugins': [
    'html',
    'vue'
  ],
  'extends': [
    'eslint:recommended'
  ],
  'rules': {
    'quotes': [
      2,
      'single'
    ],
    'semi': [
      2,
      'never'
    ],
    'comma-dangle': [
      2,
      'never'
    ],
    'indent': [2, 2, { 'SwitchCase': 1 }],
    'prefer-const': 2,
    'comma-spacing': 2,
    'no-debugger': 0,
    'arrow-parens': 2,
    'no-console': 0
  }
}
