---
title: '记录破解文心一言F12防调试，新认识一类Content-Type:SSE'
description: '记录破解文心一言F12防调试的经历，模拟防调试的js脚本，并实现破解，认识一种Content-Type：text/event-stream;'
date: 2023-04-15
lastUpdated: 2025-04-15 23:35:37
tags:
  - SSE
  - AI
---
# 记录破解文心一言F12防调试，新见一种Content-Type:SSE


## 背景

初次使用国内ai的时候好奇想看看他们接口，发现控制台被ban了。于是研究了一下实现。



### 实现前端js防止调试

首先是模拟文心一言前端防调试的方法。

```js
  document.onkeydown = function (e) {
    if (e.keyCode === 123) {
      return false;
    }
  };
  document.oncontextmenu = function () {
    return false;
  };
  (() => {
    function ban(params) {
      let currentTime = new Date().getTime()
      let timer = setInterval(() => {
        (new Function("debugger"))()//这里启动新js文件
        let date = new Date().getTime()
        if (date - currentTime > 110) {
          clearInterval(timer)
          console.warn('opened dev');
          document.body.innerHTML = "禁止调试"
          window.location.href = "about:blank"
        } else {
          currentTime = date
        }
      }, 50)
    }
    try {
      ban()
    } catch (error) {

    }
  }
  )()

```

### 解决

最后破解F12的方式：Chorme--设置--隐私安全--网站设置--内容--JavaScript

把文心添加到不允许使用 JavaScript中；然后先打开F12，再打开允许使用Js，即可。

这里应该是跳过了加载禁用调试的脚本。具体得问文心了。hhh



## 遇见ai+web接口

从network看到主要是这个接口返回的对话内容。 https://yiyan.baidu.com/eb/chat/conversation/v2 ，携带了我对话输入的文本。

其中 响应的Content-Type:  text/event-stream;charset=UTF-8；



## 发现SSE

这种Content-Type没怎么接触过。问了问文心一言相关信息得知如下：

 ***服务端SSE（Server-Sent Events，服务器发送事件）是一种基于HTTP协议的实时数据传输技术，用于从服务器向客户端推送事件流。它允许服务器在不建立持久连接的情况下，向客户端发送实时更新的数据。***

 ***服务端SSE的工作原理是，客户端通过发送一个HTTP请求到服务器，请求一个特定的资源，例如一个事件流的URL。服务器在收到请求后，会保持这个连接打开，并开始向客户端发送事件流。每个事件流由一系列的文本行组成，其中每一行都是一个单独的事件。***



整个过程以 `text/event-stream` 格式来发送事件。

这时很容易联想到webSocket，再查了下[mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource)

 与 [WebSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSockets_API) 不同的是，服务器发送事件是单向的。数据消息只能从服务端到发送到客户端（如用户的浏览器）。这使其成为不需要从客户端往服务器发送消息的情况下的最佳选择。例如，对于处理如社交媒体状态更新、消息来源（news feed）或将数据传递到[客户端存储](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage)机制（如 [IndexedDB](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API) 或 [web 存储](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API)）之类的，`EventSource` 无疑是一个有效方案。

 事件流中的消息由一对换行符分开。  前端用JS API EventSource 来处理接收信息。



## 应用示例

 **服务端SSE适用于需要实时数据传输的场景，如实时消息、实时日志、实时数据，股票信息更新等。**



下面用express + html的一个示例

### **服务端代码**

```js
app.get('/longConversation',(req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.writeHead(200, {'Content-Type': 'text/event-stream'})

  let currentTime = new Date().getTime()
  let timer = setInterval(() => {
    let date = new Date().getTime()
    if(date - currentTime > 10000){
      res.write('event:end' + "\n")//指定事件，前端EventSource用到
      res.write('data:收盘' + "\n\n")
      clearInterval(timer)
      // res.end()
    }else{
      res.write('event:before' + "\n")
      res.write('data:准备发送' + date + "\n\n")
      res.write('event:message' + "\n")
      res.write('data:你好' + date + "\n\n")
    }
  }, 1000);
})
//在 text/event-stream 类型的响应中，数据必须以 "\n\n" 分隔。这是因为 text/event-stream 类型的响应是基于 HTTP 协议的，而 HTTP 协议要求响应数据必须以 "\n\n" 分隔。
```

### **客户端代码**

```html
<body>
  <div id="quote"></div>
</body>
<script>
    // 创建EventSource对象并连接到服务器
  var source = new EventSource('http://10.1.35.54:3000/longConversation');

  //EventSource对象,监听的事件由服务端event字段决定，默认是message

  // 监听事件
  source.addEventListener('message', function (event) {
    // 解析事件数据
    var quote = event.data;
    // 在页面上显示股票报价
    document.getElementById('quote').innerHTML = quote;
  });
  source.addEventListener('end', function (event) {
    // 解析事件数据
    var quote = event.data;
    console.warn(event);
    // 在页面上显示股票报价
    document.getElementById('quote').innerHTML = quote;
  });

  // 关闭连接
  // source.close();
</script>

```



## 小结

 最开始想看看AI对话的api，通过文心的F12防调试作为切入点，研究了简单F12防调试，（实际上在前端防调试不现实），查看了文心的AI对话api；初步研究了 EventSource ，`text/event-stream` 格式相关内容，入门完毕。后续还需要进一步研究HTTP的内容。