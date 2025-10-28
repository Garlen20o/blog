import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/blog/",

  lang: "zh-CN",
  title: "Garlen",
  description: "vuepress-theme-hope 的博客演示",

  head: [
    // 设置 favor.ico，.vuepress/public 下
    [
        'link', { rel: 'icon', href: '/avatar.png' }
    ]
  ],
  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
