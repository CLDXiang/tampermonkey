// ==UserScript==
// @name Twitter t.co to Direct Link Converter
// @namespace http://tampermonkey.net/
// @version 1.2
// @description 把推特的 t.co 中转跳转链接改为直接跳转
// @description:en Automatically converts Twitter's indirect t.co links into direct, original URLs for a more transparent and streamlined browsing experience.
// @author CLDXiang
// @website https://github.com/CLDXiang/tampermonkey
// @license MIT
// @match *://twitter.com/*
// @match *://x.com/*
// @match *://*.twitter.com/*
// @match *://*.x.com/*
// @grant none
// @run-at document-end
// ==/UserScript==

"use strict";
(() => {
  // src/twttier-link-converter/main.ts
  function modifyLink(link) {
    if (link.href.includes("t.co")) {
      let urlText = link.innerText;
      if (urlText.startsWith("http")) {
        if (urlText.endsWith("\u2026"))
          urlText = urlText.slice(0, -1);
        link.href = urlText;
      }
    }
  }
  function observeDOM() {
    try {
      new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === "childList") {
            mutation.addedNodes.forEach((node) => {
              if (node instanceof HTMLElement) {
                if (node instanceof HTMLAnchorElement)
                  modifyLink(node);
                else
                  node.querySelectorAll("a").forEach(modifyLink);
              }
            });
          }
        }
      }).observe(document.body, { childList: true, subtree: true });
    } catch (e) {
      console.log(e);
    }
  }
  document.querySelectorAll("a").forEach(modifyLink);
  observeDOM();
})();
