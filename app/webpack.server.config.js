const { IgnorePlugin } = require('webpack')
const { readdirSync } = require('fs')
const { resolve } = require('path')
const ShellPlugin = require('webpack-shell-plugin')

const wpBaseConfig = require('./webpack.config')

const plugins = [
  new IgnorePlugin(/worker/i),
  new ShellPlugin({ onBuildStart: 'cp -r certs dist' })
]

const externals = {
  './assets': 'commonjs ./assets'
}

readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => {
    externals[mod] = `commonjs ${mod}`
  })

module.exports = env => {
  const base = wpBaseConfig(env)

  return Object.assign(base, {
    context: resolve(__dirname, 'src'),
    entry: './server.js',
    externals,
    node: {
      __dirname: false,
      __filename: false
    },
    output: {
      path: resolve(__dirname, 'dist'),
      filename: 'index.js',
      libraryTarget: 'commonjs2'
    },
    plugins: base.plugins.concat(plugins),
    target: 'node'
  })
}
