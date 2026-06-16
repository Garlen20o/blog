import { defineUserConfig } from "vuepress";

import theme from "./theme.js";
export default defineUserConfig({
  lang: "zh-CN",
  title: "Garlen",
  description: "Garlen的个人博客",

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
