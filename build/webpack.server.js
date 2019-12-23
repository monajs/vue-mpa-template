/**
 * webpack server config
 * Author: yangxi
 */

const path = require('path')

const serverConf = {
  contentBase: path.resolve(__dirname, '../src'),
  progress: false,
  hot: true,
  inline: true,
  proxy: {
    '/newapi/*': {
      target: 'http://sit-m.meitun.com',
      changeOrigin: true
    },
    '/mobile/*': {
      target: 'http://sit-m.meitun.com',
      changeOrigin: true
    }
  },
  historyApiFallback: true,
  disableHostCheck: true,
  stats: {
    colors: true
  }
}

module.exports = serverConf

