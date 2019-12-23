/**
 * webpack base service
 * Author: yangxi
 */

const path = require('path')
const StyleLintPlugin = require('stylelint-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const NODE_ENV = process.env.NODE_ENV

module.exports = {
  output: {},

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      path.resolve(__dirname, '../node_modules'),
      path.resolve(__dirname, '../src')
    ],
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },

  externals: { 'vue': 'Vue', 'axios': 'axios', 'vue-router': 'VueRouter' },

  resolveLoader: {
    modules: ['node_modules']
  },

  module: {
    rules: [{
      enforce: 'pre', // pre check
      test: /\.vue$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
      include: [path.resolve(__dirname, '../src')],
      options: {
        // formatter: require('eslint-friendly-formatter'),
        emitWarning: false
      }
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      options: {
        // This is a feature of `babel-loader` for webpack (not Babel itself).
        // It enables caching results in ./node_modules/.cache/babel-loader/
        // directory for faster rebuilds.
        cacheDirectory: NODE_ENV === 'dev'
      }
    }, {
      test: /\.vue$/,
      use: [{
        loader: 'vue-loader',
        options: {
          cacheDirectory: NODE_ENV === 'dev'
        }
      }],
      exclude: /node_modules/
    }, {
      test: /\.(eot|woff2?|ttf|svg)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: path.posix.join(NODE_ENV === 'dev' ? '' : '/', 'fonts/[name].[hash:7].[ext]')
          }
        }
      ]
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: path.posix.join(NODE_ENV === 'dev' ? '' : '/', 'imgs/[name].[hash:7].[ext]')
          }
        }
      ]
    }]
  },

  optimization: {},

  plugins: [
    new StyleLintPlugin({
      // 正则匹配想要lint监测的文件
      files: ['src/style/*.less', 'src/views/**/*.less']
    }),
    new VueLoaderPlugin()
    // new CopyWebpackPlugin([{
    //   from: 'vendors',
    //   to: `vendors`
    // }])
  ]
}
