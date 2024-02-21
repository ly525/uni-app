import{__spreadArray}from"tslib";var getRandomValues="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto),rnds8=new Uint8Array(16);function rng(){if(!getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return getRandomValues(rnds8)}for(var byteToHex=[],i=0;i<256;++i)byteToHex[i]=(i+256).toString(16).substr(1);function v4(options,buf,offset){var i=buf&&offset||0;"string"==typeof options&&(buf="binary"===options?new Array(16):null,options=null);var rnds=(options=options||{}).random||(options.rng||rng)();if(rnds[6]=15&rnds[6]|64,rnds[8]=63&rnds[8]|128,buf)for(var ii=0;ii<16;++ii)buf[i+ii]=rnds[ii];return buf||function(buf,offset){var i=offset||0,bth=byteToHex;return[bth[buf[i++]],bth[buf[i++]],bth[buf[i++]],bth[buf[i++]],"-",bth[buf[i++]],bth[buf[i++]],"-",bth[buf[i++]],bth[buf[i++]],"-",bth[buf[i++]],bth[buf[i++]],"-",bth[buf[i++]],bth[buf[i++]],bth[buf[i++]],bth[buf[i++]],bth[buf[i++]],bth[buf[i++]]].join("")}(rnds)}var hasOwnProperty=Object.prototype.hasOwnProperty,isArray=Array.isArray,PATH_RE=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;function getPaths(path,data){if(isArray(path))return path;if(data&&(val=data,key=path,hasOwnProperty.call(val,key)))return[path];var val,key,res=[];return path.replace(PATH_RE,(function(match,p1,offset,string){return res.push(offset?string.replace(/\\(\\)?/g,"$1"):p1||match),string})),res}function getDataByPath(data,path){var dataPath,paths=getPaths(path,data);for(dataPath=paths.shift();null!=dataPath;){if(null==(data=data[dataPath]))return;dataPath=paths.shift()}return data}function getVmNodeId(vm){if(vm._$weex)return vm._uid;if(vm._$id)return vm._$id;var parent_1=function(vm){for(var parent=vm.$parent;parent;){if(parent._$id)return parent;parent=parent.$parent}}(vm);if(!vm.$parent)return"-1";var vnode=vm.$vnode,context=vnode.context;return context&&context!==parent_1&&context._$id?context._$id+";"+parent_1._$id+","+vnode.data.attrs._i:parent_1._$id+","+vnode.data.attrs._i}var elementMap=new Map;function transEl(el){var _a,_b;if(!function(el){var _a;if(el){var tagName=el.tagName,vNode=el.__vnode;return 0===tagName.indexOf("UNI-")||"BODY"===tagName||0===tagName.indexOf("V-UNI-")||(null===(_a=null==vNode?void 0:vNode.ctx.type)||void 0===_a?void 0:_a.__reserved)}return!1}(el))throw Error("no such element");var element,elementId,vm,elem={elementId:(element=el,elementId=element._id,elementId||(elementId=v4(),element._id=elementId,elementMap.set(elementId,{id:elementId,element:element})),elementId),tagName:el.tagName.toLocaleLowerCase().replace("uni-","")};el.__vue__?(vm=el.__vue__)&&(vm.$parent&&vm.$parent.$el===el&&(vm=vm.$parent),vm&&!(null===(_a=vm.$options)||void 0===_a?void 0:_a.isReserved)&&(elem.nodeId=getVmNodeId(vm))):(vm=el.__vnode)&&(vm.el===el&&(vm=vm.ctx.parent),vm&&!(null===(_b=vm.type)||void 0===_b?void 0:_b.__reserved)&&(elem.nodeId=getVmNodeId(vm)));return"video"===elem.tagName&&(elem.videoId=elem.nodeId),elem}var FUNCTIONS={input:{input:function(el,value){var vm=el.__vue__;vm?(vm.valueSync=value,vm.$triggerInput({},{value:value})):(vm=el.__vnode).ctx.exposed.$triggerInput({value:value})}},textarea:{input:function(el,value){var vm=el.__vue__;vm?(vm.valueSync=value,vm.$triggerInput({},{value:value})):(vm=el.__vnode).ctx.exposed.$triggerInput({value:value})}},"scroll-view":{scrollTo:function(el,x,y){var main=el.__vue__.$refs.main;main.scrollLeft=x,main.scrollTop=y},scrollTop:function(el){return el.__vue__.$refs.main.scrollTop},scrollLeft:function(el){return el.__vue__.$refs.main.scrollLeft},scrollWidth:function(el){return el.__vue__.$refs.main.scrollWidth},scrollHeight:function(el){return el.__vue__.$refs.main.scrollHeight}},swiper:{swipeTo:function(el,index){el.__vue__.current=index}},"movable-view":{moveTo:function(el,x,y){el.__vue__._animationTo(x,y)}},switch:{tap:function(el){el.click()}},slider:{slideTo:function(el,value){var vm=el.__vue__,slider=vm.$refs["uni-slider"],offsetWidth=slider.offsetWidth,boxLeft=slider.getBoundingClientRect().left;vm.value=value,vm._onClick({x:(value-vm.min)*offsetWidth/(vm.max-vm.min)+boxLeft})}}};function createTouchList(touchInits){var _a,touches=touchInits.map((function(touch){return function(touch){if(document.createTouch)return document.createTouch(window,touch.target,touch.identifier,touch.pageX,touch.pageY,touch.screenX,touch.screenY);return new Touch(touch)}(touch)}));return document.createTouchList?(_a=document).createTouchList.apply(_a,touches):touches}var WebAdapter={getWindow:function(pageId){return window},getDocument:function(pageId){return document},getEl:function(elementId){var element=elementMap.get(elementId);if(!element)throw Error("element destroyed");return element.element},getOffset:function(node){var rect=node.getBoundingClientRect();return Promise.resolve({left:rect.left+window.pageXOffset,top:rect.top+window.pageYOffset})},querySelector:function(context,selector){return"page"===selector&&(selector="body"),Promise.resolve(transEl(context.querySelector(selector)))},querySelectorAll:function(context,selector){var elements=[],nodeList=document.querySelectorAll(selector);return[].forEach.call(nodeList,(function(node){try{elements.push(transEl(node))}catch(e){}})),Promise.resolve({elements:elements})},queryProperties:function(context,names){return Promise.resolve({properties:names.map((function(name){var value=getDataByPath(context,name.replace(/-([a-z])/g,(function(g){return g[1].toUpperCase()})));return"document.documentElement.scrollTop"===name&&0===value&&(value=getDataByPath(context,"document.body.scrollTop")),"innerText"===name?value.replace(/\n/g,""):value}))})},queryAttributes:function(context,names){return Promise.resolve({attributes:names.map((function(name){return String(context.getAttribute(name))}))})},queryStyles:function(context,names){var style=getComputedStyle(context);return Promise.resolve({styles:names.map((function(name){return style[name]}))})},queryHTML:function(context,type){return Promise.resolve({html:(html="outer"===type?context.outerHTML:context.innerHTML,html.replace(/\n/g,"").replace(/(<uni-text[^>]*>)(<span[^>]*>[^<]*<\/span>)(.*?<\/uni-text>)/g,"$1$3").replace(/<\/?[^>]*>/g,(function(replacement){return-1<replacement.indexOf("<body")?"<page>":"</body>"===replacement?"</page>":0!==replacement.indexOf("<uni-")&&0!==replacement.indexOf("</uni-")?"":replacement.replace(/uni-/g,"").replace(/ role=""/g,"").replace(/ aria-label=""/g,"")})))});var html},dispatchTapEvent:function(el){return el.click(),Promise.resolve()},dispatchLongpressEvent:function(el){return Promise.resolve()},dispatchTouchEvent:function(el,type,eventInitDict){eventInitDict||(eventInitDict={}),eventInitDict.touches||(eventInitDict.touches=[]),eventInitDict.changedTouches||(eventInitDict.changedTouches=[]),eventInitDict.touches.length||eventInitDict.touches.push({identifier:Date.now(),target:el});var touches=createTouchList(eventInitDict.touches),changedTouches=createTouchList(eventInitDict.changedTouches),targetTouches=createTouchList([]);return el.dispatchEvent(new TouchEvent(type,{cancelable:!0,bubbles:!0,touches:touches,targetTouches:targetTouches,changedTouches:changedTouches})),Promise.resolve()},callFunction:function(el,functionName,args){var fn=getDataByPath(FUNCTIONS,functionName);return fn?Promise.resolve({result:fn.apply(null,__spreadArray([el],args,!0))}):Promise.reject(Error("".concat(functionName," not exists")))},triggerEvent:function(el,type,detail){var vm=el.__vue__;return vm.$trigger&&vm.$trigger(type,{},detail),Promise.resolve()}};var Api=Object.assign({},function(adapter){return{"Page.getElement":function(params){return adapter.querySelector(adapter.getDocument(params.pageId),params.selector)},"Page.getElements":function(params){return adapter.querySelectorAll(adapter.getDocument(params.pageId),params.selector)},"Page.getWindowProperties":function(params){return adapter.queryProperties(adapter.getWindow(params.pageId),params.names)}}}(WebAdapter),function(adapter){var getEl=function(params){return adapter.getEl(params.elementId,params.pageId)};return{"Element.getElement":function(params){return adapter.querySelector(getEl(params),params.selector)},"Element.getElements":function(params){return adapter.querySelectorAll(getEl(params),params.selector)},"Element.getDOMProperties":function(params){return adapter.queryProperties(getEl(params),params.names)},"Element.getProperties":function(params){var el=getEl(params),ctx=el.__vue__||el.attr||{};return el.__vueParentComponent&&(ctx=Object.assign({},ctx,el.__vueParentComponent.attrs,el.__vueParentComponent.props)),adapter.queryProperties(ctx,params.names)},"Element.getOffset":function(params){return adapter.getOffset(getEl(params))},"Element.getAttributes":function(params){return adapter.queryAttributes(getEl(params),params.names)},"Element.getStyles":function(params){return adapter.queryStyles(getEl(params),params.names)},"Element.getHTML":function(params){return adapter.queryHTML(getEl(params),params.type)},"Element.tap":function(params){return adapter.dispatchTapEvent(getEl(params))},"Element.longpress":function(params){return adapter.dispatchLongpressEvent(getEl(params))},"Element.touchstart":function(params){return adapter.dispatchTouchEvent(getEl(params),"touchstart",params)},"Element.touchmove":function(params){return adapter.dispatchTouchEvent(getEl(params),"touchmove",params)},"Element.touchend":function(params){return adapter.dispatchTouchEvent(getEl(params),"touchend",params)},"Element.callFunction":function(params){return adapter.callFunction(getEl(params),params.functionName,params.args)},"Element.triggerEvent":function(params){return adapter.triggerEvent(getEl(params),params.type,params.detail)}}}(WebAdapter));function send(data){return UniViewJSBridge.publishHandler("onAutoMessageReceive",data)}UniViewJSBridge.subscribe("sendAutoMessage",(function(_a){var id=_a.id,method=_a.method,params=_a.params,data={id:id},fn=Api[method];if(!fn)return data.error={message:method+" unimplemented"},send(data);try{fn(params).then((function(res){res&&(data.result=res)})).catch((function(err){data.error={message:err.message}})).finally((function(){send(data)}))}catch(err){data.error={message:err.message},send(data)}}));
