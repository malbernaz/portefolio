const { DefinePlugin, optimize: { UglifyJsPlugin } } = require('webpack')
const { LoaderOptionsPlugin, ContextReplacementPlugin } = require('webpack')
const { resolve } = require('path')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
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

  const plugins = [
    new LodashModuleReplacementPlugin(),
    new ContextReplacementPlugin(/moment\/locale$/, /^\.\/(en)$/),
    new LoaderOptionsPlugin({
      minimize: env === 'prod',
      debug: env !== 'prod',
      options: {
        postcss: () => [
          autoprefixer({ browsers: ['last 2 versions'] }),
          cssnano({ zindex: false })
        ]
      }
    })
  ].concat(env === 'prod' ? [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        APPHTTPPORT: JSON.stringify(process.env.APPHTTPPORT),
        APPHTTPSPORT: JSON.stringify(process.env.APPHTTPSPORT),
        APIHOST: JSON.stringify(process.env.APIHOST),
        APIPORT: JSON.stringify(process.env.APIPORT),
        GANALYTICS: JSON.stringify(process.env.GANALYTICS)
      }
    }),
    new UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      output: {
        comments: false,
        screw_ie8: true
      },
      mangle: {
        screw_ie8: true
      },
      sourceMap: false
    })
  ] : [])

  return {
    context: resolve(__dirname, 'src'),
    bail: env === 'prod',
    devtool: env === 'prod' ? 'source-map' : 'eval',
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
                '[hash:base64:7]' : '[name]__[local]-[hash:base64:5]'
            }
          },
          'postcss-loader',
          'sass-loader'
        ],
        exclude: /node_modules/
      }, {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [{
          loader: 'url-loader',
          options: { limit: 10000 }
        }, {
          loader: 'image-webpack',
          options: {
            progressive: true,
            optimizationLevel: 7,
            interlaced: false,
            pngquant: {
              quality: '65-90',
              speed: 4
            }
          }
        }]
      }]
    },
    plugins,
    stats: { colors: true }
  }
}
