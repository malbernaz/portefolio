const { resolve } = require('path')
const { union } = require('underscore')
const webpack = require('webpack')
// const OfflinePlugin = require('offline-plugin')

const baseConfig = require('./webpack.config')

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', minChunks: Infinity }),
  new webpack.ContextReplacementPlugin(/moment\/locale$/, /^\.\/(en)$/),
  // new OfflinePlugin({
  //   AppCache: false,
  //   caches: {
  //     main: [
  //       'scripts/main.bundle.js',
  //       'scripts/vendor.bundle.js'
  //     ],
  //     additional: [],
  //     optional: [
  //       '/',
  //       '/about',
  //       '/admin',
  //       '/admin/editor',
  //       '/contact',
  //       '/pagenotfound'
  //     ]
  //   },
  //   externals: [
  //     '/',
  //     '/about',
  //     '/contact',
  //     '/pagenotfound',
  //     '/admin',
  //     '/admin/editor'
  //   ],
  //   publicPath: '/',
  //   relativePaths: false,
  //   safeToUseOptionalCaches: true,
  //   version: 'v-[hash]',
  //   ServiceWorker: {
  //     output: 'sw.js',
  //     scope: '/'
  //   }
  // })
]

const prodPlugins = union(plugins, [
  new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
  new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
    output: { comments: false },
    sourceMap: false
  })
])

module.exports = env => Object.assign(baseConfig(env), {
  context: resolve(__dirname, 'src'),
  entry: {
    main: './client.js',
    vendor: ['react', 'react-router', 'moment']
  },
  output: {
    path: resolve(__dirname, 'dist', 'public'),
    filename: 'scripts/[name].bundle.js',
    publicPath: '/',
  },
  plugins: env === 'prod' ? prodPlugins : plugins,
  devtool: env === 'prod' ? 'hidden-source-map' : 'cheap-module-source-map'
})
