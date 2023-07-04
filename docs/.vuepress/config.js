import { defineUserConfig, defaultTheme } from 'vuepress'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'Garlen的blog',
  description: '这是我的第一个 VuePress 站点',
  base:'/',
  theme: defaultTheme({
    navbar:[{
      text:'随记',
      children:[{
        text:'周刊',
        link:'/notes/weekly-notes.md'
      }]
    }]
  })
})