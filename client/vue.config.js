const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  css: {
    sourceMap: true,
  },
  configureWebpack: {
    plugins: [
      new WebpackNotifierPlugin({
        title: 'Webpack',
        alwaysNotify: true,
        contentImage: './public/favicons/android-chrome-192x192.png',
      })
    ]
  }
}