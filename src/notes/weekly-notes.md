---
title: '记录周刊OR技术文章'
description: '记录[周刊](https://www.ruanyifeng.com/blog/)中，个人认为有意思，有用的内容；输出一些自己的观点'
date: 2023-01-28
lastUpdated: true
tags:
  - weekly
---

# 记录周刊OR技术文章

记录[周刊](https://www.ruanyifeng.com/blog/)中，个人认为有意思，有用的内容；输出一些自己的观点



## 文章
[字体等比例缩放](https://tobiasahlin.com/blog/responsive-fluid-css-type-scales/)本文介绍使用 CSS，将字体缩着窗口大小等比例缩放。



 [2023年前端技术盘点与展望](https://mp.weixin.qq.com/s/LiygBJqMN8U_vSpAjxMibQ)  腾讯云开发者公众号与腾讯 MoonWebTeam 前端团队联合推出的长篇技术报告

- **探索更好服务端渲染是前端框架的大势所趋**
- **鸿蒙入局**
- **拥抱 TypeScript**
- **Rust --前端基建**



 [JS 空数组的 every() 方法](https://humanwhocodes.com/blog/2023/09/javascript-wtf-why-does-every-return-true-for-empty-array/)（英文）

 `every()` 方法是一个[迭代方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array#迭代方法) ,对数组内每个item执行callback，不满足返回false，否则返回true。空数组永远返回true

 [如何用 CSP 防止 XSS 注入攻击](https://www.akshaykhot.com/content-security-policy/)

[多个Git账号，配置对应的SSH](https://stevenharman.net/configure-ssh-keys-for-multiple-github-accounts)

- **多个 GitHub 账号**：用户可能有个人的 GitHub 账号和企业提供的 GitHub Enterprise Cloud 账号。
- **相同的主机名**：这两个账号都使用相同的主机名 `github.com`，这使得在 SSH 配置中区分它们变得困难。



[浏览器默认屏蔽的端口](https://www.keenformatics.com/ports-that-are-blocked-by-browsers)

**6000端口因与X11协议相关，被Chrome等浏览器列为默认禁止访问的端口，主要出于安全考虑。**还有其他被浏览器禁的



## 工具

### 中后台管理系统框架

 [Fantastic-admin](https://github.com/fantastic-admin/basic)  一款开箱即用的 Vue3 中后台管理系统框架。

[ 一个浏览器插件，允许在浏览器的侧边栏打开网页 ](https://www.sidebrowser.xyz/) ---- 类似   [Sidebar 插件](https://chromewebstore.google.com/detail/sidebartab-pin-chatgpt-or/acghhljehhigfeinngmggkpgbacpikfe)

### Office 文件转成 Markdown

[MarkItDown](https://github.com/microsoft/markitdown) 微软官方推出的工具，将各种格式的文件（主要是 Office 文件）转成 Markdown 格式。标题是 GitHub 仓库链接，下面是[线上体验](https://markitdown.pro/)。 Perfect for documentation, blogs, and content management.

### 动画库

 [barba.js](https://barba.js.org/)   一个 JS 库，让网站页面的切换产生平滑的动画效果。





## 资源



### 综合

 ~~[Job In Corner](https://jobincorner.com/)   一个程序员招聘信息聚合网站，采集自各种社交平台/社区。~~

[资源网站汇总](https://1000userguide.com/#/?id=%e7%9b%ae%e5%bd%95)

[开源许可证选择器](https://open-source-license-chooser.toolsnav.top/zh/)  回答几个问题，帮你选择一个开源许可证



### 工具类型

[ 这个网站提供各种状态码的 HTTP 回应，供 API 调用，可以用来调试前端请求 ](https://httpraccoons.com/) 快速各种调试Code



#### JSON相关

 [JSON Generator](https://www.jsongenerator.io/)  一个在线工具，用来生成符合指定格式的 JSON 伪数据。内置了不少功能函数，如： repeat(min?, max?) 便于生成





#### **AI相关**

-  [AIHub](https://www.aihub.cn/)

- [POE；DL推荐，可看看](poe.com)
- [x-crawl](https://github.com/coder-hxl/x-crawl)一个 AI 辅助的爬虫库，基于 Node.js，抓取网页后，可以用文字描述所要的操作。



#### **设计相关**

[SVG搜索引擎](https://www.svgviewer.dev/)

[创作属于你的Logo-自定义LOGO](https://www.logocook.shop/)

 [Animotion](https://cssanimotion.pages.dev/)  一个网页 CSS 动画生成器，可视化设定动画，自动生成CSS代码。

[免费AI-logo设计](https://logogalleria.com/zh-CN/app)

[CSS效果模版](https://uiverse.io/elements)  开源 UI 元素 ，直接看到HTML和CSS代码

[全国行政区域边界数据](https://geojson.hxkj.vip/)   全国省市区县行政边界数据免费下载，API 接口实时更新，适用于 echarts 等地图应用

[官方天地图](https://cloudcenter.tianditu.gov.cn/administrativeDivision/)

[素材SoSo（壁纸查找）](https://clipso.agilestudio.cn/)




### 技术类型

[Next.js小记](https://www.bilibili.com/read/cv20992052)

[Hello 算法](https://www.hello-algo.com/)  动画图解、一键运行的数据结构与算法教程

 [Html 和 CSS 教程](https://internetingishard.netlify.app/html-and-css/)   英文；特点是有大量图解。 （Pics > Txt）

 [Web 音视频系列](https://hughfenghen.github.io/tag/WebAV/)    介绍如何在浏览器中处理音视频 ，当年理想直播厂相关技术栈，可以了解

[B站视频播放HTTP range](https://juejin.cn/post/7255110638154072120) 以后再看 b 站和知乎视频的时候，你会不会想起它是基于 range 来实现的分段下载和播放呢？

[基于 HTTP Range 实现视频分片快速播放！](https://www.quanzhan.co/archives/572)

[includeIf-git多用户环境配置](https://www.cnblogs.com/librarookie/p/15697181.html)

[Ts 刷题](https://typeroom.cn/aboutus/origin)





## 言论

[精益开发的精益是什么](https://www.ruanyifeng.com/blog/2023/09/weekly-issue-270.html)

 "精益开发"指的是**创建一个最小的产品原型，交付给客户，观察他们如何使用它，再快速推出小幅改进的下一代产品**。这样就能迎合快速变化的需求，不会引入无用功能。

```
思考:精益开发有其道理，这样开发的产品更贴近客户，更能第一时间满足客户需求，占据当前的市场；但我认为最终的成果离不开团队整体的运作。最小的产品原型这个边界在哪里？把控不好很容易又过于详情；话事人没有把握住这个边界；客户最需要的东西反馈不到需求文档上；私认为我们团队目前的产品推进问题在此，过早开发复杂繁琐的功能，不符合精益二字。
```



[有人就像ChatGPT](https://www.ruanyifeng.com/blog/2024/03/weekly-issue-292.html)

```txt
ChatGPT 不理解任何材料，但可以利用这些材料，快速找到问题的合理答案。它会综合和模仿，有时表现得非常令人信服，就像某个知识渊博的人在谈论某个主题。

学术界的很多人也是这样，他们很聪明，吸收了说话和构建理论的方法，并且善于听起来令人信服。

但是，如果你问一个探索性的问题，就会发现他们的理解很少，一切侃侃而谈都是表面的，没有深度。这都是模仿而不是真正的思想，他们只是故意让别人觉得似乎有道理。

许多领域的许多人，表现得就像 ChatGPT 的真人版，特别是在那些不做太多实证工作、不涉及对事实或假设进行检验的学科。他们制造的文本越多，就越危险。

这种人有很多明显迹象，比如使用非常笼统的术语，以及听起来巧妙的表述或行话，内容里面很少有事实，例子也很少或者很随意，没有真实的感受，而且通常也不会足够清楚地说出他不同意什么。

我现在意识到，我不理解某人在说什么，有时很可能是他们不知道自己在说什么，表现得像 ChatGPT。

我将其称为"吹泡泡"，即没有实质内容但能让他人信服的说话能力。这是很多大学领导的重要技能。

现在，ChatGPT 向我们展示了尽管不理解，但将大量材料合成为可信的文本流，是完全可以做到的。也许这是不可避免的，但真是一种非常不健康的恶习----人们应该走出去，观察事物，清晰说出自己的真实感受。

我明确意识到，自己更愿意被那些行为不像机器人的人包围，更愿意倾听那些有原创思想的人的声音。
```

综合材料，模仿... 没有深度; 没有真实感受； 原创思想。

“尽管不理解，但将大量材料合成为可信的文本流，是完全可以做到的。” ----- 让我想到了初级码农的困境，将大量现有的代码组合起来，一到探索性的问题，没有理解，都是浅尝辄止。不得不引以为戒。虽然不是说就非得去造轮子，但理解技术，能观察他人代码，清晰说出自己的理解，探索深度，发挥创造力；为业务提供支撑。 我认为这是向中高级进阶的途径。

“我确意识到，自己更愿意被那些行为不像机器人的人包围，更愿意倾听那些有原创思想的人的声音。”









《认知》：

- 追寻源头的信息源（git、mdn上的信息质量更高）

 试想如果别人的信息源没有你的好，那么，这些看不见信息源的人，只能接触得到二手信息甚至三手信息，只能获得被别人解读过的信息，这些信息被三传两递后必定会有错误和失真，甚至会被传递信息的中间人hack其中的信息（也就是“中间人攻击”），而这些找不出信息源的人，只能“被人喂养”，于是，他们最终会被困在信息的底层，永世不得翻身。 学习C语言，放着原作者K&R的不用，硬要用错误百出谭浩强的书，能有什么好呢？

知识：

- 系统知识图
- 知识缘由

 任何知识都是有缘由的，了解一个知识的来龙去脉和前世今生，会让你对这个知识有非常强的掌握，而不再只是靠记忆去学习。

技能：

- 精益求精（寻找更好的实践）
- 试错犯错（实践时，不模仿“正确答案”）
- 找高手切磋（其实多接触有质量的高手的分享，学习他人所见，WC还能这样？）





### 《未来的交互》：

 前端人在这块能够做些什么？从技术上来讲，需要我们通过机器学习算法，实时地将虚拟图像覆盖到用户屏幕，并且和真实世界中的位置进行对齐，结合 WebRTC 技术实现网页浏览器实时获取和展示视频流，再利用 WebGL 的能力，进行 3D 人物模型加载，渲染和播放动画。

**Web 3D**

随着 5G 技术发展，视频加载速度会非常快，简单的实时渲染会被视频直接替代。复杂的可以通过服务器渲染，将画面传回网页中，只要传输够快，手机的性能就不再是问题。

降低 web 3D 研发成本应该是将来的一个重要发展路线，随着技术门槛的降低，会吸引更多感兴趣的人加入促使其正向发展。所以 Web 3D 可能会朝着平台化的方向发展，能提供简单高效的工具将成为核心竞争力。

WebRTC

WebRTC 是一项实时通讯技术，它为前端打开了信息传递的新世界大门，对于绝大多数前端开发者来说，对于信息的传递还局限于 XMLHttpRequest，升级到全双工大家会用到 WebSocket ，对于能力闭塞的前端来说，WebRTC 无疑拓宽了前端的技术门路。

以上应该是少人卷，但难度不小的赛道



### 《大模型体验测试方向》

**体验或检测GPT-4V等大模型的图像能力；可进行四项测试（图片问答、文字识别、文档识别、物体检测）**



### 《 第二张幻灯片开始讲起 》

**--- 抓住受众的心理---加深印象---发掘潜在的增值点**

*正常的小说是自然的顺序，第一章介绍英雄，第二章是英雄开始行动。*

*但是，你可以交换这两章，现在第一章是英雄开始行动，小说可能以一把枪指着英雄的头部开始。就在紧张气氛达到顶峰时，然后是第二章介绍英雄。这样的话，读者就更有理由想了解这个角色。*

*同理，先演示幻灯片的第二部分，可能有同样的效果。*



**场景：**

- **游戏，上来先给你一个满级的人物技能熟悉操作，然后打落凡间从零开始重新练级 （黑神话）**
- **电视剧，综艺高潮情节时接去广告（观众留存与首屏广告的得益）**
- **...**



### 《留给初中阶程序员的时间不多了》

**泛计算机知识**、**适应能力**、**工程化能力**（拓宽技术边界，拓宽认识面）

**替代你的不是 AI，而是那些更会用 AI 也更懂计算机的人**

