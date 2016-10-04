const { resolve } = require('path')
const { readdirSync } = require('fs')
const { union } = require('underscore')
const webpack = require('webpack')
const wpBaseConfig = require('./webpack.config')

const plugins = [
  new webpack.ContextReplacementPlugin(/moment\/locale$/, /^\.\/(en)$/),
  new webpack.IgnorePlugin(/worker/i)
]

const prodPlugins = union(plugins, [
  new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
  new webpack.ContextReplacementPlugin(/moment\/locale$/, /^\.\/(pt-br)\.js$/),
  new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
    output: { comments: false },
    sourceMap: false
  })
])

const nodeModules = {}

readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => { nodeModules[mod] = `commonjs ${mod}` })

module.exports = env => {
  const base = wpBaseConfig(env)

  return Object.assign(base, {
    context: resolve(__dirname, 'src'),
    entry: './server.js',
    output: {
      path: resolve(__dirname, 'dist'),
      filename: 'index.js',
      libraryTarget: 'commonjs2'
    },
    target: 'node',
    node: {
      __dirname: false,
      __filename: false
    },
    externals: Object.assign(nodeModules, { './Renderer.worker': true }),
    plugins: union(base.plugins, env === 'prod' ? prodPlugins : plugins),
    devtool: env === 'prod' ? 'hidden-source-map' : 'cheap-module-source-map'
  })
}
