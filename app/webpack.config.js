const { resolve } = require('path')
const { LoaderOptionsPlugin, ContextReplacementPlugin } = require('webpack')
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

module.exports = env => {
  const babelLoader = {
    loader: 'babel-loader',
    options: {
      presets: [['es2015', {
        loose: true,
        modules: false
      }], 'react'],
      plugins: [
        'transform-class-properties',
        'transform-object-rest-spread',
        'transform-decorators-legacy',
        'lodash'
      ].concat(env === 'prod' ? [
        'transform-react-constant-elements',
        'transform-react-inline-elements'
      ] : [])
    }
  }

  return {
    context: resolve(__dirname, 'src'),
    module: {
      rules: [{
        enforce: 'pre',
        test: /\.js$/,
        exclude: [/node_modules/, /highlightjs/],
        loader: 'eslint-loader'
      }, {
        test: /\.js$/,
        exclude: [/node_modules/, /\.worker\.js$/],
        loaders: [babelLoader]
      }, {
        test: /\.worker\.js$/,
        exclude: /node_modules/,
        loaders: ['worker-loader', babelLoader]
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.scss$/,
        loaders: [
          'isomorphic-style-loader', {
            loader: 'css-loader',
            options: {
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
      new LodashModuleReplacementPlugin(),
      new ContextReplacementPlugin(/moment\/locale$/, /^\.\/(en)$/),
      new LoaderOptionsPlugin({
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
    },
    stats: {
      colors: true
    }
  }
}
