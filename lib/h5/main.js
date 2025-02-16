/**
 * 1.导出全局对象(UniViewJSBridge,UniServiceJSBridge,uni,getApp,getCurrentPages)
 * 2.引入 Vue 插件(uniVueServicePlugin,uniVueServicePlugin)
 * 3.引入 Vue 组件
 */
import Vue from 'vue'

global.UniViewJSBridge = {
  subscribeHandler: UniViewJSBridge.subscribeHandler
}

global.UniServiceJSBridge = {
  subscribeHandler: UniServiceJSBridge.subscribeHandler
}

const {
  default: uni,
  getApp,
  getCurrentPages
} = require('uni-platform/service/index')

// 与微信JS-SDK同名的方法
// const sameNameApis = ['setClipboardData', 'getClipboardData', 'onUserCaptureScreen', 'openBluetoothAdapter', 'startBluetoothDevicesDiscovery', 'onBluetoothDeviceFound', 'stopBluetoothDevicesDiscovery', 'onBluetoothAdapterStateChange', 'getConnectedBluetoothDevices', 'getBluetoothDevices', 'getBluetoothAdapterState', 'closeBluetoothAdapter', 'writeBLECharacteristicValue', 'readBLECharacteristicValue', 'onBLEConnectionStateChange', 'onBLECharacteristicValueChange', 'notifyBLECharacteristicValueChange', 'getBLEDeviceServices', 'getBLEDeviceCharacteristics', 'createBLEConnection', 'closeBLEConnection', 'onBeaconServiceChange', 'onBeaconUpdate', 'getBeacons', 'startBeaconDiscovery', 'stopBeaconDiscovery', 'chooseImage', 'previewImage', 'getNetworkType', 'onNetworkStatusChange', 'openLocation', 'getLocation']
// 默认会被iOS企业微信替换的方法
const sameNameApis = ['chooseImage']
sameNameApis.forEach(item => {
  Object.defineProperty(uni, item, {
    writable: false,
    configurable: false
  })
})

global.uni = uni

global.wx = global.uni

global.getApp = getApp
global.getCurrentPages = getCurrentPages

Vue.use(require('uni-service/plugins').default, {
  routes: __uniRoutes
})

Vue.use(require('uni-view/plugins').default, {
  routes: __uniRoutes
})

require('uni-core/vue')
require('uni-platform/components')
require('uni-components')
