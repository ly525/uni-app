"use strict";var t=require("fs"),e=require("debug"),s=require("postcss-selector-parser"),i=require("fs-extra"),a=require("licia/dateFormat"),r=require("path"),o=require("util"),n=require("jimp");function l(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var c=l(t),d=l(e),u=l(s),h=l(i),p=l(a),m=l(r),y=l(n);function f(t){t.walk((t=>{if("tag"===t.type){const e=t.value;t.value="page"===e?"body":"uni-"+e}}))}d.default("automator:devtool");const v=["Page.getElement","Page.getElements","Element.getElement","Element.getElements"];const g=/^win/.test(process.platform);function $(t){try{return require(t)}catch(e){return require(require.resolve(t,{paths:[process.cwd()]}))}}const M=d.default("automator:launcher"),w=o.promisify(c.default.readdir),P=o.promisify(c.default.stat);async function A(t){const e=await w(t);return(await Promise.all(e.map((async e=>{const s=r.resolve(t,e);return(await P(s)).isDirectory()?A(s):s})))).reduce(((t,e)=>t.concat(e)),[])}class E{constructor(t){this.isX=!1,"true"===process.env.UNI_APP_X&&(this.isX=!0),this.id=t.id,this.app=t.executablePath,this.appid=t.appid||process.env.UNI_APP_ID||"HBuilder",this.package=t.package||(this.isX?"io.dcloud.uniappx":"io.dcloud.HBuilder"),this.activity=t.activity||(this.isX?"io.dcloud.uniapp.UniAppActivity":"io.dcloud.PandoraEntry")}shouldPush(){return this.exists(this.FILE_APP_SERVICE).then((()=>(M(`${p.default("yyyy-mm-dd HH:MM:ss:l")} ${this.FILE_APP_SERVICE} exists`),!1))).catch((()=>(M(`${p.default("yyyy-mm-dd HH:MM:ss:l")} ${this.FILE_APP_SERVICE} not exists`),!0)))}push(t){return A(t).then((e=>{const s=e.map((e=>{const s=(t=>g?t.replace(/\\/g,"/"):t)(r.join(this.DIR_WWW,r.relative(t,e)));return M(`${p.default("yyyy-mm-dd HH:MM:ss:l")} push ${e} ${s}`),this.pushFile(e,s)}));return Promise.all(s)})).then((t=>!0))}get FILE_APP_SERVICE(){return`${this.DIR_WWW}/app-service.js`}}const S=d.default("automator:simctl");function _(t){const e=parseInt(t);return e>9?String(e):"0"+e}class H extends E{constructor(){super(...arguments),this.bundleVersion=""}async init(){const t=$("node-simctl").Simctl;this.tool=new t({udid:this.id});try{await this.tool.bootDevice()}catch(t){}await this.initSDCard(),S(`${p.default("yyyy-mm-dd HH:MM:ss:l")} init ${this.id}`)}async initSDCard(){const t=await this.tool.appInfo(this.package);S(`${p.default("yyyy-mm-dd HH:MM:ss:l")} appInfo ${t}`);const e=t.match(/DataContainer\s+=\s+"(.*)"/);if(!e)return Promise.resolve("");const s=t.match(/CFBundleVersion\s+=\s+(.*);/);if(!s)return Promise.resolve("");this.sdcard=e[1].replace("file:",""),this.bundleVersion=s[1],S(`${p.default("yyyy-mm-dd HH:MM:ss:l")} install ${this.sdcard}`)}async version(){return Promise.resolve(this.bundleVersion)}formatVersion(t){const e=t.split(".");return 3!==e.length?t:e[0]+_(e[1])+_(e[2])}async install(){return S(`${p.default("yyyy-mm-dd HH:MM:ss:l")} install ${this.app}`),await this.tool.installApp(this.app),await this.tool.grantPermission(this.package,"all"),await this.initSDCard(),Promise.resolve(!0)}async start(){try{await this.tool.terminateApp(this.package)}catch(t){}try{await this.tool.launchApp(this.package)}catch(t){console.error(t)}return Promise.resolve(!0)}async exit(){return await this.tool.terminateApp(this.package),await this.tool.shutdownDevice(),Promise.resolve(!0)}async captureScreenshot(){return Promise.resolve(await this.tool.getScreenshot())}exists(t){return h.default.existsSync(t)?Promise.resolve(!0):Promise.reject(Error(`${t} not exists`))}pushFile(t,e){return Promise.resolve(h.default.copySync(t,e))}get DIR_WWW(){return`${this.sdcard}/Documents/Pandora/apps/${this.appid}/www/`}}const x=$("adbkit"),b=d.default("automator:adb");class I extends E{constructor(){super(...arguments),this.needStart=!0}async init(){if(this.tool=x.createClient(),b(`${p.default("yyyy-mm-dd HH:MM:ss:l")} init ${await this.tool.version()}`),!this.id){const t=await this.tool.listDevices();if(!t.length)throw Error("Device not found");this.id=t[0].id}this.sdcard=(await this.shell(this.COMMAND_EXTERNAL)).trim(),b(`${p.default("yyyy-mm-dd HH:MM:ss:l")} init ${this.id} ${this.sdcard}`)}root(){return this.tool.root(this.id).then((()=>{b(`${p.default("yyyy-mm-dd HH:MM:ss:l")} root ${this.id} ${this.sdcard}`)})).catch((t=>{b(`${p.default("yyyy-mm-dd HH:MM:ss:l")} root ${this.id} ${t}`)}))}version(){return this.shell(this.COMMAND_VERSION).then((t=>{const e=t.match(/versionName=(.*)/);return e&&e.length>1?e[1]:""}))}formatVersion(t){return t}async install(){let t=!0;try{const e=(await this.tool.getProperties(this.id))["ro.build.version.release"].split(".")[0];parseInt(e)<6&&(t=!1)}catch(t){}if(b(`${p.default("yyyy-mm-dd HH:MM:ss:l")} install ${this.app} permission=${t}`),t){const t=$("adbkit/lib/adb/command.js"),e=t.prototype._send;t.prototype._send=function(t){return 0===t.indexOf("shell:pm install -r ")&&(t=t.replace("shell:pm install -r ","shell:pm install -r -g "),b(`${p.default("yyyy-mm-dd HH:MM:ss:l")} ${t} `)),e.call(this,t)}}return this.tool.install(this.id,this.app).then((()=>{b(`${p.default("yyyy-mm-dd HH:MM:ss:l")} installed`),this.init()}))}start(){return this.needStart?this.exit().then((()=>this.shell(this.COMMAND_START))):Promise.resolve()}exit(){return this.shell(this.COMMAND_STOP)}captureScreenshot(t){return this.tool.screencap(this.id).then((e=>new Promise(((s,i)=>{const a=[];e.on("data",(function(t){a.push(t)})),e.on("end",(function(){var e,r;void 0!==(null===(e=t.area)||void 0===e?void 0:e.x)&&void 0!==(null===(r=t.area)||void 0===r?void 0:r.y)?y.default.read(Buffer.concat(a)).then((e=>{var a,r,o,n;const l=t.area.x,c=t.area.y;let d=e.bitmap.width-l;(null===(a=t.area)||void 0===a?void 0:a.width)&&(d=Math.min(d,null===(r=t.area)||void 0===r?void 0:r.width));let u=e.bitmap.height-c;(null===(o=t.area)||void 0===o?void 0:o.height)&&(u=Math.min(u,null===(n=t.area)||void 0===n?void 0:n.height)),e.crop(l,c,d,u).getBase64Async(y.default.MIME_PNG).then((t=>{s(t.replace("data:image/png;base64,",""))})).catch((t=>{i(t)}))})).catch((t=>{i(t)})):s(Buffer.concat(a).toString("base64"))}))}))))}adbCommand(t){return new Promise((e=>{this.tool.shell(this.id,t).then((t=>{let s,i="";t.on("data",(t=>{i+=t.toString(),s&&clearTimeout(s),s=setTimeout((()=>{e(i)}),50)})),setTimeout((()=>{e(i)}),1500)}))}))}exists(t){return this.tool.stat(this.id,t)}pushFile(t,e){return this.tool.push(this.id,t,e)}async push(t){const e=m.default.join(process.env.UNI_HBUILDERX_PLUGINS,"launcher","out","export","pushResources.js"),s=m.default.join(process.env.UNI_HBUILDERX_PLUGINS,"launcher-tools","tools","adbs","adb"),i=[e,s].map((t=>c.default.promises.access(t,c.default.constants.F_OK).then((()=>`${t} exists`)).catch((()=>`${t} not exists`))));return Promise.all(i).then((()=>{const{PushResources:i}=require(e);return new i({adbPath:s,appid:this.appid,uuid:this.id,packageName:this.package,sourcePath:t}).start(),this.needStart=!1,!0})).catch((async e=>(console.log("pushResources or adb not exists: ",e),await super.push(t))))}shell(t){return b(`${p.default("yyyy-mm-dd HH:MM:ss:l")} SEND ► ${t}`),this.tool.shell(this.id,t).then(x.util.readAll).then((t=>{const e=t.toString();return b(`${p.default("yyyy-mm-dd HH:MM:ss:l")} ◀ RECV ${e}`),e}))}get DIR_WWW(){return`/storage/emulated/0/Android/data/${this.package}/apps/${this.appid}/www`}get COMMAND_EXTERNAL(){return"echo $EXTERNAL_STORAGE"}get COMMAND_VERSION(){return`dumpsys package ${this.package}`}get COMMAND_STOP(){return`am force-stop ${this.package}`}get COMMAND_START(){return`am start -n ${this.package}/${this.activity} --es appid ${this.appid} --ez needUpdateApp false --ez reload true --ez externalStorage true`}}const D=d.default("automator:devtool");let N,C=!1;const R={android:/android_version=(.*)/,ios:/iphone_version=(.*)/};const k={"Tool.close":{reflect:async()=>{}},"App.exit":{reflect:async()=>N.exit()},"App.enableLog":{reflect:()=>Promise.resolve()},"App.captureScreenshotWithADB":{reflect:async(t,e)=>{const s=await N.captureScreenshot(e);return D(`App.captureScreenshot ${s.length}`),{data:s}}},"App.adbCommand":{reflect:async(t,e)=>{const s=await N.adbCommand(e);return D(`App.adbCommand ${s.length}`),{data:s}}}};!function(t){v.forEach((e=>{t[e]=function(t){return{reflect:async(e,s)=>e(t,s,!1),params:t=>(t.selector&&(t.selector=u.default(f).processSync(t.selector)),t)}}(e)}))}(k);const O={devtools:{name:"App",paths:[],required:["manifest.json","app-service.js"],validate:async function(t,e){t.platform=(t.platform||process.env.UNI_OS_NAME).toLocaleLowerCase(),Object.assign(t,t[t.platform]),N=function(t,e){return"ios"===t?new H(e):new I(e)}(t.platform,t),await N.init();const s=await N.version();if(s){if(t.version){const e=N.formatVersion(function(t,e){if(t.endsWith(".txt"))try{const s=c.default.readFileSync(t).toString().match(R[e]);if(s)return s[1]}catch(t){console.error(t)}return t}(t.version,t.platform));D(`version: ${s}`),D(`newVersion: ${e}`),e!==s&&(C=!0)}}else C=!0;if(C){if(!t.executablePath)throw Error(`app-plus->${t.platform}->executablePath is not provided`);if(!c.default.existsSync(t.executablePath))throw Error(`${t.executablePath} not exists`)}return t},create:async function(t,e,s){C&&await N.install(),(C||s.compiled||await N.shouldPush())&&await N.push(t),await N.start()}},adapter:k};module.exports=O;
