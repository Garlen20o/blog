---
title: 'http缓存---强/协商缓存'
description: ''
date: 2022-06-20
lastUpdated: true
tags:
  - http
---


# http缓存---强协商缓存

## 强缓存

（一般是js、css、图片文件）

cache-control: max-age=31536000



- 可缓存性设置

  cache-control的两个值

1、no-cache

在发布缓存副本之前，强制要求缓存把请求提交给原始服务器进行验证 (**协商缓存验证**)。

2、no-store

缓存不应存储有关客户端请求或服务器响应的任何内容，即不使用任何缓存。



- 设置的字段

强缓存相关字段有 expires，cache-control。如果 cache-control 与 expires 同时存在的话， cache-control 的优先级高于 expires。



- 为什么需要强缓存？

本质就是为服务器减压，减少网络请求。加快浏览器渲染速度。



### 原理过程：

- 服务器设置**响应头**---cache-control

- 根据max-age设置缓存过期时间，

- 浏览器**第一次**发起请求，服务器返回资源和cache-control给浏览器，code：200

- 浏览器**第二次**发起请求，先检查cache-control：max-age，如果没有过期则直接从本地缓存获取资源。 code：200  (from memory cache)。如果过期，则走协商缓存逻辑，如下。



### from memory cache 和 from disk cache的区别

from memory cache：字面理解是从内存中，其实也是字面的含义，这个资源是直接从内存中拿到的，不会请求服务器一般已经加载过该资源且缓存在了内存当中，当关闭该页面时，此资源就被内存释放掉了，再次重新打开相同页面时不会出现from memory cache的情况

from disk cache：同上类似，此资源是从磁盘当中取出的，也是在已经在之前的某个时间加载过该资源，不会请求服务器但是此资源不会随着该页面的关闭而释放掉，因为是存在硬盘当中的，下次打开仍会from disk cache （来自：[blog.csdn.net/garrettzxd/…](https://link.juejin.cn?target=https%3A%2F%2Fblog.csdn.net%2Fgarrettzxd%2Farticle%2Fdetails%2F80684880) ）



## 协商缓存



- 设置的字段

服务器设置 **last-modified**（资源上次修改时间） 或 **Etag**（资源唯一标识）标识给浏览器（**Etag更加优先**）

**last-modified**缺点：精确到秒，如果资源在一定时间内刷新，但内容没有变化，但是**last-modified**时间不同，就会导致实际内容一样，但依旧请求的情况



- 为什么需要协商缓存？

就是希望服务器更新资源，用户可以看到新资源，而不是读取缓存看到旧资源，所以当缓存过期时，浏览器请求携带信息，让服务器告诉浏览器这些资源是否还是最新的资源。200则更新，304则继续读取缓存





### 原理过程：

- 本地缓存时间过期
- 浏览器发起请求时，请求头携带if-modified-since（if-none-match），服务器判断过期与否，告诉浏览器资源是否更新，如果不是最新，则返回**code：200**和最新资源，包括最新last-modified（Etag）。若未更新，服务器返回**304状态码**，不返回资源，直接从缓存获取资源。



区别： 强缓存命中，不会请求服务器，直接请求缓存；协商缓存命中，会请求服务器，不会返回内容，然后读取缓存；



## 举例：

当浏览器第一次请求某个资源（比如 JS、CSS、图片等）时，
服务器会在响应头里加上一个时间戳，表示该资源在服务器上的最后修改时间。

```http
HTTP/1.1 200 OK
Content-Type: text/javascript
Cache-Control: max-age=3600
Last-Modified: Wed, 29 Oct 2025 05:00:00 GMT
ETag: "abc123"
```

这时候：
浏览器会缓存资源内容；
同时把 Last-Modified（和可能的 ETag）也一并缓存下来。

Cache-Control过期就会问服务器Last-Modified或者ETag变了没

