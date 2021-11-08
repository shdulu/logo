/* eslint-disable @typescript-eslint/no-var-requires */
// const webpack = require('webpack')

// const BundleAnalyzerPlugin =
//   require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const isStaging = !!process.env.VUE_APP_STAGINE
const isProduction = process.env.NODE_ENV === 'production'
// const isAnalyzeMode = !!process.env.ANALYZE_MODE

module.exports = {
  publicPath:
    isProduction && !isStaging ? 'https://oss.imooc-lego.com/editor' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: !isProduction,
  productionSourceMap: !isProduction,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#3E7FFF'
          },
          javascriptEnabled: true
        }
      }
    }
  },
  devServer: {
    open: true,
    port: 9000,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7001',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
