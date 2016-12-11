/* eslint-disable quote-props */

const {
  optimize: { CommonsChunkPlugin, MinChunkSizePlugin },
  HotModuleReplacementPlugin,
  NamedModulesPlugin
} = require('webpack')
const { resolve } = require('path')
const { StatsWriterPlugin } = require('webpack-stats-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const wpBaseConfig = require('./webpack.config')
const transform = require('./stats-transform')

const BUILD_DIR = resolve(__dirname, 'dist', 'public')

const port = parseInt(process.env.APPHTTPPORT, 10) + 1 || 3001
const host = '0.0.0.0'

module.exports = env => {
  const base = wpBaseConfig(env)

  const DEV = /dev/.test(env)

  const plugins = [
    new CommonsChunkPlugin({ name: 'vendor', minChunks: Infinity }),
    new MinChunkSizePlugin({ minChunkSize: 1000 }),
    new CopyPlugin([{
      context: resolve(__dirname, 'src', 'static'),
      from: '**/*',
      to: resolve(__dirname, 'dist', 'public')
    }]),
    new StatsWriterPlugin({
      filename: 'assets.js',
      fields: ['assets', 'assetsByChunkName', 'hash'],
      transform: transform({ DEV })
    })
  ].concat(DEV ? [
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin()
  ] : [])

  return Object.assign(base, {
    context: resolve(__dirname, 'src'),
    entry: {
      main: './client',
      vendor: ['react', 'react-dom', 'moment', 'redux-form']
    },
    output: {
      path: BUILD_DIR,
      filename: DEV ? '[name].js' : '[name].[hash].js',
      chunkFilename: DEV ? '[name].[id].js' : '[name].[id].[hash].js',
      publicPath: '/',
    },
    plugins: base.plugins.concat(plugins),
    devServer: {
      stats: { colors: true },
      port,
      host,
      publicPath: '/',
      clientLogLevel: 'error',
      hot: true,
      inline: true,
      proxy: { '*': { target: `http://${host}:${port - 1}` } }
    }
  })
}
