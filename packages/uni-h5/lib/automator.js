/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var e=function(){return e=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var o in n=arguments[t])Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o]);return e},e.apply(this,arguments)};function n(){for(var e=0,n=0,t=arguments.length;n<t;n++)e+=arguments[n].length;var r=Array(e),o=0;for(n=0;n<t;n++)for(var i=arguments[n],u=0,a=i.length;u<a;u++,o++)r[o]=i[u];return r}var t="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto),r=new Uint8Array(16);function o(){if(!t)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return t(r)}for(var i=[],u=0;u<256;++u)i[u]=(u+256).toString(16).substr(1);function a(e,n,t){var r=n&&t||0;"string"==typeof e&&(n="binary"===e?new Array(16):null,e=null);var u=(e=e||{}).random||(e.rng||o)();if(u[6]=15&u[6]|64,u[8]=63&u[8]|128,n)for(var a=0;a<16;++a)n[r+a]=u[a];return n||function(e,n){var t=n||0,r=i;return[r[e[t++]],r[e[t++]],r[e[t++]],r[e[t++]],"-",r[e[t++]],r[e[t++]],"-",r[e[t++]],r[e[t++]],"-",r[e[t++]],r[e[t++]],"-",r[e[t++]],r[e[t++]],r[e[t++]],r[e[t++]],r[e[t++]],r[e[t++]]].join("")}(u)}var c=Object.prototype.hasOwnProperty,s=function(e){return null==e},l=Array.isArray,f=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;function d(e,n){if(l(e))return e;if(n&&(t=n,r=e,c.call(t,r)))return[e];var t,r,o=[];return e.replace(f,(function(e,n,t,r){return o.push(t?r.replace(/\\(\\)?/g,"$1"):n||e),r})),o}function p(e,n){var t,r=d(n,e);for(t=r.shift();!s(t);){if(null==(e=e[t]))return;t=r.shift()}return e}function g(e){return e._uid||e.uid}var v=new Map;function m(e){var n,t;if(!function(e){if(e){var n=e.tagName;return 0===n.indexOf("UNI-")||"BODY"===n||0===n.indexOf("V-UNI-")||e.__isUniElement}return!1}(e))throw Error("no such element");var r,o,i,u={elementId:(r=e,o=r._id,o||(o=a(),r._id=o,v.set(o,{id:o,element:r})),o),tagName:e.tagName.toLocaleLowerCase().replace("uni-","")};e.__vue__?(i=e.__vue__)&&(i.$parent&&i.$parent.$el===e&&(i=i.$parent),i&&!(null===(n=i.$options)||void 0===n?void 0:n.isReserved)&&(u.nodeId=g(i))):(i=e.__vueParentComponent)&&(i.subTree.el===e&&(i=i.parent),(null===(t=i.type)||void 0===t?void 0:t.__reserved)||(u.nodeId=g(i)));return"video"===u.tagName&&(u.videoId=u.nodeId),u}function h(e){return e.__vue__?{isVue3:!1,vm:e.__vue__}:{isVue3:!0,vm:e.__vueParentComponent}}function _(e){var n=h(e),t=n.isVue3,r=n.vm;return t?r.exposed.$getMain():r.$refs.main}var y={input:{input:function(e,n){var t=h(e),r=t.isVue3,o=t.vm;r?o.exposed&&o.exposed.$triggerInput({value:n}):(o.valueSync=n,o.$triggerInput({},{value:n}))}},textarea:{input:function(e,n){var t=h(e),r=t.isVue3,o=t.vm;r?o.exposed&&o.exposed.$triggerInput({value:n}):(o.valueSync=n,o.$triggerInput({},{value:n}))}},"scroll-view":{scrollTo:function(e,n,t){var r=_(e);r.scrollLeft=n,r.scrollTop=t},scrollTop:function(e){return _(e).scrollTop},scrollLeft:function(e){return _(e).scrollLeft},scrollWidth:function(e){return _(e).scrollWidth},scrollHeight:function(e){return _(e).scrollHeight}},swiper:{swipeTo:function(e,n){e.__vue__.current=n}},"movable-view":{moveTo:function(e,n,t){e.__vue__._animationTo(n,t)}},switch:{tap:function(e){e.click()}},slider:{slideTo:function(e,n){var t=e.__vue__,r=t.$refs["uni-slider"],o=r.offsetWidth,i=r.getBoundingClientRect().left;t.value=n,t._onClick({x:(n-t.min)*o/(t.max-t.min)+i})}}};function T(e){var n,t=e.map((function(e){return function(e){if(document.createTouch)return document.createTouch(window,e.target,e.identifier,e.pageX,e.pageY,e.screenX,e.screenY);return new Touch(e)}(e)}));return document.createTouchList?(n=document).createTouchList.apply(n,t):t}var w={getWindow:function(e){return window},getDocument:function(e){return document},getEl:function(e){var n=v.get(e);if(!n)throw Error("element destroyed");return n.element},getOffset:function(e){var n=e.getBoundingClientRect();return Promise.resolve({left:n.left+window.pageXOffset,top:n.top+window.pageYOffset})},querySelector:function(e,n){return"page"===n&&(n="body"),Promise.resolve(m(e.querySelector(n)))},querySelectorAll:function(e,n){var t=[],r=document.querySelectorAll(n);return[].forEach.call(r,(function(e){try{t.push(m(e))}catch(e){}})),Promise.resolve({elements:t})},queryProperties:function(e,n){return Promise.resolve({properties:n.map((function(n){var t=p(e,n.replace(/-([a-z])/g,(function(e){return e[1].toUpperCase()})));return"document.documentElement.scrollTop"===n&&0===t&&(t=p(e,"document.body.scrollTop")),t}))})},queryAttributes:function(e,n){return Promise.resolve({attributes:n.map((function(n){return String(e.getAttribute(n))}))})},queryStyles:function(e,n){var t=getComputedStyle(e);return Promise.resolve({styles:n.map((function(e){return t[e]}))})},queryHTML:function(e,n){return Promise.resolve({html:(t="outer"===n?e.outerHTML:e.innerHTML,t.replace(/\n/g,"").replace(/(<uni-text[^>]*>)(<span[^>]*>[^<]*<\/span>)(.*?<\/uni-text>)/g,"$1$3").replace(/<\/?[^>]*>/g,(function(e){return-1<e.indexOf("<body")?"<page>":"</body>"===e?"</page>":0!==e.indexOf("<uni-")&&0!==e.indexOf("</uni-")?"":e.replace(/uni-/g,"").replace(/ role=""/g,"").replace(/ aria-label=""/g,"")})))});var t},dispatchTapEvent:function(e){return e.click(),Promise.resolve()},dispatchLongpressEvent:function(e){return Promise.resolve()},dispatchTouchEvent:function(e,n,t){t||(t={}),t.touches||(t.touches=[]),t.changedTouches||(t.changedTouches=[]),t.touches.length||t.touches.push({identifier:Date.now(),target:e}),t.touches.forEach((function(n){n.target=e})),t.changedTouches.forEach((function(n){n.target=e}));var r=T(t.touches),o=T(t.changedTouches),i=T([]);return e.dispatchEvent(new TouchEvent(n,{cancelable:!0,bubbles:!0,touches:r,targetTouches:i,changedTouches:o})),Promise.resolve()},callFunction:function(e,t,r){var o=p(y,t);return o?Promise.resolve({result:o.apply(null,n([e],r))}):Promise.reject(Error(t+" not exists"))},triggerEvent:function(e,n,t){var r=e.__vue__;return r.$trigger&&r.$trigger(n,{},t),Promise.resolve()}};var S,E=Object.assign({},function(e){return{"Page.getElement":function(n){return e.querySelector(e.getDocument(n.pageId),n.selector)},"Page.getElements":function(n){return e.querySelectorAll(e.getDocument(n.pageId),n.selector)},"Page.getWindowProperties":function(n){return e.queryProperties(e.getWindow(n.pageId),n.names)}}}(w),function(e){var n=function(n){return e.getEl(n.elementId,n.pageId)};return{"Element.getElement":function(t){return e.querySelector(n(t),t.selector)},"Element.getElements":function(t){return e.querySelectorAll(n(t),t.selector)},"Element.getDOMProperties":function(t){return e.queryProperties(n(t),t.names)},"Element.getProperties":function(t){var r=n(t),o=r.__vue__||r.attr||{};return r.__vueParentComponent&&(o=Object.assign({},o,r.__vueParentComponent.attrs,r.__vueParentComponent.props)),e.queryProperties(o,t.names)},"Element.getOffset":function(t){return e.getOffset(n(t))},"Element.getAttributes":function(t){return e.queryAttributes(n(t),t.names)},"Element.getStyles":function(t){return e.queryStyles(n(t),t.names)},"Element.getHTML":function(t){return e.queryHTML(n(t),t.type)},"Element.tap":function(t){return e.dispatchTapEvent(n(t))},"Element.longpress":function(t){return e.dispatchLongpressEvent(n(t))},"Element.touchstart":function(t){return e.dispatchTouchEvent(n(t),"touchstart",t)},"Element.touchmove":function(t){return e.dispatchTouchEvent(n(t),"touchmove",t)},"Element.touchend":function(t){return e.dispatchTouchEvent(n(t),"touchend",t)},"Element.callFunction":function(t){return e.callFunction(n(t),t.functionName,t.args)},"Element.triggerEvent":function(t){return e.triggerEvent(n(t),t.type,t.detail)}}}(w));function b(e){return UniViewJSBridge.publishHandler("onAutoMessageReceive",e)}function P(e){return e.__wxWebviewId__?e.__wxWebviewId__:e.privateProperties?e.privateProperties.slaveId:e.$page?e.$page.id:void 0}function M(e){return e.route||e.uri}function O(e){return e.options||e.$page&&e.$page.options||{}}function I(e){return{id:P(e),path:M(e),query:O(e)}}function x(e){var n=function(e){return getCurrentPages().find((function(n){return P(n)===e}))}(e);return n&&n.$vm}function C(e,n){return e._uid===n||e.uid===n}function $(e,n,t){var r,o,i,u,a,c,s,l,f,d,p,g,v;if(void 0===t&&(t=!1),t)if(e.component&&C(e.component,n))v=e.component;else{var m=[];e.children instanceof Array?m=e.children:(null===(o=null===(r=e.component)||void 0===r?void 0:r.subTree)||void 0===o?void 0:o.children)&&(null===(u=null===(i=e.component)||void 0===i?void 0:i.subTree)||void 0===u?void 0:u.children)instanceof Array?m=e.component.subTree.children:(null===(l=null===(s=null===(c=null===(a=e.component)||void 0===a?void 0:a.subTree)||void 0===c?void 0:c.component)||void 0===s?void 0:s.subTree)||void 0===l?void 0:l.children)&&(null===(g=null===(p=null===(d=null===(f=e.component)||void 0===f?void 0:f.subTree)||void 0===d?void 0:d.component)||void 0===p?void 0:p.subTree)||void 0===g?void 0:g.children)instanceof Array&&(m=e.component.subTree.component.subTree.children),m.find((function(e){return v=$(e,n,!0)}))}else e&&(C(e,n)?v=e:e.$children.find((function(e){return v=$(e,n)})));return v}function k(e,n){var t=x(e);if(t)return V(t)?$(t.$.subTree,n,!0):$(t,n)}function A(n,t){var r,o=n.$data||n.data;return n.exposed?o=e(e({},o),n.exposed):n.$&&n.$.exposed&&(o=e(e({},o),n.$.exposed)),n&&(r=t?p(o,t):Object.assign({},o)),Promise.resolve({data:r})}function N(e,n){if(e){var t=V(e);Object.keys(n).forEach((function(r){t?(e.$data||e.data)[r]=n[r]:e[r]=n[r]}))}return Promise.resolve()}function W(e,n,t){return V(e)&&(e=e.$vm||e.ctx),new Promise((function(r,o){var i,u;if(!e)return o(S.VM_NOT_EXISTS);if(!e[n]&&!(null===(u=e.$.exposed)||void 0===u?void 0:u[n]))return o(S.METHOD_NOT_EXISTS);var a,c=e[n]?e[n].apply(e,t):(i=e.$.exposed)[n].apply(i,t);!(a=c)||"object"!=typeof a&&"function"!=typeof a||"function"!=typeof a.then?r({result:c}):c.then((function(e){r({result:e})}))}))}function V(e){return!e.$children}function B(){return"undefined"!=typeof window&&(window.__uniapp_x_||window.__uniapp_x_postMessage)}UniViewJSBridge.subscribe("sendAutoMessage",(function(e){var n=e.id,t=e.method,r=e.params,o={id:n};if("ping"==t)return o.result="pong",void b(o);var i=E[t];if(!i)return o.error={message:t+" unimplemented"},b(o);try{i(r).then((function(e){e&&(o.result=e)})).catch((function(e){o.error={message:e.message}})).finally((function(){b(o)}))}catch(e){o.error={message:e.message},b(o)}})),function(e){e.VM_NOT_EXISTS="VM_NOT_EXISTS",e.METHOD_NOT_EXISTS="METHOD_NOT_EXISTS"}(S||(S={}));var D=1,q={};function U(e,n){var t,r=0;n&&(r=D++,q[r]=n);var o={data:{id:r,type:"automator",data:e}};console.log("postMessageToUniXWebView",o),(null===(t=null===window||void 0===window?void 0:window.__uniapp_x_)||void 0===t?void 0:t.postMessage)?window.__uniapp_x_.postMessage(JSON.stringify(o)):(null===window||void 0===window?void 0:window.__uniapp_x_postMessage)&&window.__uniapp_x_postMessage({data:o})}var L=new Map,R=function(n){return new Promise((function(t,r){var o=L.values().next().value;if(o){var i=n.method;if("onOpen"===i)return X(o,t);if(i.startsWith("on"))return o.instance[i]((function(e){t(e)}));"sendMessage"===i&&(i="send"),o.instance[i](e(e({},n),{success:function(e){t({result:e}),"close"===i&&L.delete(L.keys().next().value)},fail:function(e){r(e)}}))}else r({errMsg:"socketTask not exists."})}))};function X(e,n){if(e.isOpend)n({data:e.openData});else{var t=setInterval((function(){e.isOpend&&(clearInterval(t),n(e.openData))}),200);setTimeout((function(){clearInterval(t)}),2e3)}}var H=["stopRecord","getRecorderManager","pauseVoice","stopVoice","pauseBackgroundAudio","stopBackgroundAudio","getBackgroundAudioManager","createAudioContext","createInnerAudioContext","createVideoContext","createCameraContext","createMapContext","canIUse","startAccelerometer","stopAccelerometer","startCompass","stopCompass","hideToast","hideLoading","showNavigationBarLoading","hideNavigationBarLoading","navigateBack","createAnimation","pageScrollTo","createSelectorQuery","createCanvasContext","createContext","drawCanvas","hideKeyboard","stopPullDownRefresh","arrayBufferToBase64","base64ToArrayBuffer"],j=new Map,J=["onCompassChange","onThemeChange","onUserCaptureScreen","onWindowResize","onMemoryWarning","onAccelerometerChange","onKeyboardHeightChange","onNetworkStatusChange","onPushMessage","onLocationChange","onGetWifiList","onWifiConnected","onWifiConnectedWithPartialInfo","onSocketOpen","onSocketError","onSocketMessage","onSocketClose"],F={},Y=/^\$|Sync$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting|initUTS|requireUTS|registerUTS/,z=/^on|^off/;function G(e){return Y.test(e)||-1!==H.indexOf(e)}var K={getPageStack:function(){return Promise.resolve({pageStack:getCurrentPages().map((function(e){return I(e)}))})},getCurrentPage:function(){var e=getCurrentPages(),n=e.length;return new Promise((function(t,r){n?t(I(e[n-1])):r(Error("getCurrentPages().length=0"))}))},callUniMethod:function(n,t){var r=n.method,o=n.args;return new Promise((function(n,i){if("connectSocket"!==r){var u,a;if(J.includes(r)){j.has(r)||j.set(r,new Map);var c=o[0],s=function(e){t({id:c,result:{method:r,data:e}})};return r.startsWith("onSocket")?R({method:r.replace("Socket","")}).then((function(e){return s(e)})).catch((function(e){return s(e)})):(j.get(r).set(c,s),uni[r](s)),n({result:null})}if(r.startsWith("off")&&J.includes(r.replace("off","on"))){var l=r.replace("off","on");if(j.has(l)){var f=o[0];if(void 0!==f){var d=j.get(l).get(f);uni[r](d),j.get(l).delete(f)}else{j.get(l).forEach((function(e){uni[r](e)})),j.delete(l)}}return n({result:null})}if(r.indexOf("Socket")>0)return R(e({method:r.replace("Socket","")},o[0])).then((function(e){return n(e)})).catch((function(e){return i(e)}));if(!uni[r])return i(Error("uni."+r+" not exists"));if(G(r))return n({result:uni[r].apply(uni,o)});var p=[Object.assign({},o[0]||{},{success:function(e){setTimeout((function(){n({result:e})}),"pageScrollTo"===r?350:0)},fail:function(e){i(Error(e.errMsg.replace(r+":fail ","")))}})];uni[r].apply(uni,p)}else(u=o[0].id,a=o[0].url,new Promise((function(e,n){var t=uni.connectSocket({url:a,success:function(){e({result:{errMsg:"connectSocket:ok"}})},fail:function(){n({result:{errMsg:"connectSocket:fail"}})}});L.set(u,{instance:t,isOpend:!1}),t.onOpen((function(e){L.get(u).isOpend=!0,L.get(u).openData=e}))}))).then((function(e){return n(e)})).catch((function(e){return i(e)}))}))},mockUniMethod:function(e){var n=e.method;if(!uni[n])throw Error("uni."+n+" not exists");if(!function(e){return!z.test(e)}(n))throw Error("You can't mock uni."+n);var t,r=e.result,o=e.functionDeclaration;return s(r)&&s(o)?(F[n]&&(uni[n]=F[n],delete F[n]),Promise.resolve()):(t=s(o)?G(n)?function(){return r}:function(e){setTimeout((function(){r.errMsg&&-1!==r.errMsg.indexOf(":fail")?e.fail&&e.fail(r):e.success&&e.success(r),e.complete&&e.complete(r)}),4)}:function(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];return new Function("return "+o)().apply(t,n.concat(e.args))},t.origin=F[n]||uni[n],F[n]||(F[n]=uni[n]),uni[n]=t,Promise.resolve())},captureScreenshot:function(e){return new Promise((function(n,t){B()?U({action:"captureScreenshot",args:e},(function(e,r){e?t(Error("captureScreenshot fail: "+e)):n(r)})):t(Error("captureScreenshot fail: supported only on the app platform."))}))},socketEmitter:function(n){return new Promise((function(t,r){(function(n){return new Promise((function(t,r){if(L.has(n.id)){var o=L.get(n.id),i=o.instance,u=n.method,a=n.id;if("onOpen"==u)return X(o,t);if(u.startsWith("on"))return i[u]((function(e){t({method:"Socket."+u,id:a,data:e})}));i[u](e(e({},n),{success:function(e){t(e),"close"===u&&L.delete(n.id)},fail:function(e){r(e)}}))}else r({errMsg:"socketTask not exists."})}))})(n).then((function(e){return t(e)})).catch((function(e){return r(e)}))}))}},Q=K,Z={getData:function(e){return A(x(e.pageId),e.path)},setData:function(e){return N(x(e.pageId),e.data)},callMethod:function(e){var n,t=((n={})[S.VM_NOT_EXISTS]="Page["+e.pageId+"] not exists",n[S.METHOD_NOT_EXISTS]="page."+e.method+" not exists",n);return new Promise((function(n,r){W(x(e.pageId),e.method,e.args).then((function(e){return n(e)})).catch((function(e){r(Error(t[e]))}))}))},callMethodWithCallback:function(e){var n,t=((n={})[S.VM_NOT_EXISTS]="callMethodWithCallback:fail, Page["+e.pageId+"] not exists",n[S.METHOD_NOT_EXISTS]="callMethodWithCallback:fail, page."+e.method+" not exists",n),r=e.args[e.args.length-1];W(x(e.pageId),e.method,e.args).catch((function(e){r({errMsg:t[e]})}))}};function ee(e){return e.nodeId||e.elementId}var ne={getData:function(e){return A(k(e.pageId,ee(e)),e.path)},setData:function(e){return N(k(e.pageId,ee(e)),e.data)},callMethod:function(e){var n,t=ee(e),r=((n={})[S.VM_NOT_EXISTS]="Component["+e.pageId+":"+t+"] not exists",n[S.METHOD_NOT_EXISTS]="component."+e.method+" not exists",n);return new Promise((function(n,o){W(k(e.pageId,t),e.method,e.args).then((function(e){return n(e)})).catch((function(e){o(Error(r[e]))}))}))}};window.initRuntimeAutomator=ce,window.onPostMessageFromUniXWebView=function(e,n,t){console.log("onPostMessageFromUniXWebView",e,n,t,q);var r=q[e];r&&(delete q[e],r(t,n))};var te={};Object.keys(Q).forEach((function(e){te["App."+e]=Q[e]})),Object.keys(Z).forEach((function(e){te["Page."+e]=Z[e]})),Object.keys(ne).forEach((function(e){te["Element."+e]=ne[e]}));var re,oe,ie=process.env.UNI_AUTOMATOR_WS_ENDPOINT;function ue(e){oe.send({data:JSON.stringify(e)})}function ae(e){var n=JSON.parse(e.data),t=n.id,r=n.method,o=n.params,i={id:t},u=te[r];if(!u){if(re){var a=re(t,r,o,i);if(!0===a)return;u=a}if(!u)return i.error={message:r+" unimplemented"},ue(i)}try{u(o,ue).then((function(e){e&&(i.result=e)})).catch((function(e){i.error={message:e.message}})).finally((function(){ue(i)}))}catch(e){i.error={message:e.message},ue(i)}}function ce(e){void 0===e&&(e={}),(oe=uni.connectSocket({url:e.wsEndpoint||ie,complete:function(){}})).onMessage(ae),oe.onOpen((function(n){e.success&&e.success(),console.log("已开启自动化测试...")})),oe.onError((function(e){console.log("automator.onError",e)})),oe.onClose((function(){e.fail&&e.fail({errMsg:"$$initRuntimeAutomator:fail"}),console.log("automator.onClose")}))}re=function(e,n,t,r){var o=t.pageId,i=function(e){var n=getCurrentPages();if(!e)return n[n.length-1];return n.find((function(n){return n.$page.id===e}))}(o);return i?(i.$page.meta.isNVue,UniServiceJSBridge.publishHandler("sendAutoMessage",{id:e,method:n,params:t},o),!0):(r.error={message:"page["+o+"] not exists"},ue(r),!0)},UniServiceJSBridge.subscribe("onAutoMessageReceive",(function(e){ue(e)})),setTimeout((function(){if(B())U({action:"ready"});else{if(ie&&ie.endsWith(":0000"))return;ce()}}),500);
