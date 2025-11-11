---
title: 'Resume'
date: 2022-01-01
lastUpdated: true
---

## 工作经历
同望科技股份有限公司	--	      开发工程师		  --           2022年07月至 2025年07月

1.负责智慧园区，行政管理平台等前端开发和小程序开发和功能迭代；曾获年会年度“优秀项目员工”。
2.与后端约定RESTful API联调接口，减少联调阻塞时间；维护已有系统，修复bug，开发维护Koa后端接口；
3.主导文档生成技术调研与开发，获得采纳；分享与培训，主讲微信小程序专题内训，选型争议减少50%；
4.搭建小程序开发基座starter，集成 Taro 3.x / Uni-app 统一规范，新项目初始化缩至0.5日，业务开发效率提升25%，后续应用于2个项目（1万+用户规模）。

## 项目经历

### 智慧园区综合系统 --（Vue3 + Taro + 3D云渲染SDK + ECharts）
主要负责3D可视化大屏和物联、服务平台小程序开发。
1.大屏集成云渲染3D地图SDK：通过SDK的Camera API控制实现园区全景轮播；接入园区监控视频。
2.基于Vue动态组件实现多模块图表切换，provide/inject传递3D实例实现联动逻辑（如动态展示企业标记点）。
3.大屏封装可复用ECharts图表组件：预置常见图表options+自定义formatter，图表初始化效率提高30%。
4.小程序封装业务组件10+ 如：车牌键盘组件，解决输入规范，用户车辆登记增效50%。
5.基于WebSocket实现园区告警点定位3D地图；web-view集成监控视频+巡逻车轨迹地图渲染。

### 行政管理系统 -- (Vue2、Vue-router、Vuex、Quill.js、Apache POI、Poi-tl、uni-app、uview）
功能迭代-在线编辑富文本生成word转pdf，生成业务文件全流程审批，小程序端实现审批
1.基于Quill.js自研实现树形结构富文本组件（递归组件 + 设计JSON规范）。
2.实现Apache POI 操作文档模版生成word；私有化部署后，满足文件保密性，节省了采购第三方成本如wps。
3.patch Quill源码，扩展表格功能；自定义两种Inline format，基于dataset，实现富文本和业务、附件联动。
4.重构路由和页面，用iframe + webstorage打通两套系统的页面，适配业务流程流转。

### 小程序开发基座starter kit （Taro 3.x / Uni-app / Vue3）
基础：预置状态管理/UI库/网络层、eslint + prettier、自定义Tabbar/Toast组件；业务：图表、增强Picker组件，封装高频业务（文件上传/预览图片保存/分享海报）useList滚动分页、useDicts hooks。


## 个人技能
熟练掌握HTML5，CSS3（Sass），熟悉常见布局；熟悉JavaScript/TypeScript。
熟悉Vue.js2/3 Composition API及相关生态，Axios，具有企业项目开发经验。
熟练使用主流工具库ElementUI、Vant、uview、nut-ui、ECharts、dayjs、Amap等。
熟悉Webpack前端构建工具，npm/pnpm/nvm，了解微前端Wujie。
熟悉git/svn版本工具，熟练使用stash，分支概念管理代码。
熟悉uni-app和Taro, 开发过多个微信小程序，公众号网页，公众号扫码登陆，熟悉微信生态。
熟悉Nginx常见配置，在本地环境配置nginx做开发自测验证。
熟悉Node.js，熟悉使用Koa，MySQL搭建基本接口。