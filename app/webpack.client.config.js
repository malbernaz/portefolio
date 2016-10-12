const { resolve } = require('path')

const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackShellPlugin = require('webpack-shell-plugin')
const {
  DefinePlugin,
  LoaderOptionsPlugin,
  optimize: {
    CommonsChunkPlugin,
    MinChunkSizePlugin,
    UglifyJsPlugin
  }
} = require('webpack')

const wpBaseConfig = require('./webpack.config')

const BUILD_DIR = resolve(__dirname, 'dist', 'public')

const plugins = [
  new CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity
  }),
  new MinChunkSizePlugin({
    minChunkSize: 1000
  }),
  new WebpackShellPlugin({
    onBuildStart: ['npm run imagemin']
  }),
  new CopyWebpackPlugin([{
    from: './static/manifest.json'
  }, {
    from: './static/runtime-cache-strategy.js'
  }, {
    context: resolve(__dirname),
    from: './node_modules/sw-toolbox/sw-toolbox.js'
  }]),
  new SWPrecacheWebpackPlugin({
    cacheId: 'portefolio_app',
    filename: 'sw.js',
    staticFileGlobs: [
      `${BUILD_DIR}/**/*.js`,
      `${BUILD_DIR}/img/**/*`
    ],
    navigateFallback: '/',
    importScripts: [
      'sw-toolbox.js',
      'runtime-cache-strategy.js'
    ]
  })
]

const prodPlugins = plugins.concat([
  new DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new UglifyJsPlugin({
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
      main: ['./client'],
      vendor: ['react', 'react-dom', 'moment']
    },
    output: {
      path: BUILD_DIR,
      filename: '[name].bundle.js',
      publicPath: '/',
    },
    plugins: base.plugins.concat(env === 'prod' ? prodPlugins : plugins),
    devtool: env === 'prod' ? 'source-map' : 'eval',
    bail: env === 'prod'
  })
}
