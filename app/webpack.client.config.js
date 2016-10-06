const { resolve } = require('path')
const { union } = require('underscore')
const webpack = require('webpack')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

const wpBaseConfig = require('./webpack.config')

const BUILD_DIR = resolve(__dirname, 'dist', 'public')

const plugins = [
  new webpack.ContextReplacementPlugin(/moment\/locale$/, /^\.\/(en)$/),
  new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', minChunks: Infinity }),
  new SWPrecacheWebpackPlugin({
    cacheId: 'portefolio_app',
    filename: 'sw.js',
    staticFileGlobs: [
      `${BUILD_DIR}/**/*.js`,
      `${BUILD_DIR}/img/**/*`
    ],
    navigateFallback: '/',
    runtimeCaching: [{
      urlPattern: /\/api/,
      handler: 'fastest'
    }, {
      default: 'networkFirst'
    }]
  })
]

const prodPlugins = union(plugins, [
  new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
  new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
    output: { comments: false },
    sourceMap: false
  })
])

module.exports = env => {
  const base = wpBaseConfig(env)

  return Object.assign(base, {
    context: resolve(__dirname, 'src'),
    entry: {
      main: ['./client', './containers/AppView'],
      vendor: ['react', 'moment']
    },
    output: {
      path: BUILD_DIR,
      filename: '[name].bundle.js',
      publicPath: '/',
    },
    plugins: union(base.plugins, env === 'prod' ? prodPlugins : plugins),
    devtool: env === 'prod' ? 'hidden-source-map' : 'cheap-module-source-map'
  })
}
