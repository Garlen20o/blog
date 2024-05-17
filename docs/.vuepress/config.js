import { defineUserConfig, defaultTheme } from 'vuepress'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'Garlen blog',
  description: '这是我的第一个 VuePress 站点',
  base:'/blog/',
  theme: defaultTheme({
    navbar:[{
      text:'随记',
      children:[
        {
          text:'周刊',
          link:'/notes/weekly-notes.md'
        },
        {
          text:'优秀的网站',
          link:'/notes/links.md'
        },
      ]
    }]
  })
})