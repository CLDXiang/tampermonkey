// ==UserScript==
// @name Bilibili弹幕投票屏蔽
// @namespace http://tampermonkey.net/
// @version 1.2
// @description 挡住我看老婆了
// @author CLDXiang
// @website https://github.com/CLDXiang/tampermonkey
// @license MIT
// @match *://*.bilibili.com/*
// @grant none
// @run-at document-end
// ==/UserScript==

"use strict";
(() => {
  // src/hide-bili-vote/main.mts
  var style = document.createElement("style");
  style.innerText = ".bilibili-player-video-popup-vote,.bili-vote { display: none !important; }";
  document.head.appendChild(style);
})();
