/**
 * webpack build service
 * Author: yangxi
 */

const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const fs = require('fs-extra')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const config = require('./webpack.base')
const { log, renderAscii } = require('./core/util')
const Spinner = require('./core/spinner')
const { outputFile, publicPath } = require('./app.conf')
const { getViews } = require('./core/util')
const NODE_ENV = process.env.NODE_ENV

config.mode = 'production'

const entry = {}
getViews().forEach(view => {
  entry[view] = []
  entry[view].push(`./src/views/${view}/index.js`)
})

config.entry = entry

Object.assign(config.output, {
  filename: 'js/[name].[chunkhash].js',
  chunkFilename: 'js/[name].[chunkhash].js',
  publicPath: `${publicPath}/static/`,
  path: path.resolve(__dirname, `../${outputFile}/static`)
})

Object.assign(config.optimization || {}, {
  splitChunks: {
    cacheGroups: {
      //打包重复出现的代码
      vendor: {
        name: 'commons',
        chunks: 'initial',
        minChunks: 2,
        maxInitialRequests: 5, // The default limit is too small to showcase the effect
        minSize: 0
      }
    }
  }
})

config.module.rules = config.module.rules.concat([
  {
    test: /\.(less|css)$/,
    use: ExtractTextPlugin.extract({
      use: [
        'css-loader',
        'postcss-loader',
        'less-loader'
      ]
    })
  }
])

const htmlWebpackPlugins = []
getViews().forEach(view => {
  htmlWebpackPlugins.push(
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, `../${outputFile}/${view}/index.html`),
      template: 'index.html',
      static: `${publicPath}/static/vendors/`,
      chunks: [view, 'commons'],
      env: NODE_ENV
    })
  )
})

config.plugins = [].concat(
  [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, `../${outputFile}`)]
    })
  ],
  config.plugins || [],
  [
    new webpack.DefinePlugin({
      DEBUG: false,
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    //想看包文件的情况，可以打开
    // new BundleAnalyzerPlugin(),
    new ExtractTextPlugin({
      filename: 'css/[name].[chunkhash].css',
      allChunks: true
    })
  ],
  htmlWebpackPlugins,
  new ScriptExtHtmlWebpackPlugin({
    custom: {
      test: /.js$/,
      attribute: 'crossorigin',
      value: 'anonymous'
    }
  })
)

const spinner = new Spinner('building...')
spinner.start()
webpack(config, (err, stats) => {
  spinner.stop()
  if (err) throw err

  log.info(stats.toString({
    colors: true
  }))

  if (stats.hasErrors()) {
    log.error('Build failed with errors.')
    process.exit(1)
  }
  renderAscii()
  log.success('Build success!')
})

