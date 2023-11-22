import { insertStyle } from '@shared/css'
import { fontFace } from './font-face'

const appElement = document.getElementById('app') || document.body
const currentFontFamily = window.getComputedStyle(appElement).fontFamily

if (!currentFontFamily.includes('HarmonyOS_Regular')) {
  insertStyle(fontFace)

  let fontFamily
  const pingFangRegex = /["']?PingFang SC["']?/i
  if (pingFangRegex.test(currentFontFamily))
    fontFamily = currentFontFamily.replace(pingFangRegex, '"PingFang SC", HarmonyOS_Regular')
  else
    fontFamily = `HarmonyOS_Regular, ${currentFontFamily}`

  insertStyle(`html, body, #app { font-family: ${fontFamily} !important; }`)
}
