const { resolve } = require('path')
const autoprefixer = require('autoprefixer')
const precss = require('precss')

module.exports = {
  context: resolve(__dirname, 'src'),
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.css$/,
      loaders: [
        'isomorphic-style-loader',
        'css-loader',
        'postcss-loader'
      ],
      exclude: /node_modules/
    }]
  },
  postcss: () => ([
    autoprefixer({ browsers: ['> 0.8%'] }),
    precss
  ]),
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
}
