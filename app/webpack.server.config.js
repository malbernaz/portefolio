/* eslint-disable quote-props */

const { readdirSync } = require('fs')
const { IgnorePlugin } = require('webpack')
const { resolve } = require('path')

const wpBaseConfig = require('./webpack.config')

const externals = readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .reduce((acc, mod) => {
    if (mod === 'react' || mod === 'react-dom') {
      return Object.assign(acc, { [mod]: 'commonjs preact-compat' })
    }

    if (/react/.test(mod)) return acc

    return Object.assign(acc, { [mod]: `commonjs ${mod}` })
  }, { './assets': 'commonjs ./assets' })

module.exports = env => {
  const base = wpBaseConfig(env)

  return Object.assign(base, {
    context: resolve(__dirname, 'src'),
    entry: './server.js',
    externals,
    resolve: {
      modules: [resolve(__dirname, 'src'), resolve(__dirname, 'node_modules')],
      alias: {
        'react': 'preact-compat',
        'react-dom': 'preact-compat',
        'react-addons-css-transition-group': 'preact-css-transition-group'
      }
    },
    node: {
      __dirname: false,
      __filename: false
    },
    output: {
      path: resolve(__dirname, 'dist'),
      filename: 'index.js',
      libraryTarget: 'commonjs2'
    },
    plugins: base.plugins.concat([
      new IgnorePlugin(/worker/i)
    ]),
    target: 'node'
  })
}
