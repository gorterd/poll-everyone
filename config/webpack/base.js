const { webpackConfig, merge } = require('@rails/webpacker')


const resolve = {
  resolve: {
    extensions: ['.jsx']
  }
}

module.exports = merge(webpackConfig, resolve);
