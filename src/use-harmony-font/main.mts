import { fontFace } from './font-face'

const appElement = document.getElementById('app') || document.body
const currentFontFamily = window.getComputedStyle(appElement).fontFamily

if (!currentFontFamily.includes('HarmonyOS_Regular')) {
  const styleElement = document.createElement('style')
  styleElement.textContent = fontFace
  document.head.appendChild(styleElement)

  const pingFangRegex = /["']?PingFang SC["']?/i
  if (pingFangRegex.test(currentFontFamily))
    appElement.style.fontFamily = currentFontFamily.replace(pingFangRegex, '"PingFang SC", HarmonyOS_Regular')
  else
    appElement.style.fontFamily = `HarmonyOS_Regular, ${currentFontFamily}`
}
