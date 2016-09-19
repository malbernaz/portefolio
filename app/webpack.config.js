const { resolve } = require('path')
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')

module.exports = env => ({
  context: resolve(__dirname, 'src'),
  module: {
    preLoaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    }],
    loaders: [{
      test: /\.js$/,
      exclude: [/node_modules/, /\.worker\.js$/],
      loader: 'babel-loader'
    }, {
      test: /\.worker\.js$/,
      exclude: /node_modules/,
      loaders: ['babel-loader', 'worker-loader']
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.scss$/,
      loaders: [
        'isomorphic-style-loader', {
          loader: 'css-loader',
          query: {
            modules: true,
            localIdentName: env === 'prod' ?
              '[hash:base64:7]' :
              '[name]__[local]-[hash:base64:5]'
          }
        },
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
})
