import { ref, onMounted, Ref, watchEffect } from 'vue'
import { hasOwn } from '@vue/shared'
import {
  defineBuiltInComponent,
  useAttrs,
  UniElement,
} from '@dcloudio/uni-components'
import { getRealPath } from '@dcloudio/uni-platform'
import { once, ON_WEB_INVOKE_APP_SERVICE } from '@dcloudio/uni-shared'
import { onWebInvokeAppService } from '../../../service/onWebInvokeAppService'

const Invoke = /*#__PURE__*/ once(() =>
  UniServiceJSBridge.on(ON_WEB_INVOKE_APP_SERVICE, onWebInvokeAppService)
)

const props = {
  src: {
    type: String,
    default: '',
  },
}

type RootRef = Ref<HTMLElement | null>

class UniWebViewElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  inheritAttrs: false,
  name: 'WebView',
  props,
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-web-view',
    class: UniWebViewElement,
  },
  //#endif
  setup(props) {
    Invoke()
    const rootRef: RootRef = ref(null)
    const iframeRef: RootRef = ref(null)
    const { $attrs, $excludeAttrs, $listeners } = useAttrs({
      excludeListeners: true,
    })

    const renderIframe = () => {
      const iframe = document.createElement('iframe')
      watchEffect(() => {
        for (const key in $attrs.value) {
          if (hasOwn($attrs.value, key)) {
            const attr = ($attrs.value as any)[key]
            ;(iframe as any)[key] = attr
          }
        }
      })
      watchEffect(() => {
        iframe.src = getRealPath(props.src)
      })
      iframeRef.value = iframe
    }

    __NODE_JS__ ? onMounted(renderIframe) : renderIframe()
    onMounted(() => {
      rootRef.value?.appendChild(iframeRef.value!)
    })

    //#if _X_ && !_NODE_JS_
    onMounted(() => {
      const rootElement = rootRef.value as UniWebViewElement
      rootElement.attachVmProps(props)
    })
    //#endif

    return () => {
      return (
        <uni-web-view
          class="uni-webview"
          {...$listeners.value}
          {...$excludeAttrs.value}
          ref={rootRef}
        />
      )
    }
  },
})
