const path = require('path')

const crypto = require('crypto')

/**
 * The MD4 algorithm is not available anymore in Node.js 17+ (because of library SSL 3).
 * In that case, silently replace MD4 by the MD5 algorithm.
 */
try {
  crypto.createHash('md4')
} catch (e) {
  // console.warn('Crypto "MD4" is not supported anymore by this Node.js version');
  const origCreateHash = crypto.createHash
  crypto.createHash = (alg, opts) => {
    return origCreateHash(alg === 'md4' ? 'md5' : alg, opts)
  }
}

const {
  manifestPlatformOptions
} = require('./lib/env')

const {
  assetsDir
} = require('./lib/copy-webpack-options')

require('./lib/check-update')()

const initBuildCommand = require('./commands/build')
const initServeCommand = require('./commands/serve')

// api 为 vue-cli-service 实例，PluginAPI {id: '@dcloudio/vue-cli-plugin-uni', service: Service}
// options 为 vue.config.js 导出的对象
module.exports = (api, options) => {
  initServeCommand(api, options)

  initBuildCommand(api, options)

  if (process.env.UNI_PLATFORM === 'quickapp-native') {
    process.env.UNI_OUTPUT_DIR = path.resolve(process.env.UNI_OUTPUT_DIR, 'build')
    Object.assign(options, {
      assetsDir,
      parallel: false,
      outputDir: process.env.UNI_OUTPUT_DIR
    })
    require('./lib/options')(options)
    const platformOptions = {
      webpackConfig: {},
      chainWebpack () {}
    }
    const manifestPlatformOptions = {}
    api.configureWebpack(require('./lib/configure-webpack')(platformOptions, manifestPlatformOptions, options, api))
    api.chainWebpack(require('./lib/chain-webpack')(platformOptions, options, api))

    const vueConfig = require('@dcloudio/uni-quickapp-native/lib/vue.config.js')
    api.configureWebpack(vueConfig.configureWebpack)
    api.chainWebpack(vueConfig.chainWebpack)
    return
  }

  const type = ['app-plus', 'h5'].includes(process.env.UNI_PLATFORM)
    ? process.env.UNI_PLATFORM
    : 'mp'

  const platformOptions = require('./lib/' + type)

  let vueConfig = platformOptions.vueConfig

  if (typeof vueConfig === 'function') {
    vueConfig = vueConfig(options, api)
  }

  if (options.pages) {
    // h5平台 允许 vue.config.js pages 覆盖，其他平台移除 pages 配置
    if (process.env.UNI_PLATFORM === 'h5') {
      delete vueConfig.pages
    } else {
      delete options.pages
    }
  }

  Object.assign(options, { // TODO 考虑非 HBuilderX 运行时，可以支持自定义输出目录
    outputDir: process.env.UNI_OUTPUT_TMP_DIR || process.env.UNI_OUTPUT_DIR,
    assetsDir
  }, vueConfig) // 注意，此处目前是覆盖关系，后续考虑改为webpack merge逻辑

  require('./lib/options')(options)

  api.configureWebpack(require('./lib/configure-webpack')(platformOptions, manifestPlatformOptions, options, api))
  api.chainWebpack(require('./lib/chain-webpack')(platformOptions, options, api))

  global.uniPlugin.configureWebpack.forEach(configureWebpack => {
    api.configureWebpack(function (webpackConfig) {
      return configureWebpack(webpackConfig, options)
    })
  })
  global.uniPlugin.chainWebpack.forEach(chainWebpack => {
    api.chainWebpack(function (webpackConfig) {
      return chainWebpack(webpackConfig, options)
    })
  })
}

const args = require('minimist')(process.argv.slice(2))

module.exports.defaultModes = {
  'uni-serve': args.mode || 'development',
  'uni-build': args.mode || process.env.NODE_ENV
}
