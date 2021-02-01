/* eslint-disable no-undef */
module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'indent': [
      'warn',
      2,
      { 'SwitchCase': 1 }
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'warn',
      'single'
    ],
    'react/prop-types': 'off',
    'react/no-unescaped-entities': [
      'warn',
      {
        'forbid': ['>', '}']
      }
    ]
  },
  'settings': {
    'react': {
      'version': 'detect'
    }
      
  }
};
