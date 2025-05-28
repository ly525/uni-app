import {
  MapType,
  getMapInfo,
  IS_AMAP
} from '../../../../helpers/location'
import { createCallout } from './callout'

let maps
const callbacksMap = {}
const GOOGLE_MAP_CALLBACKNAME = '__map_callback__'

/**
 * @description 加载地图脚本
 * @param {Array} libraries 需要加载的地图组件，比如 geometry（几何计算库）
 * @param {Function} callback 回调函数
 */
export function loadMaps (libraries, callback) {
  const mapInfo = getMapInfo()
  if (!mapInfo.key) {
    console.error('Map key not configured.')
    return
  }
  const callbacks = (callbacksMap[mapInfo.type] = callbacksMap[mapInfo.type] || [])
  if (maps) {
    callback(maps)
  } else if (
    window[mapInfo.type] &&
    window[mapInfo.type].maps
  ) {
    // 是高德地图 ? window.AMap : window.qq.maps
    maps = IS_AMAP ? window[mapInfo.type] : window[mapInfo.type].maps
    // callout 参考：https://developers.weixin.qq.com/miniprogram/dev/component/map.html#marker
    maps.Callout = maps.Callout || createCallout(maps)
    callback(maps)
  } else if (callbacks.length) {
    callbacks.push(callback)
  } else {
    callbacks.push(callback)
    const globalExt = window
    const callbackName = GOOGLE_MAP_CALLBACKNAME + mapInfo.type
    globalExt[callbackName] = function () {
      delete globalExt[callbackName]
      maps = IS_AMAP ? window[mapInfo.type] : window[mapInfo.type].maps
      maps.Callout = createCallout(maps)
      callbacks.forEach((callback) => callback(maps))
      callbacks.length = 0
    }
    const script = document.createElement('script')
    let src = getScriptBaseUrl(mapInfo.type)

    if (mapInfo.type === MapType.QQ) {
      // 腾讯地图：JavaScript API几何计算库 
      // https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocGeometry 
      // 比如计算多边形中心坐标点
      libraries.push('geometry')
    }
    if (libraries.length) {
      src += `libraries=${libraries.join('%2C')}&`
    }

    if (IS_AMAP) {
      handleAMapSecurityPolicy(mapInfo)
    }
    script.src = `${src}key=${mapInfo.key}&callback=${callbackName}`
    script.onerror = function () {
      console.error('Map load failed.')
    }
    document.body.appendChild(script)
  }
}

function getScriptBaseUrl (mapType) {
  const urlMap = {
    // https://lbs.qq.com/webApi/javascriptV2/jsGuide/jsQuick
    // 类似这样： <script charset="utf-8" src="https://map.qq.com/api/js?v=2.exp&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77"></script>
    qq: 'https://map.qq.com/api/js?v=2.exp&',
    google: 'https://maps.googleapis.com/maps/api/js?',
    AMap: 'https://webapi.amap.com/maps?v=2.0&'
  }

  return urlMap[mapType]
}

function handleAMapSecurityPolicy (mapInfo) {
  window._AMapSecurityConfig = {
    securityJsCode: mapInfo.securityJsCode || '',
    serviceHost: mapInfo.serviceHost || ''
  }
}
