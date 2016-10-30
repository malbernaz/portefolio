const { resolve } = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const ShellPlugin = require('webpack-shell-plugin')
const { StatsWriterPlugin } = require('webpack-stats-plugin')
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
  new ShellPlugin({
    onBuildStart: ['yarn run imagemin']
  }),
  new CopyPlugin([{
    from: './static/manifest.json'
  }, {
    from: './static/runtime-cache-strategy.js'
  }, {
    context: resolve(__dirname),
    from: './node_modules/sw-toolbox/sw-toolbox.js'
  }]),
  new SWPrecachePlugin({
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
  }),
  new StatsWriterPlugin({
    filename: '../manifest.json',
    fields: ['assets'],
    transform: ({ assets }) =>
      JSON.stringify({ assets: assets.map(a => a.name) })
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
