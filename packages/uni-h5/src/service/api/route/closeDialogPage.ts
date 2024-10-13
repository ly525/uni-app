import { decrementEscBackPageNum } from '../../../framework/setup/page'
import { invokeHook } from '@dcloudio/uni-core'
import { ON_SHOW, ON_UNLOAD } from '@dcloudio/uni-shared'
import type { CloseDialogPageOptions } from '@dcloudio/uni-app-x/types/uni'
import type { UniDialogPage } from '@dcloudio/uni-app-x/types/page'

export const closeDialogPage = (options?: CloseDialogPageOptions) => {
  const currentPages = getCurrentPages() as UniPage[]
  const currentPage = currentPages[currentPages.length - 1]
  if (!currentPage) {
    triggerFailCallback(options, 'currentPage is null')
    return
  }

  if (options?.dialogPage) {
    const dialogPage = options?.dialogPage! as UniDialogPage
    const parentPage = dialogPage.getParentPage()
    if (parentPage && currentPages.indexOf(parentPage) !== -1) {
      const parentDialogPages = parentPage.getDialogPages()
      const index = parentDialogPages.indexOf(dialogPage)
      parentDialogPages.splice(index, 1)
      invokeHook(dialogPage.$vm!, ON_UNLOAD)
      if (index > 0 && index === parentDialogPages.length) {
        invokeHook(
          parentDialogPages[parentDialogPages.length - 1].$vm!,
          ON_SHOW
        )
      }
      if (!dialogPage.$disableEscBack) {
        decrementEscBackPageNum()
      }
    } else {
      triggerFailCallback(options, 'dialogPage is not a valid page')
      return
    }
  } else {
    const dialogPages = currentPage.getDialogPages()
    for (let i = dialogPages.length - 1; i >= 0; i--) {
      invokeHook(dialogPages[i].$vm!, ON_UNLOAD)
      if (i > 0) {
        invokeHook(dialogPages[i - 1].$vm!, ON_SHOW)
      }
      if (!dialogPages[i].$disableEscBack) {
        decrementEscBackPageNum()
      }
    }
    dialogPages.length = 0
  }

  const successOptions = { errMsg: 'closeDialogPage: ok' }
  options?.success?.(successOptions)
  options?.complete?.(successOptions)
}

function triggerFailCallback(
  options: CloseDialogPageOptions | undefined,
  errMsg: string
) {
  const failOptions = new UniError(
    'uni-closeDialogPage',
    4,
    `closeDialogPage: fail, ${errMsg}`
  )
  // @ts-expect-error
  options?.fail?.(failOptions)
  options?.complete?.(failOptions)
}
