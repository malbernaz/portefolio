const { resolve } = require('path')
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')

module.exports = {
  context: resolve(__dirname, 'src'),
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel-loader', 'eslint-loader']
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.scss$/,
      loaders: [
        'isomorphic-style-loader',
        { loader: 'css-loader', query: { modules: true } },
        'postcss-loader',
        'sass-loader'
      ],
      exclude: /node_modules/
    }]
  },
  postcss: () => ([
    autoprefixer({ browsers: ['last 2 versions'] }),
    cssnano({ zindex: false })
  ]),
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
}
