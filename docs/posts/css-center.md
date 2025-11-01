---
title: 'CSS水平垂直居中'
description: '列举CSS水平垂直居中几种方式'
date: 2022-06-22
lastUpdated: false
tags:
  - CSS
---

### 垂直居中方法

```html
<body>
    <div>
        <p>123</p>
    </div>
</body>
```

#### 块级元素

#### 1.定位+transform：translate

#### 2.定位+外边距

```html
<style>
        p {
            margin: 0px;
            padding: 0px;
        }

        div {
            position: relative;
            width: 300px;
            height: 300px;
            background-color: blueviolet;
        }

        p {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100px;
            height: 100px;
      /* 利用定位top left位移50%，再根据自己的宽度，外边距位移一半 */
            /* margin-top: -50px;
            margin-left: -50px; */
            background-color: chartreuse;
     /* 利用定位top left位移50%，再根据自己的宽度，位移一半 */
            transform: translate(-50%, -50%);

        }

        /* p:hover {
            transform: translate(-50%, -50%) rotate(180deg);
            transform: translate(-50%, -50%); 需要加translate和rotate一起写，不然会覆盖
        } */
    </style>

<body>
    <div>
        <p>123</p>
    </div>
</body>
```



#### 3、left right top bottom都设置为0 + margin：auto

```html
 p {
            width: 100px;
            height: 100px;
            position: absolute;
            left:0;top:0;right:0;bottom:0;
            margin:auto;
    }
```

（1）先定位，设置 top:0;bottom:0;margin:auto 可以使元素水平居中。

（2）设置 left：0;right：0;margin:auto 可以使元素垂直居中。

（3）设置四个值都是0，margin:auto ；这个元素就在正中间了。如果不设置元素大小，就平铺了。


Left 当前元素的左侧与父元素左侧(就是原来默认位置)的距离值。

Right 当前元素的右侧与父元素右侧的距离值。

Top 当前对象顶部距离原位置顶部距离多少。

Bottom 当前对象底部距离原位置距离多少。



小结：子绝父相的时候，如果left right top bottom都设置为0，那就离父容器的上下左右的距离都是0，那么子元素宽高就是父容器的宽高了。这就解释了为什么 （定位元素，四属性定义就会有高度（子元素没有宽高的情况下））。

利用这个**特性**（指的是top-left-bottom-right都设置为0），离父容器的上下左右的距离都是0，设置了子元素的宽高，再使用margin：auto，就是自动均分剩余的宽高，从而达到居中效果。



#### 4、使用flex布局实现绝对定位居中

在父盒子中设置

```css
display: flex;
justify-content: center; //主轴
align-items: center;//侧轴
```



#### 5、行内元素

text-align CSS属性定义行内内容（例如文字）参考父元素对齐，所以需要设置父元素宽度才有效果。

**单行内联元素**。设置内联元素的高度(height)和行高(line-height)相等，从而使元素垂直居中。



#### 6、多行文字（元素）垂直居中

```css
   display:table-cell;
  vertical-align:middle;

/*   display:flex;
  align-items:center; */
```


###  CSS 终于支持align-content一条指令，实现垂直居中了

 `align-content` works in the default layout in 2024, allowing vertical centering with **1 CSS property**.

```html
<div style="margin-top:10px; height:100px; border:1px solid #ccc; align-content: center ">
<!--   <code>align-content: center</code> -->
  <div style="height:20px; background-color:#f00"></div>
</div>

<div style="margin-top:10px; height:100px; border:1px solid #ccc; position:relative ">
  <div style="width:100%;height:20px; background-color:#f00; position:absolute; top:50%; transform:translateY(-10px)"></div>
</div>
```

[CSS垂直居中](https://build-your-own.org/blog/20240813_css_vertical_center/)

 Chrome: 123 | Firefox: 125 | Safari: 17.4