/**
 * webpack server
 * Author: yangxi
 */

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const webpackServer = require('webpack-dev-server')
const config = require('./webpack.base')
const webpackServerConf = require('./webpack.server')
const { log } = require('./core/util')
const appConf = require('./app.conf')
const NODE_ENV = process.env.NODE_ENV
const currentPage = process.env.npm_config_page

if (!currentPage) {
  log.error('Please start server with page param, you can try again!\n "npm start --page=home"')
  throw new Error('Please start server with page param, you can try again!\n "npm start --page=home"')
}

config.mode = 'development'

// Enable sourcemaps for debugging webpack's output.
config.devtool = 'eval-source-map'

config.entry = {
  [currentPage]: [`./src/views/${currentPage}/index.js`]
}

Object.assign(config.output, {
  filename: '[name].js',
  chunkFilename: '[name].js',
  publicPath: '/'
})

config.entry[currentPage].unshift('webpack-dev-server/client?http://' + appConf.serverName + ':' + appConf.port + '/', 'webpack/hot/dev-server')

config.module.rules = config.module.rules.concat([
  {
    test: /\.(less|css)$/,
    use: [
      'style-loader',
      'css-loader',
      'postcss-loader',
      {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true
        }
      }]
  }
])

const appWebPath = 'http://' + appConf.serverName + ':' + appConf.port

config.plugins = (config.plugins || []).concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new ExtractTextPlugin({
    fallback: 'style-loader',
    filename: '[name].css'
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'index.html',
    static: 'vendors/',
    env: NODE_ENV
  }),

  new webpack.DefinePlugin({
    DEBUG: true
  }),
  new OpenBrowserPlugin({ url: appWebPath })
])

const compiler = webpack(config)
const webServer = new webpackServer(compiler, webpackServerConf)
webServer.listen(appConf.port, appConf.serverName)
