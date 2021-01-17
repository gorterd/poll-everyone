process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const environment = require('./environment')
const path = require('path');

const custom = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['@babel/react']
            // presets: ['@babel/env', '@babel/react']
          },
        },
      }
    ]
  },
  devtool: 'source-map',
    resolve: {
    extensions: [".js", ".jsx", "*"]
  }
};

environment.config.merge(custom);

module.exports = environment.toWebpackConfig();
