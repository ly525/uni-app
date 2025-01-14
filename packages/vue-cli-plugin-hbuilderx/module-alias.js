const path = require('path')
const moduleAlias = require('module-alias')

const {
  hasModule,
  isInHBuilderX
} = require('@dcloudio/uni-cli-shared')

// nvue override
moduleAlias.addAlias('weex-styler', path.resolve(__dirname, 'packages/weex-styler'))
moduleAlias.addAlias('weex-template-compiler', path.resolve(__dirname, 'packages/weex-template-compiler'))
moduleAlias.addAlias('./compileTemplate', path.resolve(__dirname,
  'packages/webpack-uni-nvue-loader/lib/compileTemplate'))
moduleAlias.addAlias('./codegen/styleInjection', path.resolve(__dirname,
  'packages/webpack-uni-nvue-loader/lib/styleInjection'))
moduleAlias.addAlias('./templateLoader', (fromPath, request, alias) => {
  if (fromPath.indexOf('vue-loader') !== -1) {
    return path.resolve(__dirname, 'packages/webpack-uni-nvue-loader/lib/templateLoader')
  }
  return request
})

if (isInHBuilderX) {
  moduleAlias.addAlias('typescript', path.resolve(process.env.UNI_HBUILDERX_PLUGINS,
    'compile-typescript/node_modules/typescript'))
  moduleAlias.addAlias('less', path.resolve(process.env.UNI_HBUILDERX_PLUGINS,
    'compile-less/node_modules/less'))
  moduleAlias.addAlias('node-sass', path.resolve(process.env.UNI_HBUILDERX_PLUGINS,
    'compile-node-sass/node_modules/node-sass-china'))
  moduleAlias.addAlias('stylus', path.resolve(process.env.UNI_HBUILDERX_PLUGINS,
    'compile-stylus/node_modules/stylus'))
  moduleAlias.addAlias('pug', path.resolve(process.env.UNI_HBUILDERX_PLUGINS,
    'compile-pug-cli/node_modules/pug'))

  if (!hasModule('typescript')) { // 因为 cli-plugin-typescript 会直接读取typescript/package.json，故，如果未安装 typescript，则先设置一个假的
    moduleAlias.addAlias('typescript/package.json', path.resolve(__dirname, 'typescript.json'))
    moduleAlias.addAlias('fork-ts-checker-webpack-plugin', path.resolve(__dirname,
      'fork-ts-checker-webpack-plugin.fake.js'))
  }
}
