import { insertRemovableStyle, insertStyle } from '@shared/css'

const FONT_NAME = 'HarmonyOS Sans SC'
const REPLACE_FONT_REGEX = /["']?(system-ui|-apple-system|PingFang SC|SF Pro SC|Microsoft YaHei|ui-sans-serif)["']?/i

function modifyFontFamily(fontFamily: string, forceInsert?: false): string | false
function modifyFontFamily(fontFamily: string, forceInsert: true): string
function modifyFontFamily(fontFamily: string, forceInsert = false) {
  if (REPLACE_FONT_REGEX.test(fontFamily) || forceInsert)
    return `"${FONT_NAME}", ${fontFamily}`
  return false
}

let removeTempStyle = () => {}
let tempStyle: HTMLStyleElement | null = null
function insertTempStyle() {
  const appElement = document.getElementById('app') || document.body
  const currentFontFamily = window.getComputedStyle(appElement).fontFamily

  const fontFamily = modifyFontFamily(currentFontFamily, true)
  const { style, rm } = insertRemovableStyle(`.use-harmony-font-mark, html, body, #app, p, textarea, select, input, button, a { font-family: ${fontFamily} !important; } body { font-weight: 400; -webkit-font-smoothing: antialiased; }`, 'harmonyFont')
  tempStyle = style
  removeTempStyle = rm
}
if (document.body) insertTempStyle()

function executeWhenDocumentReady() {
  if (!tempStyle) insertTempStyle()

  let newStyleContent = ''
  let selectorHasAppElement = false

  for (let i = 0; i < document.styleSheets.length; i++) {
    try {
      const sheet = document.styleSheets[i]
      for (let j = 0; j < sheet.cssRules.length; j++) {
        const rule = sheet.cssRules[j] as CSSStyleRule
        if (rule.style && rule.style.fontFamily && !rule.selectorText.startsWith('.use-harmony-font-mark')) {
          const newFontFamily = modifyFontFamily(rule.style.fontFamily)
          if (newFontFamily) {
            let css = `font-family: ${newFontFamily};`
            if (rule.style.fontWeight && Number.parseInt(rule.style.fontWeight, 10) < 400)
              css += 'font-weight: 400;'
            newStyleContent += `${rule.selectorText} { ${css} }\n`
            if (!selectorHasAppElement && (rule.selectorText.includes('#app') || rule.selectorText.includes('html') || rule.selectorText.includes('body')))
              selectorHasAppElement = true
          }
        }
      }
    } catch {}
  }

  if (newStyleContent) {
    insertStyle(newStyleContent, 'harmonyFont')
    if (selectorHasAppElement) removeTempStyle()
  }
}

if (document.readyState === 'interactive' || document.readyState === 'complete')
  executeWhenDocumentReady()
else
  document.addEventListener('DOMContentLoaded', executeWhenDocumentReady)
