/**
 * 
 * JS高程知识点
 *  - navigator.geolocation
 *  - JSONP
 *    - 地图 JS Service API 请求
 *    - 地图 JS 资源加载
 * 
 * 
 * H5 获取定位的核心思路：
 * - 尝试使用 navigator.geolocation.getCurrentPosition 获取定位
 *  - 成功，返回定位信息
 *       - 投放端场景
 *          - 在 App WebView，打开H5页面，比如美团App中的企业点餐模块
 *          - 在系统浏览器中，打开H5
 *       - 权限
 *          - GPS 是否开启
 *          - App 获取GPS定位权限
 *          - H5 获取定位权限
 * 
 *  - 失败，可调用服务端接口
 *      - 服务端通过 request.IP，利用一些 IPGeo 库，在这些库里面检索，找到IP对应的城市/区县对应的经纬度（城市一般是能获取到的，区县待定，取决于是否氪金）
 *      - 一般是返回省市区对应的政府所在位置的经纬度
 * 
 * 
 * getLocation 整体思路：
 * 
 * 1. 尝试使用浏览器的 navigator.geolocation.getCurrentPosition 获取定位
 * 2. 降级到使用腾讯地图 JS Service API 获取定位
 * 3. 降级到使用Google地图 JS Service API 获取定位
 * 4. 降级到使用高德地图 JS Service API 获取定位
 * 
 * 2、3、4 对应的JS Service API 的核心技术实现：其实也是类似上面的核心思路：即腾讯/Google/高德 根据请求的IP去获取对应的省市区，然后找到这个省市区对应的经纬度
 * 
 * 
 */
import {
  getJSONP
} from '../../../helpers/get-jsonp'
import {
  MapType,
  getMapInfo,
  translateCoordinateSystem
} from '../../../helpers/location'
import { loadMaps } from '../../../view/components/map/maps'

/**
 * 获取定位信息
 * @param {*} options
 * @param {*} callbackId
 */
export function getLocation ({
  type,
  altitude,
  isHighAccuracy,
  highAccuracyExpireTime
}, callbackId) {
  const {
    invokeCallbackHandler: invoke
  } = UniServiceJSBridge
  const mapInfo = getMapInfo()

  new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(res => resolve({ coords: res.coords }), reject, {
        enableHighAccuracy: isHighAccuracy || altitude,
        // 比较有意思的一个case，如果APP端没有获取定位权限，H5可能会长时间等待
        timeout: highAccuracyExpireTime || 1000 * 100
      })
    } else {
      reject(new Error('device nonsupport geolocation'))
    }
  }).catch(() => {
    return new Promise((resolve, reject) => {
      if (mapInfo.type === MapType.QQ) {
        getJSONP(`https://apis.map.qq.com/ws/location/v1/ip?output=jsonp&key=${mapInfo.key}`, {
          callback: 'callback'
        }, (res) => {
          if ('result' in res && res.result.location) {
            const location = res.result.location
            resolve({
              coords: {
                latitude: location.lat,
                longitude: location.lng
              },
              skip: true
            })
          } else {
            reject(new Error(res.message || JSON.stringify(res)))
          }
        }, () => reject(new Error('network error')))
      } else if (mapInfo.type === MapType.GOOGLE) {
        uni.request({
          method: 'POST',
          url: `https://www.googleapis.com/geolocation/v1/geolocate?key=${mapInfo.key}`,
          success (res) {
            const data = res.data
            if ('location' in data) {
              resolve({
                coords: {
                  latitude: data.location.lat,
                  longitude: data.location.lng,
                  accuracy: data.accuracy
                },
                skip: true
              })
            } else {
              reject(new Error((data.error && data.error.message) || JSON.stringify(res)))
            }
          },
          fail () {
            reject(new Error('network error'))
          }
        })
      } else if (mapInfo.type === MapType.AMAP) {
        loadMaps([], () => {
          window.AMap.plugin('AMap.Geolocation', () => {
            const geolocation = new window.AMap.Geolocation({
              enableHighAccuracy: true,
              timeout: 10000
            })

            geolocation.getCurrentPosition((status, data) => {
              if (status === 'complete') {
                resolve({
                  coords: {
                    latitude: data.position.lat,
                    longitude: data.position.lng,
                    accuracy: data.accuracy
                  },
                  skip: true
                })
              } else {
                reject(new Error(data.message))
              }
            })
          })
        })
      } else {
        reject(new Error('network error'))
      }
    })
  }).then(({ coords, skip }) => {
    translateCoordinateSystem(type, coords, skip)
      .then(coords => {
        invoke(
          callbackId,
          Object.assign(coords, {
            errMsg: 'getLocation:ok',
            verticalAccuracy: coords.altitudeAccuracy || 0,
            // 无专门水平精度，使用位置精度替代
            horizontalAccuracy: coords.accuracy
          })
        )
      })
      .catch(error => {
        invoke(callbackId, {
          errMsg: 'getLocation:fail ' + error.message
        })
      })
  }).catch((error) => {
    invoke(callbackId, {
      errMsg: 'getLocation:fail ' + error.message || JSON.stringify(error)
    })
  })
}
