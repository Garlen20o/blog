---
title: 'Web Observer'
description: '本文通过认识几个Web Observer API，总结其应用场景'
date: 2025-11-05
lastUpdated: false
tags:
  - Web
---



## IntersectionObserver

### 作用：

`IntersectionObserver` 用来监听一个元素是否进入（或离开）另一个元素的可视区域（Viewport 或自定义容器）。



### 优势：

- 浏览器会在 **主线程之外** 的渲染管线中（通常是合成线程或专用 IntersectionObserver 任务队列）去检测可见性。
- 不会触发强制同步回流 (Reflow / Layout)，`IntersectionObserver` 的检测通常发生在 **布局之后、合成之前**



浏览器渲染流程简述：

`JavaScript → Style → Layout → Paint → Composite → Display`



### 应用：

| 场景         | 配置推荐                                  | 说明                    |
| ------------ | ----------------------------------------- | ----------------------- |
| 图片懒加载   | `{ rootMargin: '100px', threshold: 0.1 }` | 提前加载图片            |
| 无限滚动加载 | `{ threshold: 1.0 }`                      | 元素完全出现再加载      |
| 动画触发     | `{ threshold: 0.3 }`                      | 进入 30% 区域时启动动画 |
| 数据曝光统计 | `{ threshold: [0, 0.5, 1] }`              | 可见一半时统计曝光      |



```js
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    //IntersectionObserverEntry 包含了几个属性
    /**
    *isIntersecting:boolean表示目标元素是否与根元素相交(交叉)。如果相交（即使交叉区域为零）则为true；否则为false。
			true: 当元素开始进入或仍在交叉区域

		target:Element
    表示：被观察的目标元素。
    用途: 在多个观察目标中识别当前触发的元素
    
    time: number
    描述: 交叉状态变化的时间戳（从页面加载开始计算，单位：毫秒）
    用途：1,计算交叉事件的精确时间。2,性能分析（如计算元素进入视口的耗时）
    */
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src; // 真正加载图片
      obs.unobserve(img); // 加载完后取消观察
    }
  });
}, {
  root: null, // 观察目标的上层元素。如：父级元素。爷爷元素。默认为视口。
  rootMargin: '100px',  // 提前100px加载， root向外扩展的距离
  threshold: 0.1
  // 观察对象与视口交叉的范围，取值[0,1]。0表示碰上。1表示要完全看见。
  // 0.1表示:目标元素与视口可见比例达到 10% 时触发回调
});

document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
```





## ResizeObserver

`ResizeObserver` 可以实时监听某个元素尺寸变化，比如宽度或高度变化。



### 作用：

可用于响应式布局、自适应组件

```js
const box = document.querySelector('.box');

const observer = new ResizeObserver(entries => {
  for (const entry of entries) {
    console.log('元素尺寸变化：', entry.contentRect);
  }
});

observer.observe(box); // 开始观察
```



**自适应组件**
 例如图表组件在容器宽度变化时自动重新渲染。

```
new ResizeObserver(() => chart.resize()).observe(chartContainer);
```





## MutationObserver



监听一个普通 JS 对象的变化，我们会用 Object.defineProperty 或者 Proxy；对于Dom也有方法。

### 作用：

`MutationObserver` 用于监听 DOM 树中节点的增删改变化**（包括属性、文本、子节点等）。**



```js
// 创建观察器实例，并传入回调函数
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    console.log('变化类型:', mutation.type);
    console.log('变化详情:', mutation);
  });
});

// 选择要观察的目标节点
const targetNode = document.getElementById('app');

// 配置观察选项
observer.observe(targetNode, {
  childList: true,       // 监听子节点的增删
  attributes: true,      // 监听属性变化
  characterData: true,   // 监听文本内容变化
  subtree: true          // 是否监听后代节点
});

// 后续可以调用 observer.disconnect() 停止观察

```



### 应用：

框架内部：Vue / React 的 devtool 检测 DOM 更新

内容监控：自动检测富文本变化（如聊天消息、动态编辑器）
