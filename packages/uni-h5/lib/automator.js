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
var e=function(){return e=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},e.apply(this,arguments)};function t(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),o=0;for(t=0;t<n;t++)for(var i=arguments[t],u=0,a=i.length;u<a;u++,o++)r[o]=i[u];return r}var n="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto),r=new Uint8Array(16);function o(){if(!n)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return n(r)}for(var i=[],u=0;u<256;++u)i[u]=(u+256).toString(16).substr(1);function a(e,t,n){var r=t&&n||0;"string"==typeof e&&(t="binary"===e?new Array(16):null,e=null);var u=(e=e||{}).random||(e.rng||o)();if(u[6]=15&u[6]|64,u[8]=63&u[8]|128,t)for(var a=0;a<16;++a)t[r+a]=u[a];return t||function(e,t){var n=t||0,r=i;return[r[e[n++]],r[e[n++]],r[e[n++]],r[e[n++]],"-",r[e[n++]],r[e[n++]],"-",r[e[n++]],r[e[n++]],"-",r[e[n++]],r[e[n++]],"-",r[e[n++]],r[e[n++]],r[e[n++]],r[e[n++]],r[e[n++]],r[e[n++]]].join("")}(u)}var c=Object.prototype.hasOwnProperty,s=function(e){return null==e},l=Array.isArray,f=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;function d(e,t){if(l(e))return e;if(t&&(n=t,r=e,c.call(n,r)))return[e];var n,r,o=[];return e.replace(f,(function(e,t,n,r){return o.push(n?r.replace(/\\(\\)?/g,"$1"):t||e),r})),o}function g(e,t){var n,r=d(t,e);for(n=r.shift();!s(n);){if(null==(e=e[n]))return;n=r.shift()}return e}function p(e){return e._uid||e.uid}var m=new Map;function v(e){var t;if(!function(e){if(e){var t=e.tagName;return 0===t.indexOf("UNI-")||"BODY"===t||0===t.indexOf("V-UNI-")}return!1}(e))throw Error("no such element");var n,r,o,i={elementId:(n=e,r=n._id,r||(r=a(),n._id=r,m.set(r,{id:r,element:n})),r),tagName:e.tagName.toLocaleLowerCase().replace("uni-","")};e.__vue__?(o=e.__vue__)&&(o.$parent&&o.$parent.$el===e&&(o=o.$parent),o&&!(null===(t=o.$options)||void 0===t?void 0:t.isReserved)&&(i.nodeId=p(o))):(o=e.__vnode)&&(o.el===e&&(o=o.ctx.parent),o&&(i.nodeId=p(o)));return"video"===i.tagName&&(i.videoId=i.nodeId),i}var h={input:{input:function(e,t){var n=e.__vue__;n.valueSync=t,n.$triggerInput({},{value:t})}},textarea:{input:function(e,t){var n=e.__vue__;n.valueSync=t,n.$triggerInput({},{value:t})}},"scroll-view":{scrollTo:function(e,t,n){var r=e.__vue__.$refs.main;r.scrollLeft=t,r.scrollTop=n},scrollTop:function(e){return e.__vue__.$refs.main.scrollTop},scrollLeft:function(e){return e.__vue__.$refs.main.scrollLeft},scrollWidth:function(e){return e.__vue__.$refs.main.scrollWidth},scrollHeight:function(e){return e.__vue__.$refs.main.scrollHeight}},swiper:{swipeTo:function(e,t){e.__vue__.current=t}},"movable-view":{moveTo:function(e,t,n){e.__vue__._animationTo(t,n)}},switch:{tap:function(e){e.click()}},slider:{slideTo:function(e,t){var n=e.__vue__,r=n.$refs["uni-slider"],o=r.offsetWidth,i=r.getBoundingClientRect().left;n.value=t,n._onClick({x:(t-n.min)*o/(n.max-n.min)+i})}}};function _(e){var t,n=e.map((function(e){return function(e){if(document.createTouch)return document.createTouch(window,e.target,e.identifier,e.pageX,e.pageY,e.screenX,e.screenY);return new Touch(e)}(e)}));return document.createTouchList?(t=document).createTouchList.apply(t,n):n}var y={getWindow:function(e){return window},getDocument:function(e){return document},getEl:function(e){var t=m.get(e);if(!t)throw Error("element destroyed");return t.element},getOffset:function(e){var t=e.getBoundingClientRect();return Promise.resolve({left:t.left+window.pageXOffset,top:t.top+window.pageYOffset})},querySelector:function(e,t){return"page"===t&&(t="body"),Promise.resolve(v(e.querySelector(t)))},querySelectorAll:function(e,t){var n=[],r=document.querySelectorAll(t);return[].forEach.call(r,(function(e){try{n.push(v(e))}catch(e){}})),Promise.resolve({elements:n})},queryProperties:function(e,t){return Promise.resolve({properties:t.map((function(t){var n=g(e,t.replace(/-([a-z])/g,(function(e){return e[1].toUpperCase()})));return"document.documentElement.scrollTop"===t&&0===n&&(n=g(e,"document.body.scrollTop")),n}))})},queryAttributes:function(e,t){return Promise.resolve({attributes:t.map((function(t){return String(e.getAttribute(t))}))})},queryStyles:function(e,t){var n=getComputedStyle(e);return Promise.resolve({styles:t.map((function(e){return n[e]}))})},queryHTML:function(e,t){return Promise.resolve({html:(n="outer"===t?e.outerHTML:e.innerHTML,n.replace(/\n/g,"").replace(/(<uni-text[^>]*>)(<span[^>]*>[^<]*<\/span>)(.*?<\/uni-text>)/g,"$1$3").replace(/<\/?[^>]*>/g,(function(e){return-1<e.indexOf("<body")?"<page>":"</body>"===e?"</page>":0!==e.indexOf("<uni-")&&0!==e.indexOf("</uni-")?"":e.replace(/uni-/g,"").replace(/ role=""/g,"").replace(/ aria-label=""/g,"")})))});var n},dispatchTapEvent:function(e){return e.click(),Promise.resolve()},dispatchLongpressEvent:function(e){return Promise.resolve()},dispatchTouchEvent:function(e,t,n){n||(n={}),n.touches||(n.touches=[]),n.changedTouches||(n.changedTouches=[]),n.touches.length||n.touches.push({identifier:Date.now(),target:e});var r=_(n.touches),o=_(n.changedTouches),i=_([]);return e.dispatchEvent(new TouchEvent(t,{cancelable:!0,bubbles:!0,touches:r,targetTouches:i,changedTouches:o})),Promise.resolve()},callFunction:function(e,n,r){var o=g(h,n);return o?Promise.resolve({result:o.apply(null,t([e],r))}):Promise.reject(Error(n+" not exists"))},triggerEvent:function(e,t,n){var r=e.__vue__;return r.$trigger&&r.$trigger(t,{},n),Promise.resolve()}};var T,S=Object.assign({},function(e){return{"Page.getElement":function(t){return e.querySelector(e.getDocument(t.pageId),t.selector)},"Page.getElements":function(t){return e.querySelectorAll(e.getDocument(t.pageId),t.selector)},"Page.getWindowProperties":function(t){return e.queryProperties(e.getWindow(t.pageId),t.names)}}}(y),function(e){var t=function(t){return e.getEl(t.elementId,t.pageId)};return{"Element.getElement":function(n){return e.querySelector(t(n),n.selector)},"Element.getElements":function(n){return e.querySelectorAll(t(n),n.selector)},"Element.getDOMProperties":function(n){return e.queryProperties(t(n),n.names)},"Element.getProperties":function(n){var r=t(n),o=r.__vue__||r.attr||{};return r.__vueParentComponent&&(o=Object.assign({},o,r.__vueParentComponent.attrs,r.__vueParentComponent.props)),e.queryProperties(o,n.names)},"Element.getOffset":function(n){return e.getOffset(t(n))},"Element.getAttributes":function(n){return e.queryAttributes(t(n),n.names)},"Element.getStyles":function(n){return e.queryStyles(t(n),n.names)},"Element.getHTML":function(n){return e.queryHTML(t(n),n.type)},"Element.tap":function(n){return e.dispatchTapEvent(t(n))},"Element.longpress":function(n){return e.dispatchLongpressEvent(t(n))},"Element.touchstart":function(n){return e.dispatchTouchEvent(t(n),"touchstart",n)},"Element.touchmove":function(n){return e.dispatchTouchEvent(t(n),"touchmove",n)},"Element.touchend":function(n){return e.dispatchTouchEvent(t(n),"touchend",n)},"Element.callFunction":function(n){return e.callFunction(t(n),n.functionName,n.args)},"Element.triggerEvent":function(n){return e.triggerEvent(t(n),n.type,n.detail)}}}(y));function E(e){return UniViewJSBridge.publishHandler("onAutoMessageReceive",e)}function P(e){return e.__wxWebviewId__?e.__wxWebviewId__:e.privateProperties?e.privateProperties.slaveId:e.$page?e.$page.id:void 0}function O(e){return e.route||e.uri}function w(e){return e.options||e.$page&&e.$page.options||{}}function b(e){return{id:P(e),path:O(e),query:w(e)}}function I(e){var t=function(e){return getCurrentPages().find((function(t){return P(t)===e}))}(e);return t&&t.$vm}function M(e,t){return e._uid===t||e.uid===t}function C(e,t,n){var r,o,i;if(void 0===n&&(n=!1),n)if(e.component&&M(e.component,t))i=e.component;else{var u=[];e.children instanceof Array?u=e.children:(null===(o=null===(r=e.component)||void 0===r?void 0:r.subTree)||void 0===o?void 0:o.children)&&(u=e.component.subTree.children),u.find((function(e){return i=C(e,t,!0)}))}else e&&(M(e,t)?i=e:e.$children.find((function(e){return i=C(e,t)})));return i}function k(e,t){var n=I(e);if(n)return N(n)?C(n.$.subTree,t,!0):C(n,t)}function $(e,t){var n,r=e.$data||e.data;return e&&(n=t?g(r,t):Object.assign({},r)),Promise.resolve({data:n})}function x(e,t){if(e){var n=N(e);Object.keys(t).forEach((function(r){n?(e.$data||e.data)[r]=t[r]:e[r]=t[r]}))}return Promise.resolve()}function A(e,t,n){return N(e)&&(e=e.$vm||e.ctx),new Promise((function(r,o){if(!e)return o(T.VM_NOT_EXISTS);if(!e[t])return o(T.METHOD_NOT_EXISTS);var i,u=e[t].apply(e,n);!(i=u)||"object"!=typeof i&&"function"!=typeof i||"function"!=typeof i.then?r({result:u}):u.then((function(e){r({result:e})}))}))}function N(e){return!e.$children}UniViewJSBridge.subscribe("sendAutoMessage",(function(e){var t=e.id,n=e.method,r=e.params,o={id:t},i=S[n];if(!i)return o.error={message:n+" unimplemented"},E(o);try{i(r).then((function(e){e&&(o.result=e)})).catch((function(e){o.error={message:e.message}})).finally((function(){E(o)}))}catch(e){o.error={message:e.message},E(o)}})),function(e){e.VM_NOT_EXISTS="VM_NOT_EXISTS",e.METHOD_NOT_EXISTS="METHOD_NOT_EXISTS"}(T||(T={}));var W=new Map,B=function(t){return new Promise((function(n,r){var o=W.values().next().value;if(o){var i=t.method;if("onOpen"===i)return D(o,n);if(i.startsWith("on"))return o.instance[i]((function(e){n(e)}));"sendMessage"===i&&(i="send"),o.instance[i](e(e({},t),{success:function(e){n({result:e}),"close"===i&&W.delete(W.keys().next().value)},fail:function(e){r(e)}}))}else r({errMsg:"socketTask not exists."})}))};function D(e,t){if(e.isOpend)t({data:e.openData});else{var n=setInterval((function(){e.isOpend&&(clearInterval(n),t(e.openData))}),200);setTimeout((function(){clearInterval(n)}),2e3)}}var q=["stopRecord","getRecorderManager","pauseVoice","stopVoice","pauseBackgroundAudio","stopBackgroundAudio","getBackgroundAudioManager","createAudioContext","createInnerAudioContext","createVideoContext","createCameraContext","createMapContext","canIUse","startAccelerometer","stopAccelerometer","startCompass","stopCompass","hideToast","hideLoading","showNavigationBarLoading","hideNavigationBarLoading","navigateBack","createAnimation","pageScrollTo","createSelectorQuery","createCanvasContext","createContext","drawCanvas","hideKeyboard","stopPullDownRefresh","arrayBufferToBase64","base64ToArrayBuffer"],L=new Map,V=["onCompassChange","onThemeChange","onUserCaptureScreen","onWindowResize","onMemoryWarning","onAccelerometerChange","onKeyboardHeightChange","onNetworkStatusChange","onPushMessage","onLocationChange","onGetWifiList","onWifiConnected","onWifiConnectedWithPartialInfo","onSocketOpen","onSocketError","onSocketMessage","onSocketClose"],U={},H=/^\$|Sync$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting|initUTS|requireUTS|registerUTS/,R=/^on|^off/;function j(e){return H.test(e)||-1!==q.indexOf(e)}var X={getPageStack:function(){return Promise.resolve({pageStack:getCurrentPages().map((function(e){return b(e)}))})},getCurrentPage:function(){var e=getCurrentPages(),t=e.length;return new Promise((function(n,r){t?n(b(e[t-1])):r(Error("getCurrentPages().length=0"))}))},callUniMethod:function(t,n){var r=t.method,o=t.args;return new Promise((function(t,i){if("connectSocket"!==r){var u,a;if(V.includes(r)){L.has(r)||L.set(r,new Map);var c=o[0],s=function(e){n({id:c,result:{method:r,data:e}})};return r.startsWith("onSocket")?B({method:r.replace("Socket","")}).then((function(e){return s(e)})).catch((function(e){return s(e)})):(L.get(r).set(c,s),uni[r](s)),t({result:null})}if(r.startsWith("off")&&V.includes(r.replace("off","on"))){var l=r.replace("off","on");if(L.has(l)){var f=o[0];if(void 0!==f){var d=L.get(l).get(f);uni[r](d),L.get(l).delete(f)}else{L.get(l).forEach((function(e){uni[r](e)})),L.delete(l)}}return t({result:null})}if(r.indexOf("Socket")>0)return B(e({method:r.replace("Socket","")},o[0])).then((function(e){return t(e)})).catch((function(e){return i(e)}));if(!uni[r])return i(Error("uni."+r+" not exists"));if(j(r))return t({result:uni[r].apply(uni,o)});var g=[Object.assign({},o[0]||{},{success:function(e){setTimeout((function(){t({result:e})}),"pageScrollTo"===r?350:0)},fail:function(e){i(Error(e.errMsg.replace(r+":fail ","")))}})];uni[r].apply(uni,g)}else(u=o[0].id,a=o[0].url,new Promise((function(e,t){var n=uni.connectSocket({url:a,success:function(){e({result:{errMsg:"connectSocket:ok"}})},fail:function(){t({result:{errMsg:"connectSocket:fail"}})}});W.set(u,{instance:n,isOpend:!1}),n.onOpen((function(e){W.get(u).isOpend=!0,W.get(u).openData=e}))}))).then((function(e){return t(e)})).catch((function(e){return i(e)}))}))},mockUniMethod:function(e){var t=e.method;if(!uni[t])throw Error("uni."+t+" not exists");if(!function(e){return!R.test(e)}(t))throw Error("You can't mock uni."+t);var n,r=e.result,o=e.functionDeclaration;return s(r)&&s(o)?(U[t]&&(uni[t]=U[t],delete U[t]),Promise.resolve()):(n=s(o)?j(t)?function(){return r}:function(e){setTimeout((function(){r.errMsg&&-1!==r.errMsg.indexOf(":fail")?e.fail&&e.fail(r):e.success&&e.success(r),e.complete&&e.complete(r)}),4)}:function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return new Function("return "+o)().apply(n,t.concat(e.args))},n.origin=U[t]||uni[t],U[t]||(U[t]=uni[t]),uni[t]=n,Promise.resolve())},captureScreenshot:function(e){return new Promise((function(e,t){t(Error("captureScreenshot fail: supported only on the app platform."))}))},socketEmitter:function(t){return new Promise((function(n,r){(function(t){return new Promise((function(n,r){if(W.has(t.id)){var o=W.get(t.id),i=o.instance,u=t.method,a=t.id;if("onOpen"==u)return D(o,n);if(u.startsWith("on"))return i[u]((function(e){n({method:"Socket."+u,id:a,data:e})}));i[u](e(e({},t),{success:function(e){n(e),"close"===u&&W.delete(t.id)},fail:function(e){r(e)}}))}else r({errMsg:"socketTask not exists."})}))})(t).then((function(e){return n(e)})).catch((function(e){return r(e)}))}))}},J=X,Y={getData:function(e){return $(I(e.pageId),e.path)},setData:function(e){return x(I(e.pageId),e.data)},callMethod:function(e){var t,n=((t={})[T.VM_NOT_EXISTS]="Page["+e.pageId+"] not exists",t[T.METHOD_NOT_EXISTS]="page."+e.method+" not exists",t);return new Promise((function(t,r){A(I(e.pageId),e.method,e.args).then((function(e){return t(e)})).catch((function(e){r(Error(n[e]))}))}))},callMethodWithCallback:function(e){var t,n=((t={})[T.VM_NOT_EXISTS]="callMethodWithCallback:fail, Page["+e.pageId+"] not exists",t[T.METHOD_NOT_EXISTS]="callMethodWithCallback:fail, page."+e.method+" not exists",t),r=e.args[e.args.length-1];A(I(e.pageId),e.method,e.args).catch((function(e){r({errMsg:n[e]})}))}};function F(e){return e.nodeId||e.elementId}var z={getData:function(e){return $(k(e.pageId,F(e)),e.path)},setData:function(e){return x(k(e.pageId,F(e)),e.data)},callMethod:function(e){var t,n=F(e),r=((t={})[T.VM_NOT_EXISTS]="Component["+e.pageId+":"+n+"] not exists",t[T.METHOD_NOT_EXISTS]="component."+e.method+" not exists",t);return new Promise((function(t,o){A(k(e.pageId,n),e.method,e.args).then((function(e){return t(e)})).catch((function(e){o(Error(r[e]))}))}))}},G={};Object.keys(J).forEach((function(e){G["App."+e]=J[e]})),Object.keys(Y).forEach((function(e){G["Page."+e]=Y[e]})),Object.keys(z).forEach((function(e){G["Element."+e]=z[e]}));var K,Q,Z=process.env.UNI_AUTOMATOR_WS_ENDPOINT;function ee(e){Q.send({data:JSON.stringify(e)})}function te(e){var t=JSON.parse(e.data),n=t.id,r=t.method,o=t.params,i={id:n},u=G[r];if(!u){if(K){var a=K(n,r,o,i);if(!0===a)return;u=a}if(!u)return i.error={message:r+" unimplemented"},ee(i)}try{u(o,ee).then((function(e){e&&(i.result=e)})).catch((function(e){i.error={message:e.message}})).finally((function(){ee(i)}))}catch(e){i.error={message:e.message},ee(i)}}K=function(e,t,n,r){var o=n.pageId,i=function(e){var t=getCurrentPages();if(!e)return t[t.length-1];return t.find((function(t){return t.$page.id===e}))}(o);return i?(i.$page.meta.isNVue,UniServiceJSBridge.publishHandler("sendAutoMessage",{id:e,method:t,params:n},o),!0):(r.error={message:"page["+o+"] not exists"},ee(r),!0)},UniServiceJSBridge.subscribe("onAutoMessageReceive",(function(e){ee(e)})),setTimeout((function(){var e;void 0===e&&(e={}),(Q=uni.connectSocket({url:Z,complete:function(){}})).onMessage(te),Q.onOpen((function(t){e.success&&e.success(),console.log("已开启自动化测试...")})),Q.onError((function(e){console.log("automator.onError",e)})),Q.onClose((function(){e.fail&&e.fail({errMsg:"$$initRuntimeAutomator:fail"}),console.log("automator.onClose")}))}),500);
