---
title: 'Quill.js扩展'
description: 'Quill支持自定义Format的扩展，通过面向对象编程，可以扩展出满足业务需求的format'
date: 2025-01-06
lastUpdated: false
tags:
  - 富文本
---


## 背景

使用Quill.js富文本编辑器开发业务功能时，遇到需要插入一些类似外部标签，技术调研时，[Quill.js](https://quilljs.com/docs/formats)文档具有一些API支持format特定的文本，formatText(), 但是 Quill内置的format不满足需求，希望插入标签时能携带一些用于业务联动的源数据。

经过对Quill源码的涉猎，和gpt等AI的协助，发现可以Quill支持自定义Format的扩展。



## 实现

简单认识Quill：

Parchment 是 Quill.js 的文档对象模型，类似 DOM 之于 web 页面的关系。Parchment 树是由多个 Blot 组成的，这也同样类似 DOM 树与 Node 的关系。Parchment 应用于结构、格式和内容，Attibutes 提供轻量级的格式信息。



总结下来，Parchment 中存在 3 个核心概念：

1. Parchment 文档对象模型；
2. Blot 文档的基本构建单元；
3. Attributes 对 Blot 的格式信息补充，其实与 HTML Node 上的 attibutes 类似。



因为需求插入标签时，是行内元素。类比CSS概念，行内元素Inline。

InlineBlot就是Quill内部定义好的一种Format，同时还发现了InlineBlot，有一个方法create返回的是Dom元素。就是从这里入手了。

`static create(value?: unknown): HTMLElement;`



自定义扩展代码核心如下：



```ts
//quill 有良好的types支持。Good！ 这里Inline extends InlineBlot
import Inline from "quill/blots/inline";

export const wmap = new WeakMap<any, HTMLElement[]>();

// MyQuoteBlot: code标签，支持uid/editorIdx数据
export class MyQuoteBlot extends Inline {
  static blotName = 'my-quote';
  static tagName = 'code';
  static create(value: { item: Object, uid?: string; editorIdx: number }) {
    const node = super.create() as HTMLElement;
    if (value && typeof value === 'object') {
      // 这里就可以format的时候，通过format的传参，携带一些元数据到Dom元素上
    }
    return node;
  }
  static formats(domNode: HTMLElement) {
    return {
      // 这里是配合Quill文档模型正确返回的format属性的
      uid: domNode.getAttribute('data-uid') ?? undefined,
      editorIdx: domNode.getAttribute('data-editorIdx') ?? undefined,
    };
  }
}
```



```vue
// 注册自定义Blot支持
<script>

  ...
  Quill.register({ 'formats/my-quote': QuillExt.MyQuoteBlot }, true);
   quill = new Quill(editorRef.value, {
    theme: 'snow',
    formats: [
      //注册
      'my-quote',
    ],
  });

  ...
  // 对应自定义的static blotName = 'my-quote'; 就可以传自定义参数了
  quill.formatText(index, length, 'my-quote', {item, uid: item.id, editorIdx: 0});
</script>

```



## 总结

模块通过调用 `Quill.register()`注册，会保存在 `Quill.imports`变量上，比较特殊的 `blots/` `formats/`前缀会同时注册到 `Parchment`（用于管理 blot）上，`blot` 之于富文本就相当于 `DOM` 之于 web。

Quill文档比较简单，不过Github issue还挺活跃，多看看Issue，读下源码还是有用的。



参考链接

[富文本编辑器 Quill.js 系列三：架构与扩展](https://juejin.cn/post/7166171572372242463)