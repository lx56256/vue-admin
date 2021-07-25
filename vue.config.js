'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || '后台配置' // page title

const port = process.env.port || process.env.npm_config_port || 9527 // dev port

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
  },
  configureWebpack: {
    name,
    externals: {
      'axios': 'axios',
      'vue': 'Vue',
      'vuex': 'Vuex',
      'vue-router': 'VueRouter',
      'element-ui/lib': 'ELEMENT',
    },
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
  },
  chainWebpack(config) {
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/, /\.js$/],
        include: 'initial'
      }
    ])
    config.plugins.delete('prefetch')
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config.plugin('webpack-bundle-analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
          config
            .devtool('cheap-module-eval-source-map')
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              defaultAttribute: 'async',
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              minSize: 20000,
              minChunks: 1,
              maxAsyncRequests: 30,
              maxInitialRequests: 30,
              automaticNameDelimiter: '~',
              name: true,
              cacheGroups: {
                corejsmoudles: {
                  name: 'corejsmoudles', // split elementUI into a single package
                  priority: 50, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]?core-js[\\/]modules[\\/](.*)/,
                  // minChunks: 2,
                  reuseExistingChunk: true,
                },
                corejsInternalsSomeJS: {
                  name: 'corejsInternalsSomeJS', // split elementUI into a single package
                  priority: 70, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]?core-js[\\/]internals[\\/](fix-regexp-well-known-symbol-logic|define-interator|regexp-exec|object-create|array-interation|export|internal-state|array-from|intertors-core|redefine|get-substitution)\.js$/,
                  // minChunks: 2,
                  reuseExistingChunk: true,
                },
                corejsInternals: {
                  name: 'corejsInternals', // split elementUI into a single package
                  priority: 60, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]?core-js[\\/]internals[\\/](.*)/,
                  // minChunks: 2,
                  reuseExistingChunk: true,
                },
                vuebabelPreset1: {
                  name: 'vuebabelPreset1', // split elementUI into a single package
                  priority: 70, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]?@vue[\\/]babel-preset-app[\\/]node_modules[\\/]core-js[\\/]internals[\\/](.*)/,
                  // minChunks: 2,
                  reuseExistingChunk: true,
                },
                vuebabelPreset2: {
                  name: 'vuebabelPreset2', // split elementUI into a single package
                  priority: 70, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]?@vue[\\/]babel-preset-app[\\/]node_modules[\\/]core-js[\\/]modules[\\/](.*)/,
                  // minChunks: 2,
                  reuseExistingChunk: true,
                },
                corejslibrary: {
                  name: 'corejslibrary', // split elementUI into a single package
                  priority: 60, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]?core-js[\\/]library[\\/](.*)/,
                  // minChunks: 2,
                  reuseExistingChunk: true,
                },
                babelRuntime: {
                  name: 'babelRuntime', // split elementUI into a single package
                  priority: 60, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]?babel-runtime[\\/]/,
                  // minChunks: 2,
                  reuseExistingChunk: true,
                },
                generatorRuntime: {
                  name: 'generatorRuntime', // split elementUI into a single package
                  priority: 60, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]?regenerator-runtime[\\/]/,
                  // minChunks: 2,
                  reuseExistingChunk: true,
                },
                asyncValidator: {
                  name: 'asyncValidator', // split elementUI into a single package
                  priority: 60, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]?async-vaildator[\\/]?es[\\/]/,
                  // minChunks: 2,
                  reuseExistingChunk: true,
                },
                resiezeObsverver: {
                  name: 'resiezeObsverver', // split elementUI into a single package
                  priority: 60, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]?resize-observer-polyfill[\\/]?dist[\\/]/,
                  // minChunks: 2,
                  reuseExistingChunk: true,
                },
                svgLoaderRunTime: {
                  name: 'vsgLoaderRunTime', // split elementUI into a single package
                  priority: 60, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]?svg-sprite-loader[\\/]?runtime[\\/]/,
                  // minChunks: 2,
                  reuseExistingChunk: true,
                },
                wheelNprogress: {
                  name: 'wheelNprogress', // split elementUI into a single package
                  priority: 60, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]?(normalize-wheel|nprogress|path-browserify)[\\/]?/,
                  // minChunks: 2,
                  reuseExistingChunk: true,
                },
                defaultChunk: {
                  name: 'defaultChunk', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]/,
                  // minChunks: 2,
                },
                icons: {
                  name: 'svgicons', // split elementUI into a single package
                  priority: 30, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: resolve('./src/icons'),
                  // minChunks: 2,
                  reuseExistingChunk: true,
                },
                router: {
                  name: 'router', // split elementUI into a single package
                  priority: 31, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: resolve('./src/router/index.js'),
                  // minChunks: 2,
                  reuseExistingChunk: true,
                },
                store: {
                  name: 'store', // split elementUI into a single package
                  priority: 32, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: resolve('./src/store/index.js'),
                  // minChunks: 2,
                  reuseExistingChunk: true,
                },
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk(true)
        }
      )
  }
}
