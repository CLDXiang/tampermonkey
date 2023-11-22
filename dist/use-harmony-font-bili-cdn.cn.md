# 字体替换为 B 站 HarmonyOS Sans，在 Windows 下获得接近苹方的阅读体验

在 B 站以外的网站使用 B 站 CDN 分发的 HarmonyOS Sans 字体，提升不支持苹方的平台（Windows，说的就是你）阅读体验。

出于性能考虑，仅对常见根节点（html, body, #app）进行检查，不支持部分字体未声明在根节点的页面，不支持声明了 CSP 限制的页面（如 GitHub）。

直接使用了 B 站的字体 CDN 链接，提高字体加载速度，侵删。

如果有需要专门支持或排除的页面，可以反馈给我或直接 [PR](https://github.com/CLDXiang/tampermonkey/pulls)。

## 问题反馈

GitHub Issues: [https://github.com/CLDXiang/tampermonkey/issues](https://github.com/CLDXiang/tampermonkey/issues)

邮箱: <cldxiang@qq.com>
