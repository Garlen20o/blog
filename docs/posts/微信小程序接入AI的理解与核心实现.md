---
title: 微信小程序接入AI的形式与核心实现
description:
date: 2026-06-16
lastUpdated: true
tags:
  - 微信小程序
  - AI
---
# 背景

## 功能本质

- 微信小程序最近推出小程序 AI 开发，（2026 年 6 月）处于**内测阶段**，需在小程序后台申请开通，暂未开放正式代码提审微信开放社区。
- 首先需要理解功能本质：不是 "在小程序里加 AI 聊天"，而是 "让微信 AI 智能体直接调用你的小程序"。是**流量入口型接入**（用户在微信 AI 对话窗口完成服务），而非业务功能型接入。


## 适用场景与核心价值

众所周知微信在国内的用户体量，做微信小程序AI开发有点像微信版的”SEO“。让微信AI根据你小程序的开发配置，匹配关键词出结果。
随着AI渐渐进入大众视野，为了提升品牌的曝光率，做这方面的AI开发有一定的意义。（适合生活服务的交易类，预约类，查询信息类（快递、票务））。


# 核心架构

根据官方所说，小程序提供了自动模式帮你已有的小程序实现SKILL，但有说法说手动开发模式针对场景，匹配度会更好。下面主要看看是怎么手动实现的。了解一下开发，看看[官方文档](https://developers.weixin.qq.com/miniprogram/dev/ai/guide.html?f_link_type=f_linkinlinenote&flow_extra=eyJpbmxpbmVfZGlzcGxheV9wb3NpdGlvbiI6MCwiZG9jX3Bvc2l0aW9uIjowLCJkb2NfaWQiOiJiM2RjYjQxZDdhMzRkZjU2LTNhZjdjMGIwN2MwNWNjOWYifQ%3D%3D)，核心就在MCP 协议 + SKILL 能力包。

1. 基于**微信专属 MCP 协议**（与标准 MCP 不同，适配小程序生态）
2. 一个小程序最多可创建**30 个独立 SKILL**，每个 SKILL 对应一类完整业务场景

微信客户端与小程序 AI 后台基于小程序 MCP 完成交互，开发者无需理解交互协议细节，只需要按框架设计提供完整的 `SKILL` 实现，小程序 AI 就能正确地推理及执行相应的原子接口。


| 文件 / 目录          | 作用                                     | 权重（AI 读取优先级） |
| ---------------- | -------------------------------------- | ------------ |
| `mcp.json`       | 能力契约：向 AI 声明所有**原子接口**、入参、出参、展示卡片、功能描述 | ★★★★（最高）     |
| `index.js`       | 接口注册入口：导出所有原子接口函数，AI 调用时执行             | 运行时核心        |
| `SKILL.md`       | 业务流程说明书：完整场景执行逻辑、步骤约束、意图匹配关键词、异常处理规则   | ★★★（最低）      |
| `components/` 目录 | 原子组件：对话窗口内渲染的可视化卡片（商品卡、订单确认卡、表单卡）      | 交互展示层        |

了解配置，可以参考官方demo。

```json
{

"name": "getRecommendedDrinks",

"description": "获取推荐饮品列表（业务对象：精选饮品卡片）。\n调用前置条件：用户表达想喝饮品但未指定具体商品名（如「想喝点什么」「推荐一下」「有什么好喝的」）。\n【严禁场景】用户已说出具体商品名（如「来杯拿铁」）时，禁止调用本接口，应调用 searchDrinks 或直接 selectDrink。",

"inputSchema": {

"type": "object",

"properties": {

	"scenario": {
	
	"type": "string",
	
	"description": "使用场景。仅允许以下取值：'default'（默认推荐）/ 'coffee'（咖啡类）/ 'tea'（茶饮类）/ 'warm'（暖饮）。用户未明确表达品类偏好时，留空走 default。",
	
	"enum": ["default", "coffee", "tea", "warm"]
	
	}

}

},

"outputSchema": {

	"type": "object",
	
	"properties": {
	
	"items": {
	
	"type": "array",
	
	"description": "推荐饮品列表",
	
	"items": {
	
		"type": "object",
		
		"properties": {
		
			"drinkId": { "type": "number", "description": "商品唯一 ID" },
			
			"name": { "type": "string", "description": "商品名称" },
			
			"price": { "type": "number", "description": "基础价格（元）" },
			
			"categoryName": { "type": "string", "description": "分类名" },
			
			"description": { "type": "string", "description": "商品简介" }
		
		}
		
	}
	
	},
	
	"total": { "type": "number", "description": "该场景下可选饮品总数" },
	
	"hasMore": { "type": "boolean", "description": "是否有更多商品可浏览" },
	
	"keyword": { "type": "string", "description": "搜索关键词（推荐场景为 null）" }
	
	}

},

"_meta": { "ui": { "componentPath": "components/recommended-drinks/index" } }

},
```

