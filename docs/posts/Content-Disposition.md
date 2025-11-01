---
title: '浅识Content-Disposition'
description: '浅识Content-Disposition文件下载响应标头---小程序复用H5预览PDF问题'
date: 2024-05-06
lastUpdated: false
tags:
  - Web
  - 微信小程序
---


## 记录WX小程序打开H5附件pdf下载链接的问题

**现象** ：
小程序复用H5，打开下载链接的web-view，内容为一片乱码



**原因：**

在web端，后端接口提供的附件下载链接中，一般配置好了文件响应的Content-type指定了文件的类型。这里点击链接后，分了两种场景。

- 浏览打开新标签页，并下载。
- 浏览打开新标签页，并在线预览。



通过查看响应配置可知:

第一种下载的情况，可以看到

Content-Type:application/octet-stream

Content-Disposition: attachment;filename*=UTF-8 "xxx.pdf

在线预览时：

Content-Type: application/pdf

Content-Disposition: inline;filename*=UTF-8 "xxx.pdf



 **关于Content-Disposition**

 在 HTTP 场景中，第一个参数或者是 `inline`（默认值，表示回复中的消息体会以页面的一部分或者整个页面的形式展示），或者是 `attachment`（意味着消息体应该被下载到本地；大多数浏览器会呈现一个“保存为”的对话框，将 `filename` 的值预填为下载后的文件名，假如它存在的话）。



**总结理解：**

 服务器可能没有正确配置以声明资源的正确MIME类型 。

指定为inline就是网页端预览pdf的，指定为 attachment就是下载到本地

小程序直接复用后端附件接口时，接口使用了web端常用的---弹出“另存为”对话框 ，其Content-Type:application/octet-stream，Content-Disposition: 指定为attachment，此时小程序控制台警告

*<u>Resource interpreted as Document but transferred with MIME type application/octet-stream</u>*

得到是二进制文件的type，小程序不知道怎么解析这个文档。小程序的浏览器是阉割版的，估计没有实现指定为attachment下载。



**解决** :指定为Content-Disposition：inline小程序可以正常预览，满足简单复用H5预览的需求。接口可以增加一个传参，inline，让小程序环境决定是否使用在线预览pdf的方式。



**参考链接：**

[MIME](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types)

[Content-Disposition](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Disposition)

[Content-Type](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type)