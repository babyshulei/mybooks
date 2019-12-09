# start

> 2019.12.05 @wsl

## 开发准备

### 1. 申请AppId

进入官方小程序简介网站 <https://mp.weixin.qq.com/cgi-bin/wx>，点击下面的注册，注册成功后，在 开发--开发设置 可以看到小程序的AppId。

### 2. 安装开发者工具

开发者工具下载页面：<https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html>，下载安装。

### 3. 开发小程序

打开小程序开发者工具，使用注册小程序所使用的微信扫码登录，选择小程序项目，创建项目，填入AppId，快速生成项目。可以选择预览，在手机端查看效果。

> 注意：不填AppId也可以进行小程序的开发，但是不能预览，小程序也不能发布。

## 代码组成

小程序由配置代码JSON文件、模板代码 WXML 文件、样式代码 WXSS文件以及逻辑代码 JavaScript文件组成。

### 1. json配置

用来进行静态配置。

### 2. WXML文件

类似HTML，页面骨架。

标签属性、变量名都是大小写敏感的。

#### 数据绑定

可以进行数据绑定，需要在对应js文件中的data添加对应变量，未定义的变量或值为undefined的变量不会同步到wxml中。

语法：`{{变量名}}`

```html
<text data-test="{{test}}">时间：{{time}}</text>
```

用 {{}} 不仅可以进行数据动态绑定，还可以在内部进行简单的逻辑运算。如算数运算、三元运算、字符串拼接等。

#### 条件逻辑

```html
<view wx:if="{{length > 5}}"> 1 </view>
<view wx:elif="{{length > 2}}"> 2 </view>
<view wx:else> 3 </view>
```

如果要一次性判断多个组件标签，可以使用一个 `<block/>` 标签将多个组件包装起来，并在上边使用 wx:if 控制属性。

```html
<block wx:if="{{true}}">
  <view> view1 </view>
  <view> view2 </view>
</block>
```

#### 列表渲染

在组件上使用 wx:for 控制属性绑定一个数组，即可使用数组中各项的数据重复渲染该组件。默认数组的当前项的下标变量名默认为 index，数组当前项的变量名默认为 item。

```html
<!-- array 是一个数组 -->
<view wx:for="{{array}}">
  {{index}}: {{item.message}}
</view>

<!-- 对应的脚本文件
Page({
  data: {
    array: [{
      message: 'foo',
    }, {
      message: 'bar'
    }]
  }
})
-->
```

使用 wx:for-item 指定数组当前元素的变量名，使用 wx:for-index 指定数组当前下标的变量名：

```html
<view wx:for="{{array}}" wx:for-index="idx" wx:for-item="itemName">
  {{idx}}: {{itemName.message}}
</view>
```

类似 `block wx:if` ，也可以将 `wx:for` 用在 `<block/>` 标签上，以渲染一个包含多节点的结构块。

如果列表中项目的位置会动态改变或者有新的项目添加到列表中，并且希望列表中的项目保持自己的特征和状态（如 `<input/>` 中的输入内容， `<switch/>` 的选中状态），需要使用 `wx:key` 来指定列表中项目的唯一的标识符。

`wx:key` 的值以两种形式提供：

1. 字符串，代表在 for 循环的 array 中 item 的某个 property，该 property 的值需要是列表中唯一的字符串或数字，且不能动态改变。
2. 保留关键字 this 代表在 for 循环中的 item 本身，这种表示需要 item 本身是一个唯一的字符串或者数字，如：

当数据改变触发渲染层重新渲染的时候，会校正带有 key 的组件，框架会确保他们被重新排序，而不是重新创建，以确保使组件保持自身的状态，并且提高列表渲染时的效率。

```html
<switch wx:for="{{objectArray}}" wx:key="unique" > {{item.id}} </switch>
<button bindtap="switch"> Switch </button>
<button bindtap="addToFront"> Add to the front </button>

<switch wx:for="{{numberArray}}" wx:key="*this" > {{item}} </switch>
<button bindtap="addNumberToFront"> Add Number to the front </button>
```

对应js

```javascript
Page({
  data: {
    objectArray: [
      {id: 5, unique: 'unique_5'},
      {id: 4, unique: 'unique_4'},
      {id: 3, unique: 'unique_3'},
      {id: 2, unique: 'unique_2'},
      {id: 1, unique: 'unique_1'},
      {id: 0, unique: 'unique_0'},
    ],
    numberArray: [1, 2, 3, 4]
  },
  switch: function(e) {
    const length = this.data.objectArray.length
    for (let i = 0; i < length; ++i) {
      const x = Math.floor(Math.random() * length)
      const y = Math.floor(Math.random() * length)
      const temp = this.data.objectArray[x]
      this.data.objectArray[x] = this.data.objectArray[y]
      this.data.objectArray[y] = temp
    }
    this.setData({
      objectArray: this.data.objectArray
    })
  },
  addToFront: function(e) {
    const length = this.data.objectArray.length
    this.data.objectArray = [{id: length, unique: 'unique_' + length}].concat(this.data.objectArray)
    this.setData({
      objectArray: this.data.objectArray
    })
  },
  addNumberToFront: function(e){
    this.data.numberArray = [ this.data.numberArray.length + 1 ].concat(this.data.numberArray)
    this.setData({
      numberArray: this.data.numberArray
    })
  }
})
```

#### 模板

WXML提供模板（template），可以在模板中定义代码片段，然后在不同的地方调用。使用 name 属性，作为模板的名字。然后在 `<template/>` 内定义代码片段，如：

```html
<template name="msgItem">
  <view>
    <text> {{index}}: {{msg}} </text>
    <text> Time: {{time}} </text>
  </view>
</template>
```

使用 is 属性，声明需要的使用的模板，然后将模板所需要的 data 传入，如：

```html
<!--
item: {
  index: 0,
  msg: 'this is a template',
  time: '2016-06-18'
}
-->

<template is="msgItem" data="{{...item}}"/>

<!-- 输出
0: this is a template Time: 2016-06-18
-->
```

is可以动态决定具体需要渲染哪个模板。

#### 引用

WXML 提供两种文件引用方式import和include。

import 可以在该文件中使用目标文件定义的 template，需要注意的是 import 有作用域的概念，即只会 import 目标文件中定义的 template，而不会 import 目标文件中 import 的 template，简言之就是 import 不具有递归的特性。

```html
<import src="item.wxml"/>

<template is="item" data="{{text: 'forbar'}}"/>
```

include 可以将目标文件中除了 `<template/> <wxs/>` 外的整个代码引入，相当于是拷贝到 include 位置。

```html
<!-- index.wxml -->
<include src="header.wxml"/>

<view> body </view>

<include src="footer.wxml"/>
```

#### 共同属性

所有wxml 标签都支持的属性称之为共同属性。

| **属性名**   | **类型**     | **描述**       | **注解**                                 |
| :----------- | :----------- | :------------- | :--------------------------------------- |
| id           | String       | 组件的唯一标识 | 整个页面唯一                             |
| class        | String       | 组件的样式类   | 在对应的 WXSS 中定义的样式类             |
| style        | String       | 组件的内联样式 | 可以动态设置的内联样式                   |
| hidden       | Boolean      | 组件是否显示   | 所有组件默认显示                         |
| data-*       | Any          | 自定义属性     | 组件上触发的事件时，会发送给事件处理函数 |
| bind*/catch* | EventHandler | 组件的事件     |                                          |

### 3. WXSS样式

类似css，页面样式。

#### 尺寸单位

引入 rpx 尺寸单位，用来适配不同宽度的屏幕。

#### wxss引用

小程序中，可以通过`@import './test_0.wxss'` 进行样式文件的引用。

#### 内联样式

```html
<view style="color: red; font-size: 48rpx"></view>
```

小程序支持动态更新内联样式：

```html
<!--index.wxml-->

<!--可动态变化的内联样式-->
<!--
{
  eleColor: 'red',
  eleFontsize: '48rpx'
}
-->
<view style="color: {{eleColor}}; font-size: {{eleFontsize}}"></view>
```

#### 支持的选择器

| **类型**     | **选择器** | **样例**      | **样例描述**                                   |
| :----------- | :--------- | :------------ | :--------------------------------------------- |
| 类选择器     | .class     | .intro        | 选择所有拥有 class="intro" 的组件              |
| id选择器     | #id        | #firstname    | 选择拥有 id="firstname" 的组件                 |
| 元素选择器   | element    | view checkbox | 选择所有文档的 view 组件和所有的 checkbox 组件 |
| 伪元素选择器 | ::after    | view::after   | 在 view 组件后边插入内容                       |
| 伪元素选择器 | ::before   | view::before  | 在 view 组件前边插入内容                       |

#### 权重计算

![1575631508225](..\images\wxss-weight.png)

#### 官方样式库

微信提供了WeUI.wxss基础样式库。

WeUI是一套与微信原生视觉体验一致的基础样式库，由微信官方设计团队为微信内网页和微信小程序量身设计，令用户的使用感知更加统一。包含button、cell、dialog、progress、toast、article、actionsheet、icon等各式原生。

具体使用文档可参考：<https://github.com/Tencent/weui-wxss>

### 4. JavaScript脚本

![1575858558936](..\images\wxjs.png)

小程序中的 JavaScript 是由ECMAScript 以及小程序框架和小程序 API 来实现的。同浏览器中的JavaScript 相比没有 BOM 以及 DOM 对象，所以类似 JQuery、Zepto这种浏览器类库是无法在小程序中运行起来的，同样的缺少 Native 模块和NPM包管理的机制，小程序中无法加载原生库，也无法直接使用大部分的 NPM 包。

#### 语法兼容

ES6语法兼容问题，小程序IDE提供语法转码工具帮助开发者，将 ECMAScript 6代码转为 ECMAScript 5代码，从而在所有的环境都能得到很好的执行。

开发者需要在项目设置中，勾选 ES6 转 ES5 开启此功能。

![1575859290841](..\images\wxjs-es5.png)

#### 模块化

同浏览器不同，小程序中可以将任何一个JavaScript 文件作为一个模块，通过module.exports 或者 exports 对外暴露接口。

在需要使用这些模块的文件中，使用 require(path) 将公共代码引入。

```javascript
// moduleA.js
module.exports = function( value ){
  return value * 2;
}

// B.js
// 在B.js中引用模块A
var multiplyBy2 = require('./moduleA')
var result = multiplyBy2(4)
```

#### 脚本的执行顺序

浏览器中，脚本严格按照加载的顺序执行。

```html
<html>
<head>
  <script src ="a.js"></script>
  <script>
    console.log('inline script')
  </script>
  <script src ="b.js"></script>
</head>
</html>
```

执行顺序：a.js -> inline script -> b.js

而在小程序中的脚本执行顺序有所不同。小程序的执行的入口文件是 app.js 。并且会根据其中 require 的模块顺序决定文件的运行顺序。

```javascript
/* a.js
console.log('a.js')
*/
var a = require('./a.js')
console.log('app.js')

/* b.js
console.log('b.js')
*/
var b = require('./b.js')

// 输出： a.js   app.js   b.js
```

当 app.js 执行结束后，小程序会按照开发者在 app.json 中定义的 pages 的顺序，逐一执行。

```json
{
  "pages": [
    "pages/index/index",
    "pages/log/log",
    "pages/result/result"
  ],
  "window": {}
}
```

#### 作用域

小程序的脚本的作用域同 NodeJS 更为相似。

在文件中声明的变量和函数只在该文件中有效，不同的文件中可以声明相同名字的变量和函数，不会互相影响。

当需要使用全局变量的时，通过使用全局函数 getApp() 获取全局的实例，并设置相关属性值，来达到设置全局变量的目的。

```javascript
// a.js
// 获取全局变量
var global = getApp()
// 设置全局变量globalValue
global.globalValue = 'globalValue'

// b.js
// 访问全局变量
var global = getApp()
console.log(global.globalValue) // 输出 globalValue
```

需要注意的是，上述示例只有在 a.js 比 b.js 先执行才有效，当需要保证全局的数据可以在任何文件中安全的被使用到，那么可以在 App() 中进行设置。

```javascript
// app.js
App({
  globalData: 1
})
```

获取以及修改 global 变量的方法

```javascript
// a.js
// 获取 global 变量
var app = getApp()

// 修改 global 变量
app.globalData++  // 执行后 globalData 数值为 2
```

## 宿主环境

### 1. 渲染层和逻辑层

小程序的运行环境分成渲染层和逻辑层，WXML 模板和 WXSS 样式工作在渲染层，JS 脚本工作在逻辑层。

#### 通信模型

小程序的渲染层和逻辑层分别由2个线程管理：渲染层的界面使用了WebView 进行渲染；逻辑层采用JsCore线程运行JS脚本。一个小程序存在多个界面，所以渲染层存在多个WebView线程，这两个线程的通信会经由微信客户端（下文中也会采用Native来代指微信客户端）做中转，逻辑层发送网络请求也经由Native转发，小程序的通信模型如图所示。

![1575876747708](..\images\wxapp-communication.png)

































## 参考链接

[官方教程](https://developers.weixin.qq.com/ebook?action=get_post_info&docid=0008aeea9a8978ab0086a685851c0a)

