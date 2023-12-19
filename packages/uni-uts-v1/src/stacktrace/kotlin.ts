import path from 'path'
import fs from 'fs-extra'
import { relative } from '../utils'
import { originalPositionFor, originalPositionForSync } from '../sourceMap'
import { generateCodeFrame, lineColumnToStartEnd, splitRE } from './utils'

export interface MessageSourceLocation {
  type: 'exception' | 'error' | 'warning' | 'info' | 'logging' | 'output'
  message: string
  file?: string
  line?: number
  column?: number
  code?: string
}

interface GenerateCodeFrameOptions {
  inputDir: string
  sourceMapDir: string
  replaceTabsWithSpace?: boolean
  format: (msg: MessageSourceLocation) => string
}

export function hbuilderFormatter(m: MessageSourceLocation) {
  const msgs: string[] = []
  let msg = m.type + ': ' + m.message
  if (m.type === 'warning') {
    // 忽略部分警告
    if (msg.includes(`Classpath entry points to a non-existent location:`)) {
      return ''
    }
    msg
      .replace(/\r\n/g, '\n')
      .split('\n')
      .forEach((m) => {
        msgs.push('\u200B' + m + '\u200B')
      })
  } else if (m.type === 'error' || m.type === 'exception') {
    msg
      .replace(/\r\n/g, '\n')
      .split('\n')
      .forEach((m) => {
        msgs.push('\u200C' + m + '\u200C')
      })
  } else {
    msgs.push(msg)
  }
  if (m.file) {
    if (m.file.includes('?')) {
      ;[m.file] = m.file.split('?')
    }
    msgs.push(`at ${m.file}:${m.line}:${m.column}`)
  }
  if (m.code) {
    msgs.push(m.code)
  }
  return msgs.join('\n')
}

export async function parseUTSKotlinStacktrace(
  messages: MessageSourceLocation[],
  options: GenerateCodeFrameOptions
) {
  if (typeof messages === 'string') {
    try {
      messages = JSON.parse(messages)
    } catch (e) {}
  }
  const msgs: string[] = []
  if (Array.isArray(messages) && messages.length) {
    for (const m of messages) {
      if (m.file) {
        const sourceMapFile = resolveSourceMapFile(
          m.file,
          options.sourceMapDir,
          options.inputDir
        )
        if (sourceMapFile) {
          const originalPosition = await originalPositionFor({
            sourceMapFile,
            line: m.line!,
            column: m.column!,
            withSourceContent: true,
          })

          if (originalPosition.source && originalPosition.sourceContent) {
            m.file = originalPosition.source.split('?')[0]
            if (originalPosition.line !== null) {
              m.line = originalPosition.line
            }
            if (originalPosition.column !== null) {
              m.column = originalPosition.column
            }
            if (
              originalPosition.line !== null &&
              originalPosition.column !== null
            ) {
              m.code = generateCodeFrame(originalPosition.sourceContent, {
                line: originalPosition.line,
                column: originalPosition.column,
              }).replace(/\t/g, ' ')
            }
          }
        }
      }
      const msg = options.format(m)
      if (msg) {
        msgs.push(msg)
      }
    }
  }
  return msgs.join('\n')
}

function resolveSourceMapFile(
  file: string,
  sourceMapDir: string,
  inputDir: string
) {
  const sourceMapFile = path.resolve(
    sourceMapDir,
    relative(file, inputDir) + '.map'
  )
  if (fs.existsSync(sourceMapFile)) {
    return sourceMapFile
  }
}

const DEFAULT_APPID = 'HBuilder'

function normalizeAppid(appid: string) {
  return appid.replace(/_/g, '')
}
function createRegExp(appid: string) {
  return new RegExp('uni\\.' + appid + '\\.(.*)\\..*\\(*\\.kt:([0-9]+)\\)')
}

let kotlinManifest = {
  mtimeMs: 0,
  manifest: {} as Record<string, string>,
}

export interface KotlinManifestCache {
  version: string
  env: Record<string, string>
  files: Record<string, Record<string, string>>
}
function updateUTSKotlinSourceMapManifestCache(cacheDir: string) {
  const manifestFile = path.resolve(cacheDir, 'src/.manifest.json')
  const stats = fs.statSync(manifestFile)
  if (stats.isFile()) {
    if (kotlinManifest.mtimeMs !== stats.mtimeMs) {
      const { files } = fs.readJSONSync(manifestFile) as KotlinManifestCache
      if (files) {
        const classManifest: Record<string, string> = {}
        Object.keys(files).forEach((name) => {
          const kotlinClass = files[name].class
          if (kotlinClass) {
            classManifest[kotlinClass] = name
          }
        })
        kotlinManifest.mtimeMs = stats.mtimeMs
        kotlinManifest.manifest = classManifest
      }
    }
  }
}

function parseFilenameByClassName(className: string) {
  return kotlinManifest.manifest[className.split('$')[0]] || 'index.kt'
}

function resolveSourceMapFileByKtFile(file: string, sourceMapDir: string) {
  const sourceMapFile = path.resolve(sourceMapDir, file + '.map')
  if (fs.existsSync(sourceMapFile)) {
    return sourceMapFile
  }
}

const COLORS: Record<string, string> = {
  warn: '\u200B',
  error: '\u200C',
}

interface GenerateRuntimeCodeFrameOptions {
  appid: string
  cacheDir: string
  logType?: 'log' | 'info' | 'warn' | 'debug' | 'error'
}

function resolveSourceMapDirByCacheDir(cacheDir: string) {
  return path.resolve(cacheDir, 'sourceMap')
}

export function parseUTSKotlinRuntimeStacktrace(
  stacktrace: string,
  options: GenerateRuntimeCodeFrameOptions
) {
  const appid = normalizeAppid(options.appid || DEFAULT_APPID)
  if (!stacktrace.includes('uni.' + appid + '.')) {
    return ''
  }
  updateUTSKotlinSourceMapManifestCache(options.cacheDir)
  const re = createRegExp(appid)
  const res: string[] = []
  const lines = stacktrace.split(splitRE)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const codes = parseUTSKotlinRuntimeStacktraceLine(
      line,
      re,
      resolveSourceMapDirByCacheDir(options.cacheDir)
    )
    if (codes.length && res.length) {
      const color = options.logType
        ? COLORS[options.logType as string] || ''
        : ''
      let error = 'error: ' + formatKotlinError(res[0], codes)
      if (color) {
        error = color + error + color
      }
      return [error, ...codes].join('\n')
    } else {
      res.push(line)
    }
  }
  return ''
}

function parseUTSKotlinRuntimeStacktraceLine(
  lineStr: string,
  re: RegExp,
  sourceMapDir: string
) {
  const lines: string[] = []
  const matches = lineStr.match(re)
  if (!matches) {
    return lines
  }

  const [, className, line] = matches
  const sourceMapFile = resolveSourceMapFileByKtFile(
    parseFilenameByClassName(className),
    sourceMapDir
  )
  if (!sourceMapFile) {
    return lines
  }
  const originalPosition = originalPositionForSync({
    sourceMapFile,
    line: parseInt(line),
    column: 0,
    withSourceContent: true,
  })
  if (originalPosition.source && originalPosition.sourceContent) {
    lines.push(
      `at ${originalPosition.source.split('?')[0]}:${originalPosition.line}:${
        originalPosition.column
      }`
    )
    if (originalPosition.line !== null && originalPosition.column !== null) {
      const { start, end } = lineColumnToStartEnd(
        originalPosition.sourceContent,
        originalPosition.line,
        originalPosition.column
      )
      lines.push(
        generateCodeFrame(originalPosition.sourceContent, start, end).replace(
          /\t/g,
          ' '
        )
      )
    }
  }
  return lines
}

interface Formatter {
  format(error: string, codes: string[]): string | undefined
}

const formatters: Formatter[] = [
  {
    format(error, codes) {
      if (error.includes('Failed resolution of: L')) {
        let isUniExtApi =
          error.includes('uts/sdk/modules/DCloudUni') ||
          error.includes('io/dcloud/uniapp/extapi/')
        let isUniCloudApi =
          !isUniExtApi && error.includes('io/dcloud/unicloud/UniCloud')
        if (isUniExtApi || isUniCloudApi) {
          let api = ''
          // 第一步先遍历查找^^^^^的索引
          const codeFrames = codes[codes.length - 1].split(splitRE)
          const index = codeFrames.findIndex((frame) => frame.includes('^^^^^'))
          if (index > 0) {
            // 第二步，取前一条记录，查找uni.开头的api
            api = findApi(
              codeFrames[index - 1],
              isUniCloudApi ? UNI_CLOUD_API_RE : UNI_API_RE
            )
          }
          if (api) {
            api = `api ${api}`
          } else {
            api = `您使用到的api`
          }
          return `[EXCEPTION] 当前运行的基座未包含${api}，请重新打包自定义基座再运行。`
        }
      }
    },
  },
]

const UNI_API_RE = /(uni\.\w+)/
const UNI_CLOUD_API_RE = /(uniCloud\.\w+)/
function findApi(msg: string, re: RegExp) {
  const matches = msg.match(re)
  if (matches) {
    return matches[1]
  }
  return ''
}

function formatKotlinError(error: string, codes: string[]): string {
  for (const formatter of formatters) {
    const err = formatter.format(error, codes)
    if (err) {
      return err
    }
  }
  return error
}