---
title: '记录uniapp中props造成的坑'
description: '记录一次uniapp开发使用uview2.x的日历组件,由于uniapp中props传对象函数，函数值被过滤掉造成的bug'
date: 2025-02-26
lastUpdated: false
tags:
  - uni-app
  - element
---

## uniapp中props传对象函数，函数值被过滤掉

记录一次uniapp开发使用uview2.x的日历组件，因为需要自定义日期可选，设置disable值。因为用的第三方组件库。引入的是.vue文件，可以修改组件库源码。

本来是想像elmentui那样传一个picker-option对象带一个方法去过滤日期；谁知遇到坑了。



### 问题：
1.props传对象函数，发现函数值一直被过滤掉；2.还有vue2 this丢失问题。



### 探究1：

通过issue和阅读源码； packages/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js

 通过 JSON.parse(JSON.stringify(ret))，
来深度拷贝对象导致函数被过滤掉的。

### 探究2：

vue2的this丢失问题；因为这里还需要通过接口获取假期特殊日期进行禁用。

所以this要指向父组件。



最后选择使用日历组件用$parent 调用父组件的函数，从而避开props传函数问题；this的问题。

或者父组件不用对象包含函数的方式来传，直接传函数，不过这样还是有this指向问题。



### 总结：

这个场景比较特殊，日历组件需要一个禁用函数，让父组件决定禁用规则。函数执行需要在日历组件类决定disabled。其实组件代码可以改的话，可以将规则相关的变量传入，写一个策略模式的禁用函数。总之就是在uniapp开发小程序别在变量赋值函数，props传函数。

```js
let config = {
  day,
  week,
  // 小于最小允许的日期，或者大于最大的日期，则设置为disabled状态
  disabled:
    dayjs(date).isBefore(
      dayjs(minDate).format('YYYY-MM-DD')
    ) ||
    dayjs(date).isAfter(
      dayjs(maxDate).format('YYYY-MM-DD')
    ) ||
    // ADD:在这里添加
    this.$parent.filterDate && this.$parent.filterDate(date),
  // 返回一个日期对象，供外部的formatter获取当前日期的年月日等信息，进行加工处理
  date: new Date(date),
  bottomInfo,
  dot: false,
  month:
    dayjs(minDate).add(i, 'month').month() + 1
}
```



## 作为对比看看element-ui的源码

### el-date-picker如何通过*picker-options*自定义禁用日期

```js
 "name": "element-ui",
 "version": "2.15.14",

// src/picker/date-picker.js

export default {
  // 混入Picker组件，实现el-input的样式和事件
  mixins: [Picker],
   ...
  created() {
    //挂在展开的panel组件
    this.panel = getPanel(this.type);
  }
   ...
}


```



```vue
<script>
    // /src/picker.vue
//*挂载展开日期选择面板
    mountPicker() {
      this.picker = new Vue(this.panel).$mount();
        ...

      //*将传入的pickerOptions赋值给picker对象
      const updateOptions = () => {
          const options = this.pickerOptions;
          ...
          for (const option in options) {
          if (options.hasOwnProperty(option) &&
              option !== 'selectableRange') {
                // *将传入的pickerOptions中的disableDate赋值给picker对象 也就panel组件
            this.picker[option] = options[option];
          }
        }
          ...
          // 将picker.$el(panel组件)添加到dom中
         this.$el.appendChild(this.picker.$el);
      }
}

</script>

```



```vue
<template>
<!-- /src/panel/date.vue  传入  disabledDate -->
...
<date-table
   v-show="currentView === 'date'"
   @pick="handleDatePick"
   :selection-mode="selectionMode"
   :first-day-of-week="firstDayOfWeek"
   :value="value"
   :default-value="defaultValue ? new Date(defaultValue) : null"
   :date="date"
   :cell-class-name="cellClassName"
   :disabled-date="disabledDate">
</date-table>

...
</template>


<script>
computed: {
    rows() {
        ...
        // 通过传入pickerOptions的disableDate方法来判断是否禁止
            cell.disabled = typeof disabledDate === 'function' && disabledDate(cellDate);
        ...
    }
}
</script>

```

