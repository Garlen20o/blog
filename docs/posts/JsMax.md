---
title: 'Js最大安全整数'
description: 'JavaScript 中最大的安全整数'
date: 2023-11-15
lastUpdated: false
tags:
  - JavaScript
---

## Js的最大安全整数

[JS最大安全整数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER)- （2^53 – 1 ）

### 背景：
在使用地图工具时，例如marker，文档中要求的id 一般为 number类型，通过接口获取点位信息，后端会返回 String类型，js一般转number。

如： parseInt("1782599384477777922")  ===> 1782599384477778000。

### 问题：
如果id是递增的，就会因为大于Number.MAX_SAFE_INTEGER 精度丢失。有可能出现所有id为1782599384477778000。此时就有潜在的bug。

### 总结：
1. 使用BigInt类型，BigInt 是一种内置对象，它提供了一种方法来表示大于 2^53 - 1 的整数。这原本是 Javascript 中可以用 Number 表示的最大数字。BigInt 可以表示任意大的整数。
2. 使用String类型，String类型不会出现精度丢失。

扩展：[为什么JavaScript最大安全整数是2^53-1](https://juejin.cn/post/6880143057930190855)