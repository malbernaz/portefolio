const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const extend = require('lodash/extend')

const config = require('./webpack.client.config')('dev')

const port = parseInt(process.env.APPHTTPPORT, 10) + 1 || 3001

const babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: [['es2015', {
      loose: true,
      modules: false
    }], 'react'],
    plugins: [
      'transform-class-properties',
      'transform-object-rest-spread',
      'transform-decorators-legacy',
      'react-hot-loader/babel',
      'lodash'
    ]
  }
}

const devServerConfig = extend({}, config, {
  entry: extend({}, config.entry, {
    main: [
      `webpack-dev-server/client?http://0.0.0.0:${port}`,
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch'
    ].concat(config.entry.main)
  }),
  module: {
    rules: config.module.rules.map(
      r => r.test.test('.js') && typeof r.enforce === 'undefined' ?
        extend({}, r, { loaders: [babelLoader] }) : r
    )
  },
  plugins: config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ])
})

const server = new WebpackDevServer(webpack(devServerConfig), {
  headers: { 'Access-Control-Allow-Origin': '*' },
  host: '0.0.0.0',
  hot: true,
  inline: true,
  port,
  proxy: { '*': { target: `http://0.0.0.0:${port - 1}` } },
  publicPath: config.output.publicPath,
  stats: {
    assets: true,
    assetsSort: false,
    cached: false,
    children: false,
    chunkModules: false,
    chunkOrigins: false,
    chunks: false,
    chunksSort: false,
    colors: true,
    context: false,
    errorDetails: true,
    hash: false,
    modules: false,
    modulesSort: false,
    reasons: false,
    source: false,
    timings: false,
    version: false
  }
})

server.listen(port, 'localhost', err => {
  if (err) console.log(err) // eslint-disable-line no-console

  // eslint-disable-next-line no-console
  console.log(`\n==> webpack-dev-server listening on ${port}\n`)
})
