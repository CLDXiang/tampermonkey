// ==UserScript==
// @name 字体替换为 HarmonyOS，在 Windows 下获得接近苹方的阅读体验
// @namespace http://tampermonkey.net/
// @version 1.3
// @description 使用和 Bilibili 一样的 HarmonyOS 字体，提升不支持苹方的平台（Windows，说的就是你）阅读体验。仅对常见根节点进行检查，不支持字体未声明在根节点的页面，不支持声明了 CSP 限制的页面
// @author CLDXiang
// @website https://github.com/CLDXiang/tampermonkey
// @license MIT
// @match *://*/*
// @exclude *://*bilibili.com/*
// @exclude *://*github.com/*
// @exclude *://*openai.com/*
// @exclude *://*twitter.com/*
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

  // src/use-harmony-font/font-face.ts
  var fontFace = `@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.a.woff2') format('woff2');
  unicode-range: U+9aa2-ffe5;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.b.woff2') format('woff2');
  unicode-range: U+8983-9aa0;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.c.woff2') format('woff2');
  unicode-range: U+78f2-897b;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.d.woff2') format('woff2');
  unicode-range: U+646d-78d9;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.e.woff2') format('woff2');
  unicode-range: U+30e0-6445;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.f.woff2') format('woff2');
  unicode-range: U+101-30df;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.g.woff2') format('woff2');
  unicode-range: U+9aa8,U+9ab8,U+9ad3,U+9ad8,U+9b03,U+9b3c,U+9b41-9b42,U+9b44,U+9b4f,U+9b54,U+9c7c,U+9c81,U+9c8d,U+9c9c,U+9ca4,U+9cb8,U+9cc3,U+9cd6,U+9cde,U+9e1f,U+9e21,U+9e23,U+9e25-9e26,U+9e2d,U+9e2f,U+9e33,U+9e35,U+9e3d,U+9e3f,U+9e43,U+9e45,U+9e4a,U+9e4f,U+9e64,U+9e70,U+9e7f,U+9e93,U+9ea6,U+9ebb,U+9ec4,U+9ecd-9ece,U+9ed1,U+9ed4,U+9ed8,U+9f0e,U+9f13,U+9f20,U+9f3b,U+9f50,U+9f7f,U+9f84,U+9f8b,U+9f99-9f9a,U+9f9f,U+ff01,U+ff08-ff09,U+ff0c,U+ff1a-ff1b,U+ff1f;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.h.woff2') format('woff2');
  unicode-range: U+975b,U+975e,U+9760-9762,U+9769,U+9773-9774,U+9776,U+978b,U+978d,U+9798,U+97a0,U+97ad,U+97e6-97e7,U+97e9,U+97ed,U+97f3,U+97f5-97f6,U+9875-9877,U+9879-987b,U+987d-987f,U+9881-9882,U+9884-9888,U+988a,U+9890-9891,U+9893,U+9896-9898,U+989c-989d,U+98a0,U+98a4,U+98a7,U+98ce,U+98d8,U+98de-98df,U+9910,U+9965,U+996d-9972,U+9975-9976,U+997a,U+997c,U+997f,U+9981,U+9985-9986,U+9988,U+998b,U+998f,U+9992,U+9996,U+9999,U+9a6c-9a71,U+9a73-9a74,U+9a76,U+9a79,U+9a7b-9a7c,U+9a7e,U+9a82,U+9a84,U+9a86-9a87,U+9a8b-9a8c,U+9a8f,U+9a91,U+9a97,U+9a9a,U+9aa1,U+9aa4;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.i.woff2') format('woff2');
  unicode-range: U+9570,U+9576,U+957f,U+95e8,U+95ea,U+95ed-95f0,U+95f2,U+95f4,U+95f7-95fb,U+95fd,U+9600-9602,U+9605,U+9609,U+960e,U+9610-9611,U+9614,U+961c,U+961f,U+962e,U+9632-9636,U+963b,U+963f-9640,U+9644-9648,U+964b-964d,U+9650,U+9655,U+965b,U+9661-9662,U+9664,U+9668-966a,U+9675-9677,U+9685-9686,U+968b,U+968f-9690,U+9694,U+9698-9699,U+969c,U+96a7,U+96b6,U+96be,U+96c0-96c1,U+96c4-96c7,U+96cc-96cd,U+96cf,U+96d5,U+96e8,U+96ea,U+96f6-96f7,U+96f9,U+96fe,U+9700,U+9704,U+9707,U+9709,U+970d,U+9713,U+9716,U+971c,U+971e,U+9732,U+9738-9739,U+9752,U+9756,U+9759;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.j.woff2') format('woff2');
  unicode-range: U+9179,U+917f,U+9187,U+9189,U+918b,U+918d,U+9190,U+9192,U+919a-919b,U+91ba,U+91c7,U+91c9-91ca,U+91cc-91cf,U+91d1,U+91dc,U+9274,U+93d6,U+9488-9489,U+948e,U+9492-9493,U+9497,U+9499,U+949d-94a3,U+94a5-94a9,U+94ae,U+94b1,U+94b3,U+94b5,U+94bb,U+94be,U+94c0-94c3,U+94c5-94c6,U+94dc-94dd,U+94e1,U+94e3,U+94ec-94ed,U+94f0-94f2,U+94f6,U+94f8,U+94fa,U+94fe,U+9500-9501,U+9504-9505,U+9508,U+950b-950c,U+9510-9511,U+9517,U+9519-951a,U+9521,U+9523-9526,U+9528,U+952d-9530,U+9539,U+953b,U+9540-9541,U+9547,U+954a,U+954d,U+9550-9551,U+955c,U+9563,U+956d;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.k.woff2') format('woff2');
  unicode-range: U+9001-9003,U+9005-9006,U+9009-900a,U+900d,U+900f-9012,U+9014,U+9017,U+901a-901b,U+901d-9022,U+902e,U+9038,U+903b-903c,U+903e,U+9041-9042,U+9044,U+9047,U+904d,U+904f-9053,U+9057,U+905b,U+9062-9063,U+9065,U+9068,U+906d-906e,U+9075,U+907d,U+907f-9080,U+9082-9083,U+908b,U+9091,U+9093,U+9099,U+90a2-90a3,U+90a6,U+90aa,U+90ae-90af,U+90b1,U+90b5,U+90b8-90b9,U+90bb,U+90c1,U+90ca,U+90ce,U+90d1,U+90dd,U+90e1,U+90e7-90e8,U+90ed,U+90f4,U+90f8,U+90fd,U+9102,U+9119,U+9149,U+914b-914d,U+9152,U+9157,U+915a,U+915d-915e,U+9161,U+9163,U+9165,U+916a,U+916c,U+916e,U+9171,U+9175-9178;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.l.woff2') format('woff2');
  unicode-range: U+8e44,U+8e47-8e48,U+8e4a-8e4b,U+8e51,U+8e59,U+8e66,U+8e6c-8e6d,U+8e6f,U+8e72,U+8e74,U+8e76,U+8e7f,U+8e81,U+8e87,U+8e8f,U+8eab-8eac,U+8eaf,U+8eb2,U+8eba,U+8f66-8f69,U+8f6c,U+8f6e-8f72,U+8f74,U+8f7b,U+8f7d,U+8f7f,U+8f83-8f8a,U+8f8d-8f8e,U+8f90-8f91,U+8f93,U+8f95-8f99,U+8f9b-8f9c,U+8f9e-8f9f,U+8fa3,U+8fa8-8fa9,U+8fab,U+8fb0-8fb1,U+8fb9,U+8fbd-8fbe,U+8fc1-8fc2,U+8fc4-8fc5,U+8fc7-8fc8,U+8fce,U+8fd0-8fd1,U+8fd3-8fd5,U+8fd8-8fd9,U+8fdb-8fdf,U+8fe2,U+8fe6,U+8fe8,U+8fea-8feb,U+8fed,U+8ff0,U+8ff3,U+8ff7-8ff9,U+8ffd,U+9000;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.m.woff2') format('woff2');
  unicode-range: U+8d24-8d31,U+8d34-8d35,U+8d37-8d3f,U+8d41-8d45,U+8d48,U+8d4a-8d4c,U+8d4e-8d50,U+8d54,U+8d56,U+8d58,U+8d5a-8d5b,U+8d5d-8d5e,U+8d60-8d64,U+8d66-8d67,U+8d6b,U+8d70,U+8d74-8d77,U+8d81,U+8d85,U+8d8a-8d8b,U+8d9f,U+8da3,U+8db3-8db4,U+8db8,U+8dbe-8dbf,U+8dc3-8dc4,U+8dcb-8dcc,U+8dd1,U+8dd7,U+8ddb,U+8ddd,U+8ddf,U+8de4,U+8de8,U+8dea,U+8def,U+8df3,U+8df5,U+8df7,U+8dfa-8dfb,U+8e09-8e0a,U+8e0c,U+8e0f,U+8e1d-8e1e,U+8e22,U+8e29-8e2a,U+8e2e,U+8e31,U+8e35,U+8e39,U+8e42;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.n.woff2') format('woff2');
  unicode-range: U+8bc9-8bcd,U+8bcf,U+8bd1,U+8bd3,U+8bd5,U+8bd7-8bd8,U+8bda-8bdb,U+8bdd-8bde,U+8be0-8be9,U+8beb-8bf5,U+8bf7-8bf8,U+8bfa-8bfb,U+8bfd-8c01,U+8c03-8c06,U+8c08,U+8c0a-8c0b,U+8c0d-8c13,U+8c15,U+8c17,U+8c19-8c1c,U+8c22-8c24,U+8c26-8c2a,U+8c2c-8c2d,U+8c30-8c35,U+8c37,U+8c41,U+8c46,U+8c4c,U+8c61-8c62,U+8c6a-8c6b,U+8c79-8c7a,U+8c82,U+8c89,U+8c8c,U+8d1d-8d1f,U+8d21-8d23;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.o.woff2') format('woff2');
  unicode-range: U+889c,U+88a4,U+88ab,U+88ad,U+88b1,U+88c1-88c2,U+88c5-88c6,U+88c9,U+88d4-88d5,U+88d8-88d9,U+88df,U+88e3-88e4,U+88e8,U+88f1,U+88f3-88f4,U+88f8-88f9,U+88fe,U+8902,U+8910,U+8912-8913,U+891a-891b,U+8921,U+8925,U+892a-892b,U+8934,U+8936,U+8941,U+8944,U+895e-895f,U+8966,U+897f,U+8981,U+8986,U+89c1-89c2,U+89c4-89c6,U+89c8-89cb,U+89ce,U+89d0-89d2,U+89e3,U+89e5-89e6,U+8a00,U+8a07,U+8a79,U+8a89-8a8a,U+8a93,U+8b66,U+8b6c,U+8ba1-8bab,U+8bad-8bb0,U+8bb2-8bb3,U+8bb6-8bba,U+8bbc-8bc1,U+8bc4-8bc6,U+8bc8;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.p.woff2') format('woff2');
  unicode-range: U+8695,U+869c,U+86a3-86a4,U+86a7,U+86aa,U+86af,U+86b1,U+86c0,U+86c6-86c7,U+86ca-86cb,U+86d0,U+86d4,U+86d9,U+86db,U+86df,U+86e4,U+86ee,U+86f0,U+86f9,U+86fe,U+8700,U+8702-8703,U+8708-8709,U+870d,U+8712-8713,U+8715,U+8717-8718,U+871a,U+871c,U+8721,U+8725,U+8734,U+8737,U+873b,U+873f,U+8747,U+8749,U+874c,U+874e,U+8757,U+8759,U+8760,U+8763,U+8774,U+8776,U+877c,U+8782-8783,U+8785,U+878d,U+8793,U+879f,U+87af,U+87b3,U+87ba,U+87c6,U+87ca,U+87d1-87d2,U+87e0,U+87e5,U+87f9,U+87fe,U+8815,U+8822,U+8839,U+8840,U+8845,U+884c-884d,U+8854,U+8857,U+8859,U+8861,U+8863,U+8865,U+8868,U+886b-886c,U+8870,U+8877,U+887d-887f,U+8881-8882,U+8884-8885,U+8888,U+888b,U+888d,U+8892,U+8896;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.q.woff2') format('woff2');
  unicode-range: U+83dc-83dd,U+83e0,U+83e9,U+83f1-83f2,U+8403-8404,U+840b-840e,U+841d,U+8424-8428,U+843d,U+8451,U+8457,U+8459,U+845b,U+8461,U+8463,U+8469,U+846b-846c,U+8471,U+8475,U+847a,U+8482,U+848b,U+8499,U+849c,U+84b2,U+84b8,U+84bf,U+84c4,U+84c9,U+84d1,U+84d6,U+84dd,U+84df,U+84e6,U+84ec,U+8511,U+8513,U+8517,U+851a,U+851f,U+8521,U+852b-852c,U+8537,U+853b-853d,U+8549-854a,U+8559,U+8574,U+857e,U+8584,U+8587,U+858f,U+859b,U+85aa,U+85af-85b0,U+85c9,U+85cf-85d0,U+85d3,U+85d5,U+85e4,U+85e9,U+85fb,U+8611,U+8638,U+864e-8651,U+8654,U+865a,U+865e,U+866b-866c,U+8671,U+8679,U+867d-867e,U+8680-8682,U+868a,U+868c-868d,U+8693;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.r.woff2') format('woff2');
  unicode-range: U+8273,U+827a,U+827e,U+8282,U+828a-828b,U+828d,U+8292,U+8299,U+829c-829d,U+82a5-82a6,U+82a9,U+82ab-82ad,U+82af,U+82b1,U+82b3,U+82b7-82b9,U+82bd,U+82c7,U+82cd,U+82cf,U+82d1,U+82d3-82d4,U+82d7,U+82db,U+82de-82df,U+82e3,U+82e5-82e6,U+82eb,U+82ef,U+82f1,U+82f9,U+82fb,U+8301-8305,U+8309,U+830e,U+8314,U+8317,U+8327-8328,U+832b-832c,U+832f,U+8335-8336,U+8338-8339,U+8340,U+8346-8347,U+8349,U+834f-8352,U+8354,U+835a,U+835c,U+8361,U+8363-8364,U+8367,U+836b,U+836f,U+8377,U+837c,U+8386,U+8389,U+838e,U+8393,U+839e,U+83a0,U+83ab,U+83b1-83b4,U+83b7,U+83b9-83ba,U+83bd,U+83c1,U+83c5,U+83c7,U+83ca,U+83cc,U+83cf;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.s.woff2') format('woff2');
  unicode-range: U+80de,U+80e1,U+80e7,U+80ea-80eb,U+80ed,U+80ef-80f0,U+80f3-80f4,U+80f6,U+80f8,U+80fa,U+80fd,U+8102,U+8106,U+8109-810a,U+810d,U+810f-8111,U+8113-8114,U+8116,U+8118,U+811a,U+812f,U+8131,U+8138,U+813e,U+8146,U+814a-814c,U+8150-8151,U+8154-8155,U+8165,U+816e,U+8170,U+8174,U+8179-817c,U+817e-8180,U+818a,U+818f,U+8198,U+819b-819d,U+81a8,U+81b3,U+81ba-81bb,U+81c0,U+81c2-81c3,U+81c6,U+81ca,U+81e3,U+81ea,U+81ec-81ed,U+81f3-81f4,U+81fb-81fc,U+81fe,U+8200,U+8205-8206,U+820c-820d,U+8210,U+8212,U+8214,U+821c,U+821e-821f,U+822a-822c,U+8230-8231,U+8235-8239,U+8247,U+8258,U+826f-8270,U+8272;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.t.woff2') format('woff2');
  unicode-range: U+7f72,U+7f81,U+7f8a,U+7f8c,U+7f8e,U+7f94,U+7f9a,U+7f9e,U+7fa1,U+7fa4,U+7fb2,U+7fb8-7fb9,U+7fbd,U+7fc1,U+7fc5,U+7fcc,U+7fce,U+7fd4-7fd5,U+7fd8,U+7fdf-7fe1,U+7fe6,U+7fe9,U+7ff0-7ff1,U+7ff3,U+7ffb-7ffc,U+8000-8001,U+8003,U+8005,U+800c-800d,U+8010,U+8012,U+8015,U+8017-8019,U+8027,U+802a,U+8033,U+8036-8038,U+803b,U+803d,U+803f,U+8042,U+8046,U+804a-804c,U+8052,U+8054,U+8058,U+805a,U+806a,U+807f,U+8083-8084,U+8086-8087,U+8089,U+808b-808c,U+8096,U+8098,U+809a-809b,U+809d,U+80a0-80a2,U+80a4-80a5,U+80a9-80aa,U+80ae-80af,U+80b2,U+80b4,U+80ba,U+80be-80c1,U+80c3-80c4,U+80c6,U+80cc,U+80ce,U+80d6,U+80da-80dc;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.u.woff2') format('woff2');
  unicode-range: U+7eb5-7eba,U+7ebd,U+7ebf,U+7ec2-7eca,U+7ecd-7ed5,U+7ed8-7edf,U+7ee1-7ee3,U+7ee5-7ee7,U+7ee9-7eeb,U+7eed,U+7eef-7ef0,U+7ef3-7ef8,U+7efc-7efd,U+7eff-7f00,U+7f04-7f09,U+7f0e-7f0f,U+7f13-7f16,U+7f18,U+7f1a,U+7f1c-7f1d,U+7f1f-7f22,U+7f24-7f26,U+7f28-7f2a,U+7f2d-7f2e,U+7f30,U+7f34,U+7f38,U+7f3a,U+7f42,U+7f50-7f51,U+7f54-7f55,U+7f57,U+7f5a,U+7f61-7f62,U+7f69-7f6a,U+7f6e;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.v.woff2') format('woff2');
  unicode-range: U+7b4c,U+7b4f-7b52,U+7b54,U+7b56,U+7b5b,U+7b5d,U+7b75,U+7b77,U+7b79,U+7b7e,U+7b80,U+7b8d,U+7b94-7b95,U+7b97,U+7ba1,U+7ba9-7bab,U+7bad,U+7bb1,U+7bb8,U+7bc6-7bc7,U+7bd1,U+7bd3,U+7bd9,U+7bdd,U+7be1,U+7bee,U+7bf1,U+7bf7,U+7bfe,U+7c07,U+7c0c,U+7c27,U+7c2a,U+7c38,U+7c3f,U+7c41,U+7c4d,U+7c73,U+7c7b,U+7c7d,U+7c89,U+7c92,U+7c95,U+7c97-7c98,U+7c9f,U+7ca4-7ca5,U+7caa,U+7cae,U+7cb1,U+7cb3,U+7cb9,U+7cbc-7cbe,U+7cc5,U+7cca,U+7cd5-7cd7,U+7cd9,U+7cdc,U+7cdf-7ce0,U+7cef,U+7cfb,U+7d0a,U+7d20,U+7d22,U+7d27,U+7d2b,U+7d2f,U+7d6e,U+7e41,U+7e82,U+7ea0-7ea4,U+7ea6-7ea8,U+7eaa-7ead,U+7eaf-7eb3;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.w.woff2') format('woff2');
  unicode-range: U+7981,U+7984-7985,U+798f,U+79b9,U+79bb,U+79bd-79be,U+79c0-79c1,U+79c3,U+79c6,U+79c9,U+79cb,U+79cd,U+79d1-79d2,U+79d8,U+79df,U+79e3-79e4,U+79e6-79e7,U+79e9,U+79ef-79f0,U+79f8,U+79fb,U+79fd,U+7a00,U+7a0b,U+7a0d-7a0e,U+7a14,U+7a17,U+7a1a,U+7a20,U+7a33,U+7a37,U+7a39,U+7a3b-7a3d,U+7a3f,U+7a46,U+7a51,U+7a57,U+7a74,U+7a76-7a77,U+7a79-7a7a,U+7a7f,U+7a81,U+7a83-7a84,U+7a88,U+7a8d,U+7a91-7a92,U+7a95-7a98,U+7a9c-7a9d,U+7a9f,U+7aa5-7aa6,U+7abf,U+7acb,U+7ad6,U+7ad9,U+7ade-7ae0,U+7ae3,U+7ae5-7ae6,U+7aed,U+7aef,U+7af9,U+7afd,U+7aff,U+7b03,U+7b06,U+7b08,U+7b0b,U+7b11,U+7b14,U+7b19,U+7b1b,U+7b20,U+7b26,U+7b28,U+7b2c,U+7b3a,U+7b3c,U+7b49,U+7b4b;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.x.woff2') format('woff2');
  unicode-range: U+77aa,U+77ac,U+77b0,U+77b3,U+77b5,U+77bb,U+77bf,U+77d7,U+77db-77dc,U+77e2-77e3,U+77e5,U+77e9,U+77eb,U+77ed-77ee,U+77f3,U+77fd-77ff,U+7801-7802,U+780c-780d,U+7812,U+7814,U+7816,U+781a,U+781d,U+7823,U+7825,U+7827,U+7830,U+7834,U+7837-7838,U+783a,U+783e,U+7840,U+7845,U+784c,U+7852,U+7855,U+785d,U+786b-786c,U+786e,U+787c,U+7887,U+7889,U+788c-788e,U+7891,U+7897-7898,U+789c,U+789f,U+78a5,U+78a7,U+78b0-78b1,U+78b3-78b4,U+78be,U+78c1,U+78c5,U+78ca-78cb,U+78d0,U+78d5,U+78e8,U+78ec,U+78f7,U+78fa,U+7901,U+7934,U+793a,U+793c,U+793e,U+7940-7941,U+7948,U+7956-7957,U+795a-795b,U+795d-7960,U+7965,U+7968,U+796d,U+796f,U+7977-7978,U+797a,U+7980;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.y.woff2') format('woff2');
  unicode-range: U+761f,U+7624,U+7626,U+7629-762b,U+7634-7635,U+7638,U+763e,U+764c,U+7656,U+765e,U+7663,U+766b,U+7678,U+767b,U+767d-767e,U+7682,U+7684,U+7686-7688,U+768b,U+768e,U+7691,U+7693,U+7696,U+7699,U+76ae,U+76b1,U+76b4,U+76bf,U+76c2,U+76c5-76c6,U+76c8,U+76ca,U+76ce-76d2,U+76d4,U+76d6-76d8,U+76db,U+76df,U+76ee-76ef,U+76f2,U+76f4,U+76f8-76f9,U+76fc,U+76fe,U+7701,U+7708-7709,U+770b,U+771f-7720,U+7726,U+7728-7729,U+772f,U+7736-7738,U+773a,U+773c,U+7740-7741,U+7750-7751,U+775a-775b,U+7761,U+7763,U+7765-7766,U+7768,U+776b-776c,U+7779,U+777d,U+777f,U+7784-7785,U+778c,U+778e,U+7791-7792,U+779f-77a0,U+77a5,U+77a7,U+77a9;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.z.woff2') format('woff2');
  unicode-range: U+7435-7436,U+743c,U+7455,U+7459-745a,U+745c,U+745e-745f,U+7470,U+7476,U+7480,U+7483,U+7487,U+749c,U+749e,U+74a7-74a8,U+74dc,U+74e2-74e4,U+74e6,U+74ee,U+74f6-74f7,U+7504,U+7518,U+751a,U+751c,U+751f,U+7525,U+7528-7529,U+752b-752d,U+7530-7533,U+7535,U+7537-7538,U+753b,U+7545,U+754c,U+754f,U+7554,U+7559,U+755c,U+7565-7566,U+756a,U+7574,U+7578,U+7583,U+7586,U+758f,U+7591,U+7597,U+7599-759a,U+759f,U+75a1,U+75a4-75a5,U+75ab,U+75ae-75b2,U+75b4-75b5,U+75b9,U+75bc-75be,U+75c5,U+75c7-75ca,U+75cd,U+75d2,U+75d4-75d5,U+75d8,U+75db,U+75de,U+75e2-75e3,U+75e8,U+75ea,U+75f0,U+75f4,U+75f9,U+7600-7601;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.aa.woff2') format('woff2');
  unicode-range: U+725f,U+7261-7262,U+7267,U+7269,U+7272,U+7275,U+7279-727a,U+7280-7281,U+7284,U+728a,U+7292,U+729f,U+72ac,U+72af,U+72b6-72b9,U+72c1-72c2,U+72c4,U+72c8,U+72ce,U+72d0,U+72d2,U+72d7,U+72d9,U+72de,U+72e0-72e1,U+72e9,U+72ec-72f2,U+72f7-72f8,U+72fc,U+730a,U+730e,U+7316,U+731b-731d,U+7322,U+7325,U+7329-732c,U+732e,U+7334,U+733e-733f,U+7350,U+7357,U+7360,U+736d,U+7384,U+7387,U+7389,U+738b,U+7396,U+739b,U+73a9,U+73ab,U+73af-73b0,U+73b2,U+73b7,U+73ba-73bb,U+73c0,U+73c8,U+73ca,U+73cd,U+73d0-73d1,U+73d9,U+73e0,U+73ed,U+7403,U+7405-7406,U+7409-740a,U+740f-7410,U+741a,U+7422,U+7425,U+742a,U+7433-7434;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.ab.woff2') format('woff2');
  unicode-range: U+706d,U+706f-7070,U+7075-7076,U+7078,U+707c,U+707e-707f,U+7089-708a,U+708e,U+7092,U+7094-7096,U+7099,U+70ab-70af,U+70b1,U+70b3,U+70b8-70b9,U+70bc-70bd,U+70c1-70c3,U+70c8,U+70ca,U+70d8-70d9,U+70db,U+70df,U+70e4,U+70e6-70e7,U+70e9,U+70eb-70ed,U+70ef,U+70f7,U+70f9,U+70fd,U+7109-710a,U+7115,U+7119-711a,U+7126,U+7130-7131,U+7136,U+714c,U+714e,U+715e,U+7164,U+7166-7168,U+716e,U+7172-7173,U+717d,U+7184,U+718a,U+718f,U+7194,U+7198-7199,U+719f-71a0,U+71a8,U+71ac,U+71b9,U+71c3,U+71ce,U+71d5,U+71e5,U+7206,U+722a,U+722c,U+7231,U+7235-7239,U+723d,U+7247-7248,U+724c-724d,U+7252,U+7259,U+725b;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.ac.woff2') format('woff2');
  unicode-range: U+6df7,U+6df9,U+6dfb,U+6e05,U+6e0a,U+6e0d-6e0e,U+6e10,U+6e14,U+6e17,U+6e1a,U+6e1d,U+6e20-6e21,U+6e23-6e25,U+6e29,U+6e2d,U+6e2f,U+6e32,U+6e34,U+6e38,U+6e3a,U+6e43,U+6e4d,U+6e56,U+6e58,U+6e5b,U+6e6e,U+6e7e-6e7f,U+6e83,U+6e85,U+6e89,U+6e90,U+6e9c,U+6ea2,U+6ea5,U+6eaa,U+6eaf,U+6eb6,U+6eba,U+6ec1,U+6ec7,U+6ecb,U+6ed1,U+6ed3-6ed5,U+6eda,U+6ede,U+6ee1,U+6ee4-6ee6,U+6ee8-6ee9,U+6ef4,U+6f02,U+6f06,U+6f09,U+6f0f,U+6f13-6f15,U+6f20,U+6f29-6f2b,U+6f31,U+6f33,U+6f3e,U+6f46-6f47,U+6f4d,U+6f58,U+6f5c,U+6f5e,U+6f62,U+6f66,U+6f6d-6f6e,U+6f84,U+6f88-6f89,U+6f8e,U+6f9c,U+6fa1,U+6fb3,U+6fb9,U+6fc0,U+6fd1-6fd2,U+6fe1,U+7011,U+701a,U+7023,U+704c,U+706b;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.ad.woff2') format('woff2');
  unicode-range: U+6ccc,U+6cd3,U+6cd5,U+6cdb,U+6cde,U+6ce1-6ce3,U+6ce5,U+6ce8,U+6cea-6ceb,U+6cef-6cf1,U+6cf3,U+6cf5,U+6cfb-6cfe,U+6d01,U+6d0b,U+6d12,U+6d17,U+6d1b,U+6d1e,U+6d25,U+6d27,U+6d2a,U+6d31-6d32,U+6d3b-6d3e,U+6d41,U+6d43,U+6d45-6d47,U+6d4a-6d4b,U+6d4e-6d4f,U+6d51,U+6d53,U+6d59-6d5a,U+6d63,U+6d66,U+6d69-6d6a,U+6d6e,U+6d74,U+6d77-6d78,U+6d82,U+6d85,U+6d88-6d89,U+6d8c,U+6d8e,U+6d93,U+6d95,U+6d9b,U+6d9d,U+6d9f-6da1,U+6da3-6da4,U+6da6-6daa,U+6dae-6daf,U+6db2,U+6db5,U+6db8,U+6dc0,U+6dc4-6dc7,U+6dcb-6dcc,U+6dd1,U+6dd6,U+6dd8-6dd9,U+6de1,U+6de4,U+6deb-6dec,U+6dee,U+6df1,U+6df3;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.ae.woff2') format('woff2');
  unicode-range: U+6b92,U+6b96,U+6b9a,U+6ba1,U+6bb4-6bb5,U+6bb7,U+6bbf,U+6bc1,U+6bc5,U+6bcb,U+6bcd,U+6bcf,U+6bd2,U+6bd4-6bd7,U+6bd9,U+6bdb,U+6be1,U+6beb,U+6bef,U+6c05,U+6c0f,U+6c11,U+6c13-6c14,U+6c16,U+6c1b,U+6c1f,U+6c22,U+6c24,U+6c26-6c28,U+6c2e-6c30,U+6c32,U+6c34,U+6c38,U+6c3d,U+6c40-6c42,U+6c47,U+6c49,U+6c50,U+6c55,U+6c57,U+6c5b,U+6c5d-6c61,U+6c64,U+6c68-6c6a,U+6c70,U+6c72,U+6c76,U+6c79,U+6c7d-6c7e,U+6c81-6c83,U+6c86,U+6c88-6c89,U+6c8c,U+6c8f-6c90,U+6c93,U+6c99,U+6c9b,U+6c9f,U+6ca1,U+6ca4-6ca7,U+6caa-6cab,U+6cae,U+6cb3,U+6cb8-6cb9,U+6cbb-6cbf,U+6cc4-6cc5,U+6cc9-6cca;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.af.woff2') format('woff2');
  unicode-range: U+68ad,U+68af-68b0,U+68b3,U+68b5,U+68c0,U+68c2,U+68c9,U+68cb,U+68cd,U+68d2,U+68d5,U+68d8,U+68da,U+68e0,U+68ee,U+68f1,U+68f5,U+68fa,U+6905,U+690d-690e,U+6912,U+692d,U+6930,U+693d,U+693f,U+6942,U+6954,U+6957,U+695a,U+695e,U+6963,U+696b,U+6977-6978,U+697c,U+6982,U+6984,U+6986,U+6994,U+699c,U+69a8,U+69ad,U+69b4,U+69b7,U+69bb,U+69c1,U+69cc,U+69d0,U+69db,U+69fd,U+69ff,U+6a0a,U+6a1f,U+6a21,U+6a2a,U+6a31,U+6a35,U+6a3d,U+6a44,U+6a47,U+6a58-6a59,U+6a61,U+6a71,U+6a80,U+6a84,U+6a8e,U+6a90,U+6aac,U+6b20-6b23,U+6b27,U+6b32,U+6b3a,U+6b3e,U+6b47,U+6b49,U+6b4c,U+6b62-6b67,U+6b6a,U+6b79,U+6b7b-6b7c,U+6b81,U+6b83-6b84,U+6b86-6b87,U+6b89-6b8b;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.ag.woff2') format('woff2');
  unicode-range: U+6756,U+675c,U+675e-6761,U+6765,U+6768,U+676d,U+676f-6770,U+6773,U+6775,U+6777,U+677c,U+677e-677f,U+6781,U+6784,U+6787,U+6789,U+6790,U+6795,U+6797,U+679a,U+679c-679d,U+67a2-67a3,U+67aa-67ab,U+67ad,U+67af-67b0,U+67b6-67b7,U+67c4,U+67cf-67d4,U+67d9-67da,U+67dc,U+67de,U+67e0,U+67e5,U+67e9,U+67ec,U+67ef,U+67f1,U+67f3-67f4,U+67ff-6800,U+6805,U+6807-6808,U+680b,U+680f,U+6811,U+6813,U+6816-6817,U+6821,U+6829-682a,U+6837-6839,U+683c-683d,U+6840,U+6842-6843,U+6845-6846,U+6848,U+684c,U+6850-6851,U+6853-6854,U+6863,U+6865,U+6868-6869,U+6874,U+6876,U+6881,U+6885-6886,U+6893,U+6897,U+68a2,U+68a6-68a8;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.ah.woff2') format('woff2');
  unicode-range: U+65f7,U+65fa,U+6602,U+6606,U+660a,U+660c,U+660e-660f,U+6613-6614,U+6619,U+661d,U+661f-6620,U+6625,U+6627-6628,U+662d,U+662f,U+6631,U+6635,U+663c,U+663e,U+6643,U+664b-664c,U+664f,U+6652-6653,U+6655-6657,U+665a,U+6664,U+6666,U+6668,U+666e-6670,U+6674,U+6676-6677,U+667a,U+667e,U+6682,U+6684,U+6687,U+668c,U+6691,U+6696-6697,U+669d,U+66a7,U+66ae,U+66b4,U+66d9,U+66dc-66dd,U+66e6,U+66f0,U+66f2-66f4,U+66f9,U+66fc,U+66fe-6700,U+6708-6709,U+670b,U+670d,U+6714-6715,U+6717,U+671b,U+671d,U+671f,U+6726,U+6728,U+672a-672d,U+672f,U+6731,U+6734-6735,U+673a,U+673d,U+6740,U+6742-6743,U+6746,U+6748-6749,U+674e-6751;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.ai.woff2') format('woff2');
  unicode-range: U+6467,U+6469,U+6478-6479,U+6482,U+6485,U+6487,U+6491-6492,U+6495,U+649e,U+64a4,U+64a9,U+64ac-64ae,U+64b0,U+64b5,U+64b8,U+64ba,U+64bc,U+64c2,U+64c5,U+64cd-64ce,U+64d2,U+64d8,U+64de,U+64e2,U+64e6,U+6500,U+6512,U+6518,U+6525,U+652b,U+652f,U+6536,U+6538-6539,U+653b,U+653e-653f,U+6545,U+6548,U+654c,U+654f,U+6551,U+6555-6556,U+6559,U+655b,U+655d-655e,U+6562-6563,U+6566,U+656c,U+6570,U+6572,U+6574,U+6577,U+6587,U+658b-658c,U+6590-6591,U+6593,U+6597,U+6599,U+659c,U+659f,U+65a1,U+65a4-65a5,U+65a7,U+65a9,U+65ab,U+65ad,U+65af-65b0,U+65b9,U+65bd,U+65c1,U+65c4-65c5,U+65cb-65cc,U+65cf,U+65d7,U+65e0,U+65e2,U+65e5-65e9,U+65ec-65ed,U+65f1,U+65f6;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.aj.woff2') format('woff2');
  unicode-range: U+6323-6325,U+6328,U+632a-632b,U+632f,U+6332,U+633a,U+633d,U+6342,U+6345-6346,U+6349,U+634b-6350,U+6355,U+635e-635f,U+6361-6363,U+6367,U+636e,U+6371,U+6376-6377,U+637a-637b,U+6380,U+6382,U+6387-6389,U+638c,U+638f-6390,U+6392,U+6396,U+6398,U+63a0,U+63a2-63a3,U+63a5,U+63a7-63aa,U+63ac,U+63b0,U+63b3-63b4,U+63b7-63b8,U+63ba,U+63c4,U+63c9,U+63cd,U+63cf-63d0,U+63d2,U+63d6,U+63e1,U+63e3,U+63e9-63ea,U+63ed,U+63f4,U+63f6,U+63fd,U+6400-6402,U+6405,U+640f-6410,U+6413-6414,U+641c,U+641e,U+6421,U+642a,U+642c-642d,U+643a,U+643d,U+6441,U+6444,U+6446-6448,U+644a,U+6452,U+6454,U+6458,U+645e;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.ak.woff2') format('woff2');
  unicode-range: U+6258,U+625b,U+6263,U+6266-6267,U+6269-6270,U+6273,U+6276,U+6279,U+627c,U+627e-6280,U+6284,U+6289-628a,U+6291-6293,U+6295-6298,U+629a-629b,U+62a0-62a2,U+62a4-62a5,U+62a8,U+62ab-62ac,U+62b1,U+62b5,U+62b9,U+62bc-62bd,U+62bf,U+62c2,U+62c4-62ca,U+62cc-62ce,U+62d0,U+62d2-62d4,U+62d6-62d9,U+62db-62dc,U+62df,U+62e2-62e3,U+62e5-62e9,U+62ec-62ed,U+62ef,U+62f1,U+62f3-62f4,U+62f7,U+62fc-62ff,U+6301-6302,U+6307,U+6309,U+630e,U+6311,U+6316,U+631a-631b,U+631d-6321;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.al.woff2') format('woff2');
  unicode-range: U+60cb,U+60d1,U+60d5,U+60d8,U+60da,U+60dc,U+60df-60e0,U+60e6-60e9,U+60eb-60f0,U+60f3-60f4,U+60f6,U+60f9-60fa,U+6101,U+6108-6109,U+610e-610f,U+6115,U+611a,U+611f-6120,U+6123-6124,U+6127,U+612b,U+613f,U+6148,U+614a,U+614c,U+614e,U+6151,U+6155,U+6162,U+6167-6168,U+6170,U+6175,U+6177,U+618b,U+618e,U+6194,U+61a7-61a9,U+61ac,U+61be,U+61c2,U+61c8,U+61ca,U+61d1-61d2,U+61d4,U+61e6,U+61f5,U+61ff,U+6208,U+620a,U+620c-6212,U+6216,U+6218,U+621a-621b,U+621f,U+622a,U+622c,U+622e,U+6233-6234,U+6237,U+623e-6241,U+6247-6249,U+624b,U+624d-624e,U+6251-6254;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.am.woff2') format('woff2');
  unicode-range: U+5fcc-5fcd,U+5fcf-5fd2,U+5fd6-5fd9,U+5fdd,U+5fe0-5fe1,U+5fe4,U+5fe7,U+5fea-5feb,U+5ff1,U+5ff5,U+5ffb,U+5ffd-6002,U+6005-6006,U+600d-600f,U+6012,U+6014-6016,U+6019,U+601c-601d,U+6020-6021,U+6025-6028,U+602a,U+602f,U+6035,U+603b-603c,U+6041,U+6043,U+604b,U+604d,U+6050,U+6052,U+6055,U+6059-605a,U+6062-6064,U+6068-606d,U+606f-6070,U+6073,U+6076,U+6078-607c,U+607f,U+6084,U+6089,U+608c-608d,U+6094,U+6096,U+609a,U+609f-60a0,U+60a3,U+60a6,U+60a8,U+60ac,U+60af,U+60b1-60b2,U+60b4,U+60b8,U+60bb-60bc,U+60c5-60c6,U+60ca;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.an.woff2') format('woff2');
  unicode-range: U+5e7f,U+5e84,U+5e86-5e87,U+5e8a,U+5e8f-5e90,U+5e93-5e97,U+5e99-5e9a,U+5e9c,U+5e9e-5e9f,U+5ea6-5ea7,U+5ead,U+5eb5-5eb8,U+5ec9-5eca,U+5ed1,U+5ed3,U+5ed6,U+5ef6-5ef7,U+5efa,U+5f00,U+5f02-5f04,U+5f08,U+5f0a-5f0b,U+5f0f,U+5f11,U+5f13,U+5f15,U+5f17-5f18,U+5f1b,U+5f1f-5f20,U+5f25-5f27,U+5f29,U+5f2f,U+5f31,U+5f39-5f3a,U+5f52-5f53,U+5f55,U+5f57,U+5f5d,U+5f62,U+5f64,U+5f66,U+5f69-5f6a,U+5f6c-5f6d,U+5f70-5f71,U+5f77,U+5f79,U+5f7b-5f7c,U+5f80-5f81,U+5f84-5f85,U+5f87-5f8b,U+5f90,U+5f92,U+5f95,U+5f97-5f98,U+5fa1,U+5fa8,U+5faa,U+5fad-5fae,U+5fb5,U+5fb7,U+5fbc-5fbd,U+5fc3,U+5fc5-5fc6;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.ao.woff2') format('woff2');
  unicode-range: U+5c7f,U+5c81-5c82,U+5c8c,U+5c94,U+5c96-5c97,U+5c9a-5c9b,U+5ca9,U+5cad,U+5cb3,U+5cb8,U+5cbf,U+5ccb,U+5cd9,U+5ce1,U+5ce5-5ce6,U+5ce8,U+5cea,U+5ced,U+5cf0,U+5cfb,U+5d02,U+5d07,U+5d0e,U+5d14,U+5d16,U+5d1b,U+5d24,U+5d29,U+5d2d,U+5d34,U+5d3d,U+5d4c,U+5d58,U+5d6c,U+5d82,U+5d99,U+5dc5,U+5dcd,U+5ddd-5dde,U+5de1-5de2,U+5de5-5de9,U+5deb,U+5dee,U+5df1-5df4,U+5df7,U+5dfe,U+5e01-5e03,U+5e05-5e06,U+5e08,U+5e0c,U+5e10-5e11,U+5e15-5e16,U+5e18,U+5e1a-5e1d,U+5e26-5e27,U+5e2d-5e2e,U+5e37-5e38,U+5e3c-5e3d,U+5e42,U+5e44-5e45,U+5e4c,U+5e54-5e55,U+5e61-5e62,U+5e72-5e74,U+5e76,U+5e78,U+5e7a-5e7d;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.ap.woff2') format('woff2');
  unicode-range: U+5b85,U+5b87-5b89,U+5b8b-5b8c,U+5b8f,U+5b95,U+5b97-5b9e,U+5ba0-5ba4,U+5ba6,U+5baa-5bab,U+5bb0,U+5bb3-5bb6,U+5bb9,U+5bbd-5bbf,U+5bc2,U+5bc4-5bc7,U+5bcc,U+5bd0,U+5bd2-5bd3,U+5bdd-5bdf,U+5be1,U+5be4-5be5,U+5be8,U+5bf0,U+5bf8-5bfc,U+5bff,U+5c01,U+5c04,U+5c06,U+5c09-5c0a,U+5c0f,U+5c11,U+5c14,U+5c16,U+5c18,U+5c1a,U+5c1d,U+5c24,U+5c27,U+5c2c,U+5c31,U+5c34,U+5c38-5c3a,U+5c3c-5c42,U+5c45,U+5c48-5c4b,U+5c4e-5c51,U+5c55,U+5c5e,U+5c60-5c61,U+5c65,U+5c6f,U+5c71,U+5c79;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.aq.woff2') format('woff2');
  unicode-range: U+5996,U+5999,U+599e,U+59a5,U+59a8-59aa,U+59ae,U+59b2,U+59b9,U+59bb,U+59be,U+59c6,U+59cb,U+59d0-59d1,U+59d3-59d4,U+59d7-59d8,U+59da,U+59dc-59dd,U+59e3,U+59e5,U+59e8,U+59ec,U+59f9,U+59fb,U+59ff,U+5a01,U+5a03-5a04,U+5a06-5a07,U+5a11,U+5a13,U+5a18,U+5a1c,U+5a1f-5a20,U+5a25,U+5a29,U+5a31-5a32,U+5a34,U+5a36,U+5a3c,U+5a40,U+5a46,U+5a49-5a4a,U+5a5a,U+5a62,U+5a6a,U+5a74,U+5a76-5a77,U+5a7f,U+5a92,U+5a9a-5a9b,U+5ab2-5ab3,U+5ac1-5ac2,U+5ac9,U+5acc,U+5ad4,U+5ad6,U+5ae1,U+5ae3,U+5ae6,U+5ae9,U+5b09,U+5b34,U+5b37,U+5b40,U+5b50,U+5b54-5b55,U+5b57-5b59,U+5b5c-5b5d,U+5b5f,U+5b63-5b64,U+5b66,U+5b69-5b6a,U+5b6c,U+5b70-5b71,U+5b75,U+5b7a,U+5b7d,U+5b81,U+5b83;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.ar.woff2') format('woff2');
  unicode-range: U+57ce,U+57d4,U+57df-57e0,U+57f9-57fa,U+5800,U+5802,U+5806,U+5811,U+5815,U+5821,U+5824,U+582a,U+5830,U+5835,U+584c,U+5851,U+5854,U+5858,U+585e,U+586b,U+587e,U+5883,U+5885,U+5892-5893,U+5899,U+589e-589f,U+58a8-58a9,U+58c1,U+58d1,U+58d5,U+58e4,U+58eb-58ec,U+58ee,U+58f0,U+58f3,U+58f6,U+58f9,U+5904,U+5907,U+590d,U+590f,U+5915-5916,U+5919-591a,U+591c,U+591f,U+5927,U+5929-592b,U+592d-592f,U+5931,U+5934,U+5937-593a,U+5942,U+5944,U+5947-5949,U+594b,U+594e-594f,U+5951,U+5954-5957,U+595a,U+5960,U+5962,U+5965,U+5973-5974,U+5976,U+5978-5979,U+597d,U+5981-5984,U+5986-5988,U+598a,U+598d,U+5992-5993;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.as.woff2') format('woff2');
  unicode-range: U+561b,U+561e-561f,U+5624,U+562d,U+5631-5632,U+5634,U+5636,U+5639,U+563b,U+563f,U+564c,U+564e,U+5654,U+5657,U+5659,U+565c,U+5662,U+5664,U+5668-566c,U+5676,U+567c,U+5685,U+568e-568f,U+5693,U+56a3,U+56b7,U+56bc,U+56ca,U+56d4,U+56da-56db,U+56de,U+56e0,U+56e2,U+56e4,U+56ed,U+56f0-56f1,U+56f4,U+56f9-56fa,U+56fd-56ff,U+5703,U+5706,U+5708-5709,U+571f,U+5723,U+5728,U+572d,U+5730,U+573a,U+573e,U+5740,U+5747,U+574a,U+574d-5751,U+5757,U+575a-575b,U+575d-5761,U+5764,U+5766,U+5768,U+576a,U+576f,U+5773,U+5777,U+5782-5784,U+578b,U+5792,U+579b,U+57a0,U+57a2-57a3,U+57a6,U+57ab,U+57ae,U+57c2-57c3,U+57cb;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.at.woff2') format('woff2');
  unicode-range: U+54e5-54ea,U+54ed-54ee,U+54f2,U+54fa,U+54fc-54fd,U+5501,U+5506-5507,U+5509,U+550f-5510,U+5514,U+5520,U+5522,U+5524,U+5527,U+552c,U+552e-5531,U+5533,U+553e-553f,U+5543-5544,U+5546,U+554a,U+5550,U+5555-5556,U+555c,U+5561,U+5564-5567,U+556a,U+556c,U+556e,U+5575,U+5577-5578,U+557b-557c,U+557e,U+5580,U+5582-5584,U+5587,U+5589-558b,U+558f,U+5591,U+5594,U+5598-5599,U+559c-559d,U+559f,U+55a7,U+55b3,U+55b7,U+55bb,U+55bd,U+55c5,U+55d1-55d4,U+55d6,U+55dc-55dd,U+55df,U+55e1,U+55e3-55e6,U+55e8,U+55eb-55ec,U+55ef,U+55f7,U+55fd,U+5600-5601,U+5608-5609,U+560e,U+5618;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.au.woff2') format('woff2');
  unicode-range: U+5411,U+5413,U+5415,U+5417,U+541b,U+541d-5420,U+5426-5429,U+542b-542f,U+5431,U+5434-5435,U+5438-5439,U+543b-543c,U+543e,U+5440,U+5443,U+5446,U+5448,U+544a,U+5450,U+5453,U+5455,U+5457-5458,U+545b-545c,U+5462,U+5464,U+5466,U+5468,U+5471-5473,U+5475,U+5478,U+547b-547d,U+5480,U+5482,U+5484,U+5486,U+548b-548c,U+548e-5490,U+5492,U+5494-5496,U+5499-549b,U+54a4,U+54a6-54ad,U+54af,U+54b1,U+54b3,U+54b8,U+54bb,U+54bd,U+54bf-54c2,U+54c4,U+54c6-54c9,U+54cd-54ce,U+54d0-54d2,U+54d5,U+54d7,U+54da,U+54dd,U+54df;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.av.woff2') format('woff2');
  unicode-range: U+5348-534a,U+534e-534f,U+5351-5353,U+5355-5357,U+535a,U+535c,U+535e-5362,U+5364,U+5366-5367,U+536b,U+536f-5371,U+5373-5375,U+5377-5378,U+537f,U+5382,U+5384-5386,U+5389,U+538b-538c,U+5395,U+5398,U+539a,U+539f,U+53a2,U+53a5-53a6,U+53a8-53a9,U+53ae,U+53bb,U+53bf,U+53c1-53c2,U+53c8-53cd,U+53d1,U+53d4,U+53d6-53d9,U+53db,U+53df-53e0,U+53e3-53e6,U+53e8-53f3,U+53f6-53f9,U+53fc-53fd,U+5401,U+5403-5404,U+5408-540a,U+540c-5410;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.aw.woff2') format('woff2');
  unicode-range: U+5207,U+520a,U+520d-520e,U+5211-5212,U+5217-521b,U+521d,U+5220,U+5224,U+5228-5229,U+522b,U+522d-522e,U+5230,U+5236-523b,U+523d,U+5241-5243,U+524a,U+524c-524d,U+5250-5251,U+5254,U+5256,U+525c,U+5265,U+5267,U+5269-526a,U+526f,U+5272,U+527d,U+527f,U+5288,U+529b,U+529d-52a1,U+52a3,U+52a8-52ab,U+52ad,U+52b1-52b3,U+52be-52bf,U+52c3,U+52c7,U+52c9,U+52cb,U+52d0,U+52d2,U+52d8,U+52df,U+52e4,U+52fa,U+52fe-5300,U+5305-5306,U+5308,U+530d,U+5310,U+5315-5317,U+5319,U+531d,U+5320-5321,U+5323,U+532a,U+532e,U+5339-533b,U+533e-533f,U+5341,U+5343,U+5347;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.ax.woff2') format('woff2');
  unicode-range: U+50cf,U+50d6,U+50da,U+50e7,U+50ee,U+50f3,U+50f5,U+50fb,U+5106,U+510b,U+5112,U+5121,U+513f-5141,U+5143-5146,U+5148-5149,U+514b,U+514d,U+5151,U+5154,U+515a,U+515c,U+5162,U+5165,U+5168,U+516b-516e,U+5170-5171,U+5173-5179,U+517b-517d,U+5180,U+5185,U+5188-5189,U+518c-518d,U+5192,U+5195,U+5197,U+5199,U+519b-519c,U+51a0,U+51a2,U+51a4-51a5,U+51ac,U+51af-51b0,U+51b2-51b3,U+51b5-51b7,U+51bb,U+51bd,U+51c0,U+51c4,U+51c6,U+51c9,U+51cb-51cc,U+51cf,U+51d1,U+51db,U+51dd,U+51e0-51e1,U+51e4,U+51ed,U+51ef-51f0,U+51f3,U+51f6,U+51f8-51fb,U+51fd,U+51ff-5201,U+5203,U+5206;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.ay.woff2') format('woff2');
  unicode-range: U+4f60,U+4f63,U+4f65,U+4f69,U+4f6c,U+4f6f-4f70,U+4f73-4f74,U+4f7b-4f7c,U+4f7f,U+4f83-4f84,U+4f88,U+4f8b,U+4f8d,U+4f97,U+4f9b,U+4f9d,U+4fa0,U+4fa3,U+4fa5-4faa,U+4fac,U+4fae-4faf,U+4fb5,U+4fbf,U+4fc3-4fc5,U+4fca,U+4fce-4fd1,U+4fd7-4fd8,U+4fda,U+4fdd-4fde,U+4fe1,U+4fe6,U+4fe8-4fe9,U+4fed-4fef,U+4ff1,U+4ff8,U+4ffa,U+4ffe,U+500c-500d,U+500f,U+5012,U+5014,U+5018-501a,U+501c,U+501f,U+5021,U+5026,U+5028-502a,U+502d,U+503a,U+503c,U+503e,U+5043,U+5047-5048,U+504c,U+504e-504f,U+5055,U+505a,U+505c,U+5065,U+5076-5077,U+507b,U+507f-5080,U+5085,U+5088,U+508d,U+50a3,U+50a5,U+50a8,U+50ac,U+50b2,U+50bb;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.az.woff2') format('woff2');
  unicode-range: U+4e94-4e95,U+4e98,U+4e9a-4e9b,U+4e9f,U+4ea1-4ea2,U+4ea4-4ea9,U+4eab-4eae,U+4eb2,U+4eb5,U+4eba,U+4ebf-4ec1,U+4ec3-4ec7,U+4eca-4ecb,U+4ecd-4ece,U+4ed1,U+4ed3-4ed9,U+4ede-4edf,U+4ee3-4ee5,U+4ee8,U+4eea,U+4eec,U+4ef0,U+4ef2,U+4ef5-4ef7,U+4efb,U+4efd,U+4eff,U+4f01,U+4f0a,U+4f0d-4f11,U+4f17-4f1a,U+4f1e-4f20,U+4f22,U+4f24-4f26,U+4f2a-4f2b,U+4f2f-4f30,U+4f34,U+4f36,U+4f38,U+4f3a,U+4f3c-4f3d,U+4f43,U+4f46,U+4f4d-4f51,U+4f53,U+4f55,U+4f58-4f59,U+4f5b-4f5e;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.a0.woff2') format('woff2');
  unicode-range: U+d7,U+e0-e1,U+e8-ea,U+ec-ed,U+f2-f3,U+f7,U+f9-fa,U+fc,U+2014,U+2018-2019,U+201c-201d,U+3001-3002,U+300a-300b,U+3010-3011,U+4e00-4e01,U+4e03,U+4e07-4e0b,U+4e0d-4e0e,U+4e10-4e11,U+4e13-4e14,U+4e16,U+4e18-4e1e,U+4e22,U+4e24-4e25,U+4e27,U+4e2a-4e2b,U+4e2d,U+4e30,U+4e32,U+4e34,U+4e38-4e3b,U+4e3d-4e3e,U+4e43,U+4e45,U+4e48-4e49,U+4e4b-4e50,U+4e52-4e54,U+4e56,U+4e58-4e59,U+4e5c-4e61,U+4e66,U+4e70-4e71,U+4e73,U+4e7e,U+4e86,U+4e88-4e89,U+4e8b-4e8c,U+4e8e-4e8f,U+4e91-4e93;
}

@font-face {
  font-family: 'HarmonyOS_Regular';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('//s1.hdslb.com/bfs/static/jinkela/long/font/HarmonyOS_Regular.a1.woff2') format('woff2');
  unicode-range: U+21-7e,U+a4,U+a7-a8,U+b0-b1,U+b7;
}`;

  // src/use-harmony-font/main.mts
  var appElement = document.getElementById("app") || document.body;
  var currentFontFamily = window.getComputedStyle(appElement).fontFamily;
  if (!currentFontFamily.includes("HarmonyOS_Regular")) {
    insertStyle(fontFace);
    let fontFamily;
    const pingFangRegex = /["']?PingFang SC["']?/i;
    if (pingFangRegex.test(currentFontFamily))
      fontFamily = currentFontFamily.replace(pingFangRegex, '"PingFang SC", HarmonyOS_Regular');
    else
      fontFamily = `HarmonyOS_Regular, ${currentFontFamily}`;
    insertStyle(`html, body, #app { font-family: ${fontFamily} !important; }`);
  }
})();
