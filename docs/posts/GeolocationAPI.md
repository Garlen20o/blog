---
title: 'H5 Geolocation API 遇到的坑及总结'
description: '记录一次开发过程中使用  Geolocation API的时候，遇到的问题'
date: 2024-06-20
lastUpdated: false
tags:
  - Web
---

```JS
 if (navigator.geolocation)
    {
       navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position.coords.latitude);
            console.log(position.coords.longitude);

          }, (e)=>{
            console.error(e);
          });
    }
    else
    {
        console.log("该浏览器不支持获取地理位置。");
    }

```

**调试环境**：手机端safari，Android 自带浏览器， PC---chrome edge Firefox

- ### 在本地开发时

使用localhost访问正常获取，使用本地ip获取失败

| 客户端  | 效果                                                         |
| ------- | ------------------------------------------------------------ |
| safari  | origin does not have permission to use geolocation service   |
| Android | ***GeolocationPositionError* *{code: 1, message: 'Only secure origins are allowed (see: https://goo.gl/Y0ZkNV).'}** |
| Chrome  | ***GeolocationPositionError* *{code: 1, message: 'Only secure origins are allowed (see: https://goo.gl/Y0ZkNV).'}** |



本地调试只能使用localhost访问正常获取

“只有在安全来源的情况才才被允许”。错误信息里还包含了一个提示链接，我们不妨打开这个链接（[https://goo.gl/Y0ZkNV](https://link.segmentfault.com/?enc=JkcbTDCTz4qt72ckkXjPFA%3D%3D.PfW2Msuen%2Ft%2FTDf1At7yYQ%2BEvJRTdy4lD1gkfY4k5%2Bs%3D)）看看。原来，为了保障用户的安全，Chrome浏览器认为只有安全的来源才能开启定位服务。那什么样才算是安全的来源呢？在打开链接的页面上有这么一段话：

> “Secure origins” are origins that match at least one of the following (scheme, host, port) patterns:
>
> - (https, *, *)
> - (wss, *, *)
> - (*, localhost, *)
> - (*, 127/8, *)
> - (*, ::1/128, *)
> - (file, *, —)
> - (chrome-extension, *, —)
>
> This list may be incomplete, and may need to be changed. Please discuss!

大概意思是说只有包含上述列表中的`scheme`、`host`或者`port`才会被认为是安全的来源，现在这个列表还不够完整，后续可能还会有变动，有待讨论。



- ### 部署到HTTPS的域名下

在页面挂载后调用API获取经纬度，无任何交互手势

| 客户端         | 效果                                                         |
| -------------- | ------------------------------------------------------------ |
| Edge           | 正常                                                         |
| chrome         | [Violation] Only request geolocation information in response to a user gesture. |
| iphone--safari | user denied geolocation                                      |
| Android        | 正常                                                         |

1. 发起定位请求需要用户的手势来发起
2. safari 缺少用户授权 。 在iOS，重置定位权限的操作路径是：系统-通用-还原-还原位置和隐私。

扩展：Google 似乎 [建议](https://link.segmentfault.com/?enc=G9nnohnAyMrkLKQ9U4Wn8A%3D%3D.zkEujwJTSHIYyIOxJp4PPNJvHhuHamaKLQ6oQXMB%2BqJtx3kS%2FTbEaiQnZX%2BtAHEhM9Ef%2F88Qe0HOSZy8%2BTyknsmWYFt54qaQ2DuQ9UK2fx4%3D) **不要** 在页面加载时加载地理位置：

> 用户对在页面加载时自动请求其位置的页面不信任或感到困惑。不是在页面加载时自动请求用户的位置，而是将请求与用户的手势联系起来，例如点击“查找靠近我的商店”按钮。确保手势清楚明确地表达了对用户位置的需要。





- ### 修改代码后由用户手势获取

| 客户端  | 效果                                                         |
| ------- | ------------------------------------------------------------ |
| Edge    | 正常                                                         |
| chrome  | Network location provider at 'https://www.googleapis.com/' : ERR_CONNECTION_TIMED_OUT. |
| safari  | 正常                                                         |
| Android | 正常                                                         |
| Firefox | unknown error acquiring position                             |

1.  Chrome、Firefox以及一些套壳浏览器接入的定位服务在国外，有较大的限制，也会造成定位失败，且失败率较高。



总结：使用H5的 geolocation api需要满足

- 用户授权位置信息

- 用户主动交互手势

- HTTPS协议

- 在网站中说明隐私政策，告诉用户位置信息的用途



**常见错误原因**

1. 用户未授权  Geolocation permission denied
2. 浏览器不支持定位接口  Browser not Support html5 geolocation
3. 非HTTPS安全访问 Only secure origins are allowed
4. 定位时间超时
5. chrome和Firefox 可能被墙



**其他**：定位经纬时，同一位置edge和 移动端实际获取的经纬差异大。实际使用准确未知。

可根据具体场景决定是否使用H5的API，在移动端还有小程序的API



**参考资料：**

[使用HTML5地理位置定位到城市的方法及注意事项](https://segmentfault.com/a/1190000009249162)

[HTML5定位的使用，及定位失败的原因](https://www.jianshu.com/p/84e732db6acc)

[MDN-Geolocation](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation)

**扩展：**  [【前端探索】H5获取用户定位？看这一篇就够了](https://juejin.cn/post/7046595451876802596#heading-10)