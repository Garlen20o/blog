import { defineUserConfig } from "vuepress";

import theme from "./theme.js";
export default defineUserConfig({
  lang: "zh-CN",
  title: "Garlen",
  description: "vuepress-theme-hope 的博客演示",

  head: [
    // 设置 favor.ico，.vuepress/public 下
    [
        'link', { rel: 'icon', href: '/avatar.png' }
    ]
  ],

  extendsPage: (page) => {
    page.frontmatter.commentID = `https://blog.garlenexus.top${page.path}`;
  },

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
