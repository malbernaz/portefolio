const { resolve } = require('path')
const { readdirSync } = require('fs')

const {
  DefinePlugin,
  LoaderOptionsPlugin,
  IgnorePlugin,
  optimize: { UglifyJsPlugin }
} = require('webpack')

const wpBaseConfig = require('./webpack.config')

const plugins = [
  new IgnorePlugin(/worker/i)
]

const prodPlugins = plugins.concat([
  new DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
      APPPORT: JSON.stringify(process.env.APPPORT),
      APIHOST: JSON.stringify(process.env.APIHOST),
      APIPORT: JSON.stringify(process.env.APIPORT)
    }
  }),
  new LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new UglifyJsPlugin({
    compress: { screw_ie8: true, warnings: false },
    output: { comments: false, screw_ie8: true },
    mangle: { screw_ie8: true },
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
    externals: Object.assign(nodeModules),
    plugins: base.plugins.concat(env === 'prod' ? prodPlugins : plugins),
    devtool: env === 'prod' ? 'hidden-source-map' : 'cheap-module-source-map'
  })
}
