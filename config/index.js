'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')


module.exports = {

  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      //代理的方式上来看 应该是可以配置多个
      //当前拦截为静态资源部分 进行的反向代理的替换 代理后看不到后面的真是接口
      // 网路端可是使用nginx 进行请求变更
      '/VueChangeHeader': {
        // target: 'http://localhost:8443/pkServer',
        target: 'http://47.105.126.176:8443/pkServer',
        changeOrigin: true,
        pathRewrite: {
          '^/VueChangeHeader': ''
        }
        // ,
        // '/pkServer': {
        //   target: 'http://localhost:8443/pkServer',
        //   changeOrigin: true,
        //   pathRewrite: {
        //
        //   }
        // }
      }
    },

    // Various Dev Server settings
    // host: '47.105.126.176', // can be overwritten by process.env.HOST 远程连接阿里云
    host: 'localhost', // can be overwritten by process.env.HOST  本地运行
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    // port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },
  build: {

    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    /**
     * Source Maps
     *
     *
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
