const { optimize: { CommonsChunkPlugin, MinChunkSizePlugin } } = require('webpack')
const { resolve } = require('path')
const { StatsWriterPlugin } = require('webpack-stats-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const wpBaseConfig = require('./webpack.config')
const transform = require('./stats-transform')

const BUILD_DIR = resolve(__dirname, 'dist', 'public')

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
  ]

  return Object.assign(base, {
    context: resolve(__dirname, 'src'),
    entry: {
      main: './client',
      vendor: ['react', 'react-dom', 'moment']
    },
    output: {
      path: BUILD_DIR,
      filename: DEV ? '[name].js' : '[name].[hash].js',
      chunkFilename: DEV ? '[name].[id].js' : '[name].[id].[hash].js',
      publicPath: '/',
    },
    plugins: base.plugins.concat(plugins)
  })
}
