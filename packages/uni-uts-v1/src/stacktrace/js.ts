import { originalPositionForSync } from '../sourceMap'
import {
  COLORS,
  type GenerateRuntimeCodeFrameOptions,
  generateCodeFrame,
  lineColumnToStartEnd,
  resolveSourceMapDirByCacheDir,
  resolveSourceMapFileBySourceFile,
  splitRE,
} from './utils'

interface GenerateJavaScriptRuntimeCodeFrameOptions
  extends GenerateRuntimeCodeFrameOptions {}
const JS_ERROR_RE = /\(\d+:\d+\)\s(.*)\s@([^\s]+\.js)\:(\d+)\:(\d+)/
const VUE_ERROR_RE = /@([^\s]+\.js)\:(\d+)\:(\d+)/

// app-service.js(4:56) ReferenceError:Can't find variable: a @app-service.js:4:56
export function parseUTSJavaScriptRuntimeStacktrace(
  stacktrace: string,
  options: GenerateJavaScriptRuntimeCodeFrameOptions
) {
  const res: string[] = []
  const lines = stacktrace.split(splitRE)
  const sourceMapDir = resolveSourceMapDirByCacheDir(options.cacheDir)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    let codes = parseUTSJavaScriptRuntimeStacktraceJsErrorLine(
      line,
      sourceMapDir
    )
    if (codes.length) {
      const color = options.logType
        ? COLORS[options.logType as string] || ''
        : ''
      const [errorCode, ...other] = codes
      let error = 'error: ' + errorCode
      if (color) {
        error = color + error + color
      }
      return [error, ...other].join('\n')
    }
    codes = parseUTSJavaScriptRuntimeStacktraceVueErrorLine(line, sourceMapDir)
    if (codes.length && res.length) {
      const color = options.logType
        ? COLORS[options.logType as string] || ''
        : ''
      let error = 'error: ' + res[0]
      if (color) {
        error = color + error + color
      }
      const [, ...other] = res
      const otherCodes = other.map((item) => {
        if (color) {
          return color + item + color
        }
        return item
      })
      return [error, ...otherCodes, ...codes].join('\n')
    }

    res.push(line)
  }
  return ''
}

// at <Index __pageId=1 __pagePath="pages/index/index" __pageQuery=  ... >
// Can't find variable: a
// onLoad@app-service.js:9:64
// callWithErrorHandling@uni-app-x-framework.js:2279:23
function parseUTSJavaScriptRuntimeStacktraceVueErrorLine(
  lineStr: string,
  sourceMapDir: string
) {
  const lines: string[] = []
  const matches = lineStr.match(VUE_ERROR_RE)
  if (!matches) {
    return lines
  }
  const [, filename, line] = matches
  const sourceMapFile = resolveSourceMapFileBySourceFile(filename, sourceMapDir)
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

function parseUTSJavaScriptRuntimeStacktraceJsErrorLine(
  lineStr: string,
  sourceMapDir: string
) {
  const lines: string[] = []
  const matches = lineStr.match(JS_ERROR_RE)
  if (!matches) {
    return lines
  }
  const [, error, filename, line] = matches
  const sourceMapFile = resolveSourceMapFileBySourceFile(filename, sourceMapDir)
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
    lines.push(error)
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
