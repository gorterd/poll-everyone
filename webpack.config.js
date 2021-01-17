const path = require('path');
module.exports = {
  context: __dirname,
  entry: __dirname + '/app/frontend/packs/application.js',
  output: {
    path: path.resolve(__dirname, 'public', 'packs_two'),
    filename: 'bundle.js'
  },
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
        
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  },
  devtool: 'source-map',
    resolve: {
    extensions: [".js", ".jsx", "*"]
  }
};