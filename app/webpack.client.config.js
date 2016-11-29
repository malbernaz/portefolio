const { optimize: { CommonsChunkPlugin, MinChunkSizePlugin } } = require('webpack')
const { resolve } = require('path')
const { StatsWriterPlugin } = require('webpack-stats-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ShellPlugin = require('webpack-shell-plugin')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')

const wpBaseConfig = require('./webpack.config')

const BUILD_DIR = resolve(__dirname, 'dist', 'public')

module.exports = env => {
  const base = wpBaseConfig(env)

  const plugins = [
    new CommonsChunkPlugin({ name: 'vendor', minChunks: Infinity }),
    new MinChunkSizePlugin({ minChunkSize: 1000 }),
    new ShellPlugin({ onBuildStart: ['yarn run imagemin'] }),
    new CopyPlugin([{
      from: './static/manifest.json'
    }, {
      from: './static/runtime-cache-strategy.js'
    }, {
      context: resolve(__dirname),
      from: './node_modules/sw-toolbox/sw-toolbox.js'
    }]),
    new StatsWriterPlugin({
      filename: 'assets.js',
      fields: ['assets'],
      transform ({ assets }) {
        return `module.exports = ${JSON.stringify({ assets: assets.map(a => a.name) })}`
      }
    })
  ].concat(env === 'prod' ? [
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
    })
  ] : [])

  return Object.assign(base, {
    context: resolve(__dirname, 'src'),
    entry: {
      main: './client',
      vendor: ['react', 'react-dom', 'moment']
    },
    output: {
      path: BUILD_DIR,
      filename: '[name].bundle.js',
      publicPath: '/',
    },
    plugins: base.plugins.concat(plugins)
  })
}
