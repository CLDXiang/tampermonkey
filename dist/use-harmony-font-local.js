// ==UserScript==
// @name 使用 HarmonyOS Sans SC 字体，在 Windows 下获得接近苹方的阅读体验
// @namespace http://tampermonkey.net/
// @version 1.1.0
// @description 使用本地 HarmonyOS Sans SC 字体，提升不支持苹方的平台（Windows，说的就是你）阅读体验。需要本地安装字体
// @author CLDXiang
// @website https://github.com/CLDXiang/tampermonkey
// @license MIT
// @match *://*/*
// @exclude *://*bilibili.com/*
// @grant none
// @run-at document-end
// ==/UserScript==

"use strict";
(() => {
  // src/shared/css.ts
  function insertStyle(css) {
    const style = document.createElement("style");
    style.innerHTML = css;
    document.head.appendChild(style);
  }

  // src/use-harmony-font-local/main.mts
  var appElement = document.getElementById("app") || document.body;
  var currentFontFamily = window.getComputedStyle(appElement).fontFamily;
  var FONT_NAME = "HarmonyOS Sans SC";
  if (!currentFontFamily.includes(FONT_NAME)) {
    let fontFamily;
    const pingFangRegex = /["']?PingFang SC["']?/i;
    if (pingFangRegex.test(currentFontFamily))
      fontFamily = currentFontFamily.replace(pingFangRegex, `"PingFang SC", "${FONT_NAME}"`);
    else
      fontFamily = `"${FONT_NAME}", ${currentFontFamily}`;
    insertStyle(`html, body, #app, p { font-family: ${fontFamily} !important; }`);
  }
})();
