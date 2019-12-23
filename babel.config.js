module.exports = {
  'presets': [
    [
      '@babel/preset-env',
      {
        'targets': {
          'browsers': [
            '> 1%',
            'last 2 versions',
            'not ie <= 8'
          ]
        }
      },
      '@babel/preset-stage-2'
    ]
  ],
  'plugins': [
    'dynamic-import-webpack',
    'transform-object-assign',
    '@babel/plugin-proposal-class-properties',
    [
      'import',
      {
        'libraryName': 'vant',
        'libraryDirectory': 'es',
        'style': true
      },
      'vant'
    ]
  ]
}
