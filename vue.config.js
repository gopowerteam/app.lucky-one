const aliasExtned = require('./extends/alias.extend')

module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  publicPath: './',
  pages: {
    index: {
      entry: 'src/app.ts'
    }
  },
  pluginOptions: {
    quasar: {
      treeShake: true
    }
  },
  transpileDependencies: [/[\\\/]node_modules[\\\/]quasar[\\\/]/],
  chainWebpack: function(config) {
    // 别名扩展
    aliasExtned(config)
  },
  devServer: {
    host: '0.0.0.0'
  }
}
