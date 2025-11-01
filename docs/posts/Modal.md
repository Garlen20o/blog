---
title: 'Vue2/3-Modal弹窗类的组件实现'
description: '本文介绍Vue2与Vue3中动态弹窗组件的实现方法，包括Vue.extend与$mount的使用，以及Vue3中createVNode和render函数的应用。'
date: 2022-09-18
lastUpdated: true
tags:
  - Vue
---

本文介绍Vue2与Vue3中动态弹窗组件的实现方法，包括Vue.extend与$mount的使用，以及Vue3中createVNode和render函数的应用。

## Vue2实现主要思路

- Vue.extend+$mount将组件挂载
- install插件化挂到实例原型上面

```js
/plugins/Tip.js

import Vue from "vue";
import TipComponent from "@/components/Tip.vue";

const TipConstructor = Vue.extend(TipComponent);

const activeInstances = [];
const baseOffset = 20;
const gap = 10;

function calcOffset() {
  let offset = baseOffset;
  activeInstances.forEach((instance) => {
    const el = instance.$el;
    const height = el ? el.offsetHeight : 0;
    offset += height + gap;
  });
  return offset;
}

function createTip({
  message = "",
  type = "info",
  duration = 2000,
  closable = false,
  zIndex = 3000,
} = {}) {
  //实例化构造函数
  const instance = new TipConstructor({
    propsData: {
      message,
      type,
      duration,
      closable,
      zIndex,
    },
  });
  // 挂载实例挂在dom到$el
  instance.$mount();
  document.body.appendChild(instance.$el);

  instance.offset = calcOffset();
  instance.onClose = () => {
    const idx = activeInstances.indexOf(instance);
    if (idx > -1) activeInstances.splice(idx, 1);
    // 重新计算tips的偏移量
    for (let i = idx; i < activeInstances.length; i++) {
      const cur = activeInstances[i];
      const prevEl = i === 0 ? null : activeInstances[i - 1].$el;
      const top =
        i === 0
          ? baseOffset
          : prevEl
          ? prevEl.offsetTop + prevEl.offsetHeight + gap
          : baseOffset;
      cur.offset = top;
    }
  };

  activeInstances.push(instance);
  Vue.nextTick(() => instance.open());
  return instance;
}

function mountToPrototype(app) {
  app.prototype.$tip = (options) => createTip(options);
  ["success", "warning", "error", "info"].forEach((t) => {
    app.prototype.$tip[t] = (msg, opts = {}) =>
      createTip({ message: msg, type: t, ...opts });
  });
}

export default {
  install(app) {
    mountToPrototype(app);
  },
};

export { createTip };


```





## Vue3实现思路

- createVNode 加载 Modal预制组件， 支持slot
- render() 将vnode挂到容器
- install插件化挂到全局属性



```ts
import Modal from './Modal.vue';
import { ref, type App, type VNode, createVNode, render } from 'vue';

const modalQueue: VNode[] = [];
let appInstance: App | null = null;

// 单例 Modal 状态
let singletonContainer: HTMLDivElement | null = null;
let singletonVNode: VNode | null = null;
let singletonResolve: null | ((v: any) => void) = null;

function singletonRender(app: App, contentVNode: VNode, options: any, resolve: (v: any) => void) {
  if (!singletonContainer) {
    singletonContainer = document.createElement('div');
    document.body.appendChild(singletonContainer);
  }
  singletonResolve = resolve;
  const slots = {
    default: () => contentVNode,
    ...(options?.headerVNode ? { header: () => options.headerVNode } : {}),
    ...(options?.footerVNode ? { footer: () => options.footerVNode } : {})
  };
  singletonVNode = createVNode(
    Modal,
    {
      ...(options?.modalProps || {}),
      modelValue: true,
      'onUpdate:modelValue': (value: boolean) => {
        if (!value) {
          // 只隐藏Modal，不销毁节点
          if (singletonContainer) render(null, singletonContainer);
          if (singletonResolve) singletonResolve(true);
        }
      },
      onClose: () => {
        if (singletonContainer) render(null, singletonContainer);
        if (singletonResolve) singletonResolve(true);
      },
    },
    slots
  );
  singletonVNode.appContext = app._context;
  render(singletonVNode, singletonContainer);
}

export default {
  install(app: App) {
    appInstance = app;
    app.component('Modal', Modal);

    app.config.globalProperties.$modal = {
      // 多例弹窗
      open: (
        contentVNode: VNode,
        options?: {
          headerVNode?: VNode,
          footerVNode?: VNode,
          modalProps?: Record<string, any>
        }
      ) => {
        return new Promise((resolve) => {
          const container = document.createElement('div');
          document.body.appendChild(container);

          const slots = {
            default: () => contentVNode,
            ...(options?.headerVNode ? { header: () => options.headerVNode } : {}),
            ...(options?.footerVNode ? { footer: () => options.footerVNode } : {})
          };

          const vnode = createVNode(
            Modal,
            {
              ...(options?.modalProps || {}),
              modelValue: true,
              'onUpdate:modelValue': (value: boolean) => {
                if (!value) {
                  render(null, container);
                  document.body.removeChild(container);
                  resolve(true);
                }
              },
              onClose: () => {
                render(null, container);
                document.body.removeChild(container);
                resolve(true);
              },
            },
            slots
          );
          vnode.appContext = app._context;
          render(vnode, container);
          modalQueue.push(vnode);
        });
      },
      // 多例全局 close
      close: () => {
        const lastModal = modalQueue.pop();
        if (lastModal && lastModal.component) {
          if (typeof (lastModal.component.exposed as any)?.closeModal === 'function') {
            (lastModal.component.exposed as any).closeModal();
          }
        }
      },
      // 单例弹窗
      singletonOpen: (
        contentVNode: VNode,
        options?: {
          headerVNode?: VNode,
          footerVNode?: VNode,
          modalProps?: Record<string, any>
        }
      ) => {
        return new Promise((resolve) => {
          singletonRender(app, contentVNode, options, resolve)
        });
      },
      singletonClose: () => {
        if (singletonVNode && singletonVNode.component && typeof (singletonVNode.component.exposed as any)?.closeModal === 'function') {
          (singletonVNode.component.exposed as any).closeModal();
        } else {
          if (singletonContainer) render(null, singletonContainer);
          if (singletonResolve) singletonResolve(true);
        }
      },
    };
  },
};

```

