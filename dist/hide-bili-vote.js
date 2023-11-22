// ==UserScript==
// @name Bilibili弹幕投票屏蔽
// @namespace http://tampermonkey.net/
// @version 1.4.0
// @description 挡住我看老婆了
// @author CLDXiang
// @website https://github.com/CLDXiang/tampermonkey
// @license MIT
// @match *://*bilibili.com/*
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

  // src/hide-bili-vote/main.mts
  insertStyle(".bilibili-player-video-popup-vote,.bili-vote { display: none !important; }");
})();
