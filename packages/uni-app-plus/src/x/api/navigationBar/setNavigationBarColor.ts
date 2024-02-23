import {
  defineAsyncApi,
  API_SET_NAVIGATION_BAR_COLOR,
  API_TYPE_SET_NAVIGATION_BAR_COLOR,
  SetNavigationBarColorProtocol,
  SetNavigationBarColorOptions,
} from '@dcloudio/uni-api'

import { getCurrentPage } from '@dcloudio/uni-core'
import { ComponentPublicInstance } from 'vue'

interface SetNavigationbarColorOptions
  extends UniApp.SetNavigationbarColorOptions {
  __page__?: ComponentPublicInstance
}

export const setNavigationBarColor =
  defineAsyncApi<API_TYPE_SET_NAVIGATION_BAR_COLOR>(
    API_SET_NAVIGATION_BAR_COLOR,
    (
      { frontColor, backgroundColor }: SetNavigationbarColorOptions,
      { resolve, reject }
    ) => {
      // types?
      const page = getCurrentPage() as any
      if (!page) {
        reject('page is not ready')
        return
      }

      const appPage = page.$getAppPage()

      appPage!.updateStyle(
        new Map<string, any | null>([
          [
            'navigationBar',
            new Map<string, any | null>([
              [
                'navigationBarTextStyle',
                frontColor == '#000000' ? 'black' : 'white',
              ],
              ['navigationBarBackgroundColor', backgroundColor],
            ]),
          ],
        ])
      )
      resolve()
    },
    SetNavigationBarColorProtocol,
    SetNavigationBarColorOptions
  )
