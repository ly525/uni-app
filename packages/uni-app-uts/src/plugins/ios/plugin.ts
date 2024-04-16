import path from 'path'
import fs from 'fs-extra'
import {
  APP_SERVICE_FILENAME,
  type UniVitePlugin,
  buildUniExtApis,
  emptyDir,
  injectCssPlugin,
  injectCssPostPlugin,
  normalizePath,
  resolveMainPathOnce,
} from '@dcloudio/uni-cli-shared'
import { configResolved, createUniOptions } from '../utils'
import { uniAppCssPlugin } from './css'

export function uniAppIOSPlugin(): UniVitePlugin {
  const inputDir = process.env.UNI_INPUT_DIR
  const outputDir = process.env.UNI_OUTPUT_DIR
  // 开始编译时，清空输出目录
  function emptyOutDir() {
    if (fs.existsSync(outputDir)) {
      emptyDir(outputDir)
    }
  }
  emptyOutDir()
  return {
    name: 'uni:app-uts',
    apply: 'build',
    uni: createUniOptions('ios'),
    config() {
      return {
        base: '/', // 强制 base
        build: {
          sourcemap: process.env.NODE_ENV === 'development' ? 'hidden' : false,
          emptyOutDir: false,
          assetsInlineLimit: 0,
          rollupOptions: {
            input: resolveMainPathOnce(inputDir),
            external: ['vue', '@vue/shared'],
            output: {
              name: 'AppService',
              banner: ``,
              format: 'iife',
              entryFileNames: APP_SERVICE_FILENAME,
              globals: {
                vue: 'Vue',
                '@vue/shared': 'uni.VueShared',
              },
              sourcemapPathTransform: (relativeSourcePath, sourcemapPath) => {
                return normalizePath(
                  path.relative(
                    process.env.UNI_INPUT_DIR,
                    path.resolve(
                      path.dirname(sourcemapPath),
                      relativeSourcePath
                    )
                  )
                )
              },
            },
          },
        },
      }
    },
    configResolved(config) {
      configResolved(config)
      injectCssPlugin(config)
      injectCssPostPlugin(config, uniAppCssPlugin(config))
    },
    generateBundle(_, bundle) {
      const APP_SERVICE_FILENAME_MAP = APP_SERVICE_FILENAME + '.map'
      const appServiceMap = bundle[APP_SERVICE_FILENAME_MAP]
      if (appServiceMap && appServiceMap.type === 'asset') {
        fs.outputFileSync(
          path.resolve(
            process.env.UNI_OUTPUT_DIR,
            '../.sourcemap/app-ios',
            APP_SERVICE_FILENAME_MAP
          ),
          appServiceMap.source
        )
        delete bundle[APP_SERVICE_FILENAME_MAP]
      }
    },
    async writeBundle() {
      // x 上暂时编译所有uni ext api，不管代码里是否调用了
      await buildUniExtApis()
    },
  }
}
