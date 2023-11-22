import { insertStyle } from '@shared/css'

const appElement = document.getElementById('app') || document.body
const currentFontFamily = window.getComputedStyle(appElement).fontFamily

const FONT_NAME = 'HarmonyOS Sans SC'

if (!currentFontFamily.includes(FONT_NAME)) {
  let fontFamily
  const pingFangRegex = /["']?PingFang SC["']?/i
  if (pingFangRegex.test(currentFontFamily))
    fontFamily = currentFontFamily.replace(pingFangRegex, `"PingFang SC", "${FONT_NAME}"`)
  else
    fontFamily = `"${FONT_NAME}", ${currentFontFamily}`

  insertStyle(`html, body, #app, p { font-family: ${fontFamily} !important; }`)
}
