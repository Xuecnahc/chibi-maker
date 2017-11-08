const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src/client/js/main.js'),
  output: {
    path: path.resolve(__dirname, 'public/js/'),
    filename: 'main.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['env', 'react']
      }
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  }
}
