---
title: Obsidian入门使用
description: Obsidian入门使用
date: 2026-01-14
lastUpdated: true
tags:
  - 工具
---

## 场景

最近从文档编写工具转向用Obsidian，虽然比较重，但学习到简单入门，满足个人需求程度就好。

快捷键支持配置，让我从Typora无缝转过来。

## 概念

简单说说Obsidian的几个概念：Vault（仓库），插件，template

- Vault （仓库），以仓库为单位，区别Typora（开箱即用，打开任意文件），Obsidian会要打开的文件创建创库区。

- 插件： 内置很多核心插件，还有第三方插件（第三方有大纲插件 Obsidian Quiet Outline）。

- template： 类似Vscode的snippets，这是我的需求，我写md需要插入默认信息，obsidian支持插入模版需要在当前目录下创建 `/template`，然后在核心插件里配置这个文件路径就行，内容如下：

```md
---
title:
description:
date: {{date}}
lastUpdated: true
tags:
  -
---

```

**template使用：**
1. 新建一个空白笔记。

2. 按下 `Ctrl/Cmd + P`。

3. 输入 `插入模板` (Insert template)。


## 技巧：

一般情况下创建每个Vault都独立的配置，所以每次新建快捷键配置、下载过的插件都不见了。（这也符合仓库独立管理的概念，应该是他的产品设计思想）。

解决：
1. 可以把配置文件 .obsidian抽到全局一个路径放着，
2. 通过软连接`ln -s /global/ /your worksapce`到你的仓库就可以同步之前的配置了。（Very Good）