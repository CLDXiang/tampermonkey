import { insertStyle } from '@shared/css'

const appElement = document.getElementById('app') || document.body
const currentFontFamily = window.getComputedStyle(appElement).fontFamily

if (!currentFontFamily.includes('HarmonyOS_Regular')) {
  let fontFamily
  const pingFangRegex = /["']?PingFang SC["']?/i
  if (pingFangRegex.test(currentFontFamily))
    fontFamily = currentFontFamily.replace(pingFangRegex, '"PingFang SC", "HarmonyOS Sans SC"')
  else
    fontFamily = `"HarmonyOS Sans SC", ${currentFontFamily}`

  insertStyle(`html, body, #app, p { font-family: ${fontFamily} !important; }`)
}
