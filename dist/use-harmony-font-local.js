// ==UserScript==
// @name 使用 HarmonyOS Sans SC 字体，在 Windows 下获得接近苹方的阅读体验
// @namespace http://tampermonkey.net/
// @version 1.2.0
// @description 使用本地 HarmonyOS Sans SC 字体，提升不支持苹方的平台（Windows，说的就是你）阅读体验。需要本地安装字体
// @author CLDXiang
// @website https://github.com/CLDXiang/tampermonkey
// @license MIT
// @match *://*/*
// @exclude *://*bilibili.com/*
// @grant none
// @run-at document-start
// ==/UserScript==

"use strict";
(() => {
  // src/shared/css.ts
  function insertStyle(css, key) {
    const style = document.createElement("style");
    style.innerHTML = css;
    if (key)
      style.dataset[key] = "";
    document.head.appendChild(style);
  }
  function insertRemovableStyle(css, key) {
    const style = document.createElement("style");
    style.innerHTML = css;
    document.head.appendChild(style);
    if (key)
      style.dataset[key] = "";
    return {
      rm: () => style.remove(),
      style
    };
  }

  // src/use-harmony-font-local/main.mts
  var FONT_NAME = "HarmonyOS Sans SC";
  var REPLACE_FONT_REGEX = /["']?(system-ui|-apple-system|PingFang SC|SF Pro SC|Microsoft YaHei|ui-sans-serif)["']?/i;
  function modifyFontFamily(fontFamily, forceInsert = false) {
    if (REPLACE_FONT_REGEX.test(fontFamily) || forceInsert)
      return `"${FONT_NAME}", ${fontFamily}`;
    return false;
  }
  var removeTempStyle = () => {
  };
  var tempStyle = null;
  function insertTempStyle() {
    const appElement = document.getElementById("app") || document.body;
    const currentFontFamily = window.getComputedStyle(appElement).fontFamily;
    const fontFamily = modifyFontFamily(currentFontFamily, true);
    const { style, rm } = insertRemovableStyle(`.use-harmony-font-mark, html, body, #app, p, textarea, select, input, button, a { font-family: ${fontFamily} !important; } body { font-weight: 400; -webkit-font-smoothing: antialiased; }`, "harmonyFont");
    tempStyle = style;
    removeTempStyle = rm;
  }
  if (document.body)
    insertTempStyle();
  function executeWhenDocumentReady() {
    if (!tempStyle)
      insertTempStyle();
    let newStyleContent = "";
    let selectorHasAppElement = false;
    for (let i = 0; i < document.styleSheets.length; i++) {
      try {
        const sheet = document.styleSheets[i];
        for (let j = 0; j < sheet.cssRules.length; j++) {
          const rule = sheet.cssRules[j];
          if (rule.style && rule.style.fontFamily && !rule.selectorText.startsWith(".use-harmony-font-mark")) {
            const newFontFamily = modifyFontFamily(rule.style.fontFamily);
            if (newFontFamily) {
              console.log("wtf", rule.style.fontFamily);
              let css = `font-family: ${newFontFamily};`;
              if (rule.style.fontWeight && Number.parseInt(rule.style.fontWeight, 10) < 400)
                css += "font-weight: 400;";
              newStyleContent += `${rule.selectorText} { ${css} }
`;
              if (!selectorHasAppElement && (rule.selectorText.includes("#app") || rule.selectorText.includes("html") || rule.selectorText.includes("body")))
                selectorHasAppElement = true;
            }
          }
        }
      } catch {
      }
    }
    if (newStyleContent) {
      insertStyle(newStyleContent, "harmonyFont");
      if (selectorHasAppElement)
        removeTempStyle();
    }
  }
  if (document.readyState === "interactive" || document.readyState === "complete")
    executeWhenDocumentReady();
  else
    document.addEventListener("DOMContentLoaded", executeWhenDocumentReady);
})();
