const { resolve } = require('path')
const webpack = require('webpack')
const baseConfig = require('./webpack.config')

const prodPlugs = [
  new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', minChunks: Infinity }),
  new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
  new webpack.ContextReplacementPlugin(/moment\/locale$/, /^\.\/(pt-br)\.js$/),
  new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
    output: { comments: false },
    sourceMap: false
  })
]

const devPlugs = [
  new webpack.optimize.CommonsChunkPlugin({ names: 'vendor', minChunks: Infinity }),
  new webpack.ContextReplacementPlugin(/moment\/locale$/, /^\.\/(en)$/)
]

module.exports = env => Object.assign(baseConfig, {
  context: resolve(__dirname, 'src'),
  entry: {
    main: './client.js',
    vendor: ['react', 'react-router', 'moment', 'highlight.js', 'codemirror', 'marked']
  },
  output: {
    path: resolve(__dirname, 'dist', 'public', 'scripts'),
    filename: '[name].bundle.js'
  },
  plugins: env === 'prod' ? prodPlugs : devPlugs,
  devtool: env === 'prod' ? 'hidden-source-map' : 'cheap-module-source-map'
})
