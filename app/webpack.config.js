const { resolve } = require('path')
const webpack = require('webpack')
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')

module.exports = env => ({
  context: resolve(__dirname, 'src'),
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    }, {
      test: /\.js$/,
      exclude: [/node_modules/, /\.worker\.js$/],
      loader: 'babel-loader'
    }, {
      test: /\.worker\.js$/,
      exclude: /node_modules/,
      loaders: ['worker-loader', 'babel-loader']
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
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => ([
          autoprefixer({ browsers: ['last 2 versions'] }),
          cssnano({ zindex: false })
        ])
      }
    })
  ],
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
})
