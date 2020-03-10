# 一、开发准备

> 2019.12.05 @wsl

## 1. 申请AppId

进入官方小程序简介网站 <https://mp.weixin.qq.com/cgi-bin/wx>，点击下面的注册，注册成功后，在 开发--开发设置 可以看到小程序的AppId。

## 2. 安装开发者工具

开发者工具下载页面：<https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html>，下载安装。

## 3. 开发小程序

打开小程序开发者工具，使用注册小程序所使用的微信扫码登录，选择小程序项目，创建项目，填入AppId，快速生成项目。可以选择预览，在手机端查看效果。

> 注意：不填AppId也可以进行小程序的开发，但是不能预览，小程序也不能发布。

# 二、代码组成

> 2019.12.05 @wsl

小程序由配置代码JSON文件、模板代码 WXML 文件、样式代码 WXSS文件以及逻辑代码 JavaScript文件组成。

## 1. json配置

用来进行静态配置。

## 2. WXML文件

类似HTML，页面骨架。

标签属性、变量名都是大小写敏感的。

### 数据绑定

可以进行数据绑定，需要在对应js文件中的data添加对应变量，未定义的变量或值为undefined的变量不会同步到wxml中。

语法：`{{变量名}}`

```html
<text data-test="{{test}}">时间：{{time}}</text>
```

用 `{{}}` 不仅可以进行数据动态绑定，还可以在内部进行简单的逻辑运算。如算数运算、三元运算、字符串拼接等。

### 条件逻辑

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

### 列表渲染

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

### 模板

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

### 引用

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

### 共同属性

所有wxml 标签都支持的属性称之为共同属性。

| **属性名**   | **类型**     | **描述**       | **注解**                                 |
| :----------- | :----------- | :------------- | :--------------------------------------- |
| id           | String       | 组件的唯一标识 | 整个页面唯一                             |
| class        | String       | 组件的样式类   | 在对应的 WXSS 中定义的样式类             |
| style        | String       | 组件的内联样式 | 可以动态设置的内联样式                   |
| hidden       | Boolean      | 组件是否显示   | 所有组件默认显示                         |
| data-*       | Any          | 自定义属性     | 组件上触发的事件时，会发送给事件处理函数 |
| bind*/catch* | EventHandler | 组件的事件     |                                          |

## 3. WXSS样式

类似css，页面样式。

### 尺寸单位

引入 rpx 尺寸单位，用来适配不同宽度的屏幕。

### wxss引用

小程序中，可以通过`@import './test_0.wxss'` 进行样式文件的引用。

### 内联样式

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

### 支持的选择器

| **类型**     | **选择器** | **样例**      | **样例描述**                                   |
| :----------- | :--------- | :------------ | :--------------------------------------------- |
| 类选择器     | .class     | .intro        | 选择所有拥有 class="intro" 的组件              |
| id选择器     | #id        | #firstname    | 选择拥有 id="firstname" 的组件                 |
| 元素选择器   | element    | view checkbox | 选择所有文档的 view 组件和所有的 checkbox 组件 |
| 伪元素选择器 | ::after    | view::after   | 在 view 组件后边插入内容                       |
| 伪元素选择器 | ::before   | view::before  | 在 view 组件前边插入内容                       |

### 权重计算

![1575631508225](..\images\wxss-weight.png)

### 官方样式库

微信提供了WeUI.wxss基础样式库。

WeUI是一套与微信原生视觉体验一致的基础样式库，由微信官方设计团队为微信内网页和微信小程序量身设计，令用户的使用感知更加统一。包含button、cell、dialog、progress、toast、article、actionsheet、icon等各式原生。

具体使用文档可参考：<https://github.com/Tencent/weui-wxss>

## 4. JavaScript脚本

![1575858558936](..\images\wxjs.png)

小程序中的 JavaScript 是由ECMAScript 以及小程序框架和小程序 API 来实现的。同浏览器中的JavaScript 相比没有 BOM 以及 DOM 对象，所以类似 JQuery、Zepto这种浏览器类库是无法在小程序中运行起来的，同样的缺少 Native 模块和NPM包管理的机制，小程序中无法加载原生库，也无法直接使用大部分的 NPM 包。

### 语法兼容

ES6语法兼容问题，小程序IDE提供语法转码工具帮助开发者，将 ECMAScript 6代码转为 ECMAScript 5代码，从而在所有的环境都能得到很好的执行。

开发者需要在项目设置中，勾选 ES6 转 ES5 开启此功能。

![1575859290841](..\images\wxjs-es5.png)

### 模块化

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

### 脚本的执行顺序

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

### 作用域

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

# 三、宿主环境

> 2019.12.09 @wsl

## 1. 渲染层和逻辑层

小程序的运行环境分成渲染层和逻辑层，WXML 模板和 WXSS 样式工作在渲染层，JS 脚本工作在逻辑层。

### 通信模型

小程序的渲染层和逻辑层分别由2个线程管理：渲染层的界面使用了WebView 进行渲染；逻辑层采用JsCore线程运行JS脚本。一个小程序存在多个界面，所以渲染层存在多个WebView线程，这两个线程的通信会经由微信客户端（下文中也会采用Native来代指微信客户端）做中转，逻辑层发送网络请求也经由Native转发，小程序的通信模型如图所示。

![1575876747708](..\images\wxapp-communication.png)

### 数据驱动

在开发UI界面过程中，程序需要维护很多变量状态，同时要操作对应的UI元素。随着界面越来越复杂，我们需要维护很多变量状态，同时要处理很多界面上的交互事件，整个程序变得越来越复杂。通常界面视图和变量状态是相关联的，如果有某种“方法”可以让状态和视图绑定在一起（状态变更时，视图也能自动变更），那我们就可以省去手动修改视图的工作。
这个方法就是“数据驱动”。（其实就是MVVM的思想）

![1575882300520](..\images\wxapp-mvvm.png)

WXML（Dom树）-->    JS对象（VNode） -->  渲染真正的Dom树

通过setData方法修改VNode中的数据，产生产生的JS对象对应的节点就会发生变化，此时可以对比前后两个JS对象得到变化的部分，然后把这个差异应用到原来的Dom树上，从而达到更新UI的目的，这就是“数据驱动”的原理。

![1575882359501](..\images\wxapp-mvvm-02.png)

### 双线程下的界面渲染

小程序的逻辑层和渲染层是分开的两个线程。在渲染层，宿主环境会把WXML转化成对应的JS对象，在逻辑层发生数据变更的时候，我们需要通过宿主环境提供的setData方法把数据从逻辑层传递到渲染层，再经过对比前后差异，把差异应用在原来的Dom树上，渲染出正确的UI界面，如图所示。

![1575882850114](..\images\wxapp-mvvm-03.png)

## 2. 程序与页面

从逻辑组成来说，一个小程序是由多个“页面”组成的“程序”。这里要区别一下“小程序”和“程序”的概念，往往我们需要在“程序”启动或者退出的时候存储数据或者在“页面”显示或者隐藏的时候做一些逻辑处理，了解程序和页面的概念以及它们的生命周期是非常重要的。

### 程序

“小程序”指的是产品层面的程序，而“程序”指的是代码层面的程序实例。

#### 程序构造器App()

宿主环境提供了 `App()` 构造器用来注册一个程序App。注意，App() 构造器必须写在项目根目录的**app.js**里，App实例是单例对象，在其他JS脚本中可以使用宿主环境提供的 `getApp() `来获取程序实例。

```javascript
App({
  onLaunch: function(options) {},
  onShow: function(options) {},
  onHide: function() {},
  onError: function(msg) {},
  globalData: 'I am global data'
})
```

App构造器的参数：

| 参数属性 | 类型     | 描述                                                         |
| :------- | :------- | :----------------------------------------------------------- |
| onLaunch | Function | 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）      |
| onShow   | Function | 当小程序启动，或从后台进入前台显示，会触发 onShow            |
| onHide   | Function | 当小程序从前台进入后台，会触发 onHide                        |
| onError  | Function | 当小程序发生脚本错误，或者 API 调用失败时，会触发 onError 并带上错误信息 |
| 其他字段 | 任意     | 可以添加任意的函数或数据到 Object 参数中，在App实例回调用 this 可以访问 |

#### 程序的生命周期和打开场景

**生命周期**

- onLaunch：初次进入小程序的时候，微信客户端初始化好宿主环境，同时从网络下载或者从本地缓存中拿到小程序的代码包，把它注入到宿主环境，初始化完毕后，微信客户端就会给App实例派发onLaunch事件，App构造器参数所定义的onLaunch方法会被调用。
- onHide：进入小程序之后，用户可以点击右上角的关闭，或者按手机设备的Home键离开小程序，此时小程序并没有被直接销毁，我们把这种情况称为“小程序进入后台状态”，App构造器参数所定义的onHide方法会被调用。
- onShow：当再次回到微信或者再次打开小程序时，微信客户端会把“后台”的小程序唤醒，我们把这种情况称为“小程序进入前台状态”，App构造器参数所定义的onShow方法会被调用。

**打开场景**

打开场景有很多，如群聊会话里打开，从小程序列表中打开，通过微信扫一扫二维码打开等，针对不同途径的打开方式，小程序有时需要做不同的业务处理，所以微信客户端会把打开方式带给onLaunch和onShow的调用参数options。参见：[注册小程序](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/app-service/app.html)，[onLaunch,onShow参数](https://developers.weixin.qq.com/miniprogram/dev/api/base/app/life-cycle/wx.getLaunchOptionsSync.html)。

#### 小程序全局数据

小程序的JS脚本是运行在JsCore的线程里，小程序的每个页面各自有一个WebView线程进行渲染，所以小程序切换页面时，小程序逻辑层的JS脚本运行上下文依旧在同一个JsCore线程中。

由于App实例是单例的，因此不同页面直接可以通过App实例下的属性来共享数据。App构造器可以传递其他参数作为全局属性以达到全局共享数据的目的。

```javascript
// app.js
App({
  globalData: 'I am global data' // 全局共享数据
})
// 其他页面脚本other.js
var appInstance = getApp()
console.log(appInstance.globalData) // 输出: I am global data
```

> 注意，所有页面的脚本逻辑都跑在同一个JsCore线程，页面使用setTimeout或者setInterval的定时器，然后跳转到其他页面时，这些定时器并没有被清除，需要在页面离开的时候进行清理。

### 页面

一个小程序可以有很多页面，每个页面承载不同的功能，页面之间可以互相跳转。

#### 文件构成和路径

一个页面是分三部分组成：界面、配置和逻辑。界面由WXML文件和WXSS文件来负责描述，配置由JSON文件进行描述，页面逻辑则是由JS脚本文件负责。一个页面的文件需要放置在同一个目录下，其中WXML文件和JS文件是必须存在的，JSON和WXSS文件是可选的。

页面路径需要在小程序代码根目录app.json中的pages字段声明，否则这个页面不会被注册到宿主环境中。

```json
{
  "pages":[
    "pages/index/page", // 第一项默认为首页
    "pages/other/other"
  ]
}
```

#### 页面构造器Page()

宿主环境提供了 Page() 构造器用来注册一个小程序页面，Page()在页面脚本page.js中调用，Page() 的调用方式如下所示。Page构造器接受一个Object参数，其中data属性是当前页面WXML模板中可以用来做数据绑定的初始数据；onLoad / onReady / onShow / onHide /onUnload 5个回调是Page实例的生命周期函数；onPullDownRefresh / onReachBottom / onShareAppMessage / onPageScroll 4个回调是页面的用户行为。

```javascript
Page({
  data: { text: "This is page data." }, // 页面数据
  onLoad: function(options) { }, // Page实例的生命周期函数
  onReady: function() { },
  onShow: function() { },
  onHide: function() { },
  onUnload: function() { },
  onPullDownRefresh: function() { }, // 页面的用户行为
  onReachBottom: function() { },
  onShareAppMessage: function () { },
  onPageScroll: function() { }
})
```

Page构造器的参数：

| 参数属性          | 类型     | 描述                                                         |
| :---------------- | :------- | :----------------------------------------------------------- |
| data              | Object   | 页面的初始数据                                               |
| onLoad            | Function | 生命周期函数--监听页面加载，触发时机早于onShow和onReady，生命周期内只会触发一次 |
| onShow            | Function | 生命周期函数--监听页面显示，触发事件早于onReady，从别的页面返回到当前页面时也会触发 |
| onReady           | Function | 生命周期函数--监听页面初次渲染完成，只触发一次，表示页面已经准备妥当，在逻辑层就可以和视图层进行交互了。 |
| onHide            | Function | 生命周期函数--监听页面隐藏，这种情况会在使用wx.navigateTo切换到其他页面、底部tab切换时触发。 |
| onUnload          | Function | 生命周期函数--监听页面卸载，当前页面使用wx.redirectTo或wx.navigateBack返回到其他页时，当前页面会被微信客户端销毁回收，触发此事件。 |
| onPullDownRefresh | Function | 页面相关事件处理函数--监听用户下拉动作                       |
| onReachBottom     | Function | 页面上拉触底事件的处理函数                                   |
| onShareAppMessage | Function | 用户点击右上角转发                                           |
| onPageScroll      | Function | 页面滚动触发事件的处理函数                                   |
| 其他              | Any      | 可以添加任意的函数或数据，在Page实例的其他函数中用 this 可以访问 |

生命周期：

onLoad、onShow、onReady、onHide、onUnload

页面的打开参数query：

小程序把页面的打开路径定义成页面URL，其组成格式和网页的URL类似，在页面路径后**使用英文 ? 分隔path和query部分，query部分的多个参数使用 & 进行分隔，参数的名字和值使用 key=value 的形式声明**。在页面Page构造器里**onLoad的option可以拿到当前页面的打开参数**，其类型是一个Object，其键值对与页面URL上query键值对一一对应。和网页URL一样，页面URL上的value如果涉及特殊字符（例如：&字符、?字符、中文字符等，详情参考URI的RFC3986说明 ），需要采用UrlEncode后再拼接到页面URL上。

```javascript
// pages/list/list.js
// 列表页使用navigateTo跳转到详情页
wx.navigateTo({ url: 'pages/detail/detail?id=1&other=abc' })

// pages/detail/detail.js
Page({
  onLoad: function(option) {
        console.log(option.id)
        console.log(option.other)
  }
})
```

#### 页面的数据

小程序的页面结构由WXML进行描述，WXML可以通过数据绑定的语法绑定从逻辑层传递过来的数据字段，这里所说的数据其实就是来自于**页面Page构造器的data字段**，data参数是页面第一次渲染时从逻辑层传递到渲染层的数据。

```html
<!-- page.wxml -->
<view>{{text}}</view>
<view>{{array[0].msg}}</view>
```

```javascript
// page.js
Page({
  data: {
    text: 'init data',
    array: [{msg: '1'}, {msg: '2'}]
  }
})
```

宿主环境所提供的Page实例的原型中有setData函数，我们**可以在Page实例下的方法调用this.setData把数据传递给渲染层，从而达到更新界面的目的**。由于小程序的渲染层和逻辑层分别在两个线程中运行，所以setData传递数据实际是一个异步的过程，所以setData的第二个参数是一个callback回调，在这次setData对界面渲染完毕后触发。

setData其一般**调用格式是 setData(data, callback)**，其中data是由多个key: value构成的Object对象。

```javascript
// page.js
Page({
  onLoad: function(){
    this.setData({
      text: 'change data'
    }, function(){
      // 在这次setData对界面渲染完毕后触发
    })
  }
})
```

实际在开发的时候，页面的data数据会涉及相当多的字段，你并不需要每次都将整个data字段重新设置一遍，你只需要把改变的值进行设置即可，宿主环境会自动把新改动的字段合并到渲染层对应的字段中。

data中的key还可以非常灵活，以数据路径的形式给出，例如 ` this.setData({"d[0]": 100}); this.setData({"d[1].text": 'Goodbye'}); `

我们只要保持一个原则就可以提高小程序的渲染性能：**每次只设置需要改变的最小单位数据**。

此外需要注意以下3点：

1. 直接修改 Page实例的this.data 而不调用 this.setData 是无法改变页面的状态的，还会造成数据不一致。
2. 由于setData是需要两个线程的一些通信消耗，为了提高性能，每次设置的数据不应超过1024kB。
3. 不要把data中的任意一项的value设为undefined，否则可能会有引起一些不可预料的bug。

#### 页面的用户行为

小程序宿主环境提供了四个和页面相关的用户行为回调：

1. 下拉刷新 onPullDownRefresh
   监听用户下拉刷新事件，需要在app.json的window选项中或页面配置page.json中设置enablePullDownRefresh为true。当处理完数据刷新后，wx.stopPullDownRefresh可以停止当前页面的下拉刷新。
2. 上拉触底 onReachBottom
   监听用户上拉触底事件。可以在app.json的window选项中或页面配置page.json中设置触发距离onReachBottomDistance。在触发距离内滑动期间，本事件只会被触发一次。
3. 页面滚动 onPageScroll
   监听用户滑动页面事件，参数为 Object，包含 scrollTop 字段，表示页面在垂直方向已滚动的距离（单位px）。
4. 用户转发 onShareAppMessage
   只有定义了此事件处理函数，右上角菜单才会显示“转发”按钮，在用户点击转发按钮的时候会调用，此事件需要return一个Object，包含title和path两个字段，用于自定义转发内容。

```javascript
// page.js
Page({
onShareAppMessage: function () {
 return {
   title: '自定义转发标题',
   path: '/page/user?id=123'
 }
}
})
```

#### 页面跳转和路由

一个小程序拥有多个页面，我们可以通过wx.navigateTo推入一个新的页面，我们把这样的一个页面层级称为页面栈。小程序宿主环境限制了这个页面栈的最大层级为10层。

- wx.navigateTo({ url: 'pageD' }) ：往当前页面栈多推入一个 pageD，pageD在栈的最顶层。
- wx.navigateBack() ：可以退出当前页面栈的最顶上页面。
- wx.redirectTo({ url: 'pageE' }) ：替换当前页变成pageE，当页面栈到达10层没法再新增的时候，往往就是使用redirectTo这个API进行页面跳转。

小程序提供了原生的Tabbar支持，我们可以在app.json声明tabBar字段来定义Tabbar页。

app.json定义小程序底部tab

```json
{
  "tabBar": {
    "list": [
      { "text": "Tab1", "pagePath": "pageA" },
      { "text": "Tab1", "pagePath": "pageF" },
      { "text": "Tab1", "pagePath": "pageG" }
    ]
  }
}
```

我们可以在当前所在的页面栈中使用wx.switchTab({ url: 'pageF' })，此时原来的页面栈会被清空（除了已经声明为Tabbar页pageA外其他页面会被销毁），然后会切到pageF所在的tab页面，页面栈变成 [ pageF ]，此时点击Tab1切回到pageA时，pageA不会再触发onLoad，因为pageA没有被销毁。

补充一下，wx.navigateTo和wx.redirectTo只能打开非TabBar页面，wx.switchTab只能打开Tabbar页面。
我们还可以使用 wx. reLaunch({ url: 'pageH' }) 重启小程序，并且打开pageH，此时页面栈为 [ pageH ]。

### 组件

一个小程序页面可以分解成多个部分组成，组件就是小程序页面的基本组成单元。为了让开发者可以快速进行开发，小程序的宿主环境提供了一系列基础组件。

组件是在WXML模板文件声明中使用的，WXML的语法和HTML语法相似，小程序使用标签名来引用一个组件，通常包含开始标签和结束标签，该标签的属性用来描述该组件。

需要注意，所有组件名和属性都是小写，多个单词会以英文横杠 "-" 进行连接。

对于一些容器组件，其内容可以声明在其开始标签和结束标签之间。

容器组件嵌套其他组件

```html
<!-- page.wxml -->
<view>
  <image mode="scaleToFill" src="img.png"></image>
  <view>
    <view>1</view>
    <view>2</view>
    <view>3</view>
  </view>
</view>
```

组件共有属性

| 属性名         | 类型         | 描述           | 其他说明                                 |
| :------------- | :----------- | :------------- | :--------------------------------------- |
| id             | String       | 组件的唯一标示 | 保持整个页面唯一                         |
| class          | String       | 组件的样式类   | 在对应的WXSS中定义的样式类               |
| style          | String       | 组件的内联样式 | 可以通过数据绑定进行动态设置的内联样式   |
| hidden         | Boolean      | 组件是否显示   | 所有组件默认显示                         |
| data-*         | Any          | 自定义属性     | 组件上触发的事件时，会发送给事件处理函数 |
| bind */ catch* | EventHandler | 事件           | 详情后面的事件                           |

### API

宿主环境提供了丰富的API，可以很方便调起微信提供的能力。wx对象实际上就是小程序的宿主环境所提供的全局对象，几乎所有小程序的API都挂载在wx对象底下（除了Page/App等特殊的构造器）。

小程序提供的API按照功能主要分为几大类：网络、媒体、文件、数据缓存、位置、设备、界面、界面节点信息还有一些特殊的开放接口，我们介绍一下API一般调用的约定：

1. wx.on* 开头的 API 是监听某个事件发生的API接口，接受一个 Callback 函数作为参数。当该事件触发时，会调用 Callback 函数。
2. 如未特殊约定，多数 API 接口为异步接口 ，都接受一个Object作为参数。
3. API的Object参数一般由success、fail、complete三个回调来接收接口调用结果。
4. wx.get* 开头的API是获取宿主环境数据的接口。
5. wx.set* 开头的API是写入数据到宿主环境的接口。

例子：通过wx.request发起网络请求

```javascript
wx.request({
url: 'test.php',
data: {},
header: { 'content-type': 'application/json' },
success: function(res) {
 // 收到https服务成功后返回
 console.log(res.data)
},
fail: function() {
 // 发生网络错误等情况触发
},
complete: function() {
 // 接口调用结束的回调函数，成功或者失败后都会触发
}
})
```

官方API文档： <https://mp.weixin.qq.com/debug/wxadoc/dev/api/>

### 事件

小程序里，把“用户在渲染层的行为反馈”以及“组件的部分状态反馈”抽象为渲染层传递给逻辑层的“事件”，通知给开发者做相应的逻辑处理。

```html
<!-- page.wxml -->
<view id="tapTest" data-hi="WeChat" bindtap="tapName"> Click me! </view>
```

```javascript
// page.js
Page({
  tapName: function(event) {
    console.log(event)
  }
})
```

事件是通过bindtap这个属性绑定在组件上的，同时在当前页面的Page构造器中定义对应的事件处理函数tapName，当用户点击该view区域时，达到触发条件生成事件tap，该事件处理函数tapName会被执行，同时还会收到一个事件对象event。

#### 事件类型和事件对象

 常见的事件类型

| 类型               | 触发条件                                                     |
| :----------------- | :----------------------------------------------------------- |
| touchstart         | 手指触摸动作开始                                             |
| touchmove          | 手指触摸后移动                                               |
| touchcancel        | 手指触摸动作被打断，如来电提醒，弹窗                         |
| touchend           | 手指触摸动作结束                                             |
| tap                | 手指触摸后马上离开                                           |
| longpress          | 手指触摸后，超过350ms再离开，如果指定了事件回调函数并触发了这个事件，tap事件将不被触发 |
| longtap            | 手指触摸后，超过350ms再离开（推荐使用longpress事件代替）     |
| transitionend      | 会在 WXSS transition 或 wx.createAnimation 动画结束后触发    |
| animationstart     | 会在一个 WXSS animation 动画开始时触发                       |
| animationiteration | 会在一个 WXSS animation 一次迭代结束时触发                   |
| animationend       | 会在一个 WXSS animation 动画完成时触发                       |

当事件回调触发的时候，会收到一个事件对象，对象的详细属性如下表所示。

| 属性           | 类型    | 说明                                         |
| :------------- | :------ | :------------------------------------------- |
| type           | String  | 事件类型                                     |
| timeStamp      | Integer | 页面打开到触发事件所经过的毫秒数             |
| target         | Object  | 触发事件的组件的一些属性值集合               |
| currentTarget  | Object  | 当前组件的一些属性值集合                     |
| detail         | Object  | 额外的信息                                   |
| touches        | Array   | 触摸事件，当前停留在屏幕中的触摸点信息的数组 |
| changedTouches | Array   | 触摸事件，当前变化的触摸点信息的数组         |

这里需要注意的是target和currentTarget的区别，currentTarget为当前事件所绑定的组件，而target则是触发该事件的源头组件。

例子：

```html
<!-- page.wxml -->
<view id="outer" catchtap="handleTap">
  <view id="inner">点击我</view>
</view>
```

```javascript
// page.js
Page({
  handleTap: function(evt) {
       // 当点击inner节点时
       // evt.target 是inner view组件
       // evt.currentTarget 是绑定了handleTap的outer view组件
       // evt.type == “tap”
       // evt.timeStamp == 1542
       // evt.detail == {x: 270, y: 63}
       // evt.touches == [{identifier: 0, pageX: 270, pageY: 63, clientX: 270, clientY: 63}]
       // evt.changedTouches == [{identifier: 0, pageX: 270, pageY: 63, clientX: 270, clientY: 63}]
  }
})
```

target和currentTarget事件对象属性

| 属性    | 类型   | 说明                                        |
| :------ | :----- | :------------------------------------------ |
| id      | String | 当前组件的id                                |
| tagName | String | 当前组件的类型                              |
| dataset | Object | 当前组件上由data-开头的自定义属性组成的集合 |

touch和changedTouches对象属性

| 属性             | 类型   | 说明                                                         |
| :--------------- | :----- | :----------------------------------------------------------- |
| identifier       | Number | 触摸点的标识符                                               |
| pageX, pageY     | Number | 距离文档左上角的距离，文档的左上角为原点 ，横向为X轴，纵向为Y轴 |
| clientX, clientY | Number | 距离页面可显示区域（屏幕除去导航条）左上角距离，横向为X轴，纵向为Y轴 |

#### 事件绑定与冒泡捕获

事件绑定的写法和组件属性一致，以key="value"的形式，其中：

1. key以bind或者catch开头，然后跟上事件的类型，如bindtap、catchtouchstart。自基础库版本1.5.0起，bind和catch后可以紧跟一个冒号，其含义不变，如bind:tap、catch:touchstart。同时bind和catch前还可以加上capture-来表示捕获阶段。
2. value是一个字符串，需要在对应的页面Page构造器中定义同名的函数，否则触发事件时在控制台会有报错信息。
   bind*和capture-bind*的含义分别代表事件的冒泡阶段和捕获阶段，其触发的顺序如图所示。

![1575948175560](..\images\wxapp-event-bind.png)

以下示例中，点击 inner view 会先后调用handleTap2、handleTap4、handleTap3、handleTap1。

```html
<view
  id="outer"
  bind:touchstart="handleTap1"
  capture-bind:touchstart="handleTap2"
>
  outer view
  <view
    id="inner"
    bind:touchstart="handleTap3"
    capture-bind:touchstart="handleTap4"
  >
    inner view
  </view>
</view>
```

bind事件绑定不会阻止冒泡事件向上冒泡，catch事件绑定可以阻止冒泡事件向上冒泡。如果将上面代码中的第一个capture-bind改为capture-catch，将只触发handleTap2（capture-catch将中断捕获阶段和取消冒泡阶段）。

>  注意，除之前列举的常见事件类型之外的其他组件自定义事件，如无特殊声明都是非冒泡事件，如`<form/>`的submit事件，`<input/>`的input事件，`<scroll-view/>`的scroll事件。

### 兼容

可能需要针对不同手机进行程序上的兼容，此时可以使用 wx.getSystemInfo 或者 wx.getSystemInfoSync 来获取手机品牌、操作系统版本号、微信版本号以及小程序基础库版本号等，通过这个信息，我们可以针对不同平台做差异化的服务。

```javascript
wx.getSystemInfoSync()
/*
  {
    brand: "iPhone",      // 手机品牌
    model: "iPhone 6",    // 手机型号
    platform: "ios",      // 客户端平台
    system: "iOS 9.3.4",  // 操作系统版本
    version: "6.5.23",    // 微信版本号
    SDKVersion: "1.7.0",  // 小程序基础库版本
    language: "zh_CN",    // 微信设置的语言
    pixelRatio: 2,        // 设备像素比
    screenWidth: 667,    // 屏幕宽度
    screenHeight: 375,     // 屏幕高度
    windowWidth: 667,    // 可使用窗口宽度
    windowHeight: 375,     // 可使用窗口高度
    fontSizeSetting: 16   // 用户字体大小设置
  }
 */
```

随着宿主环境的更新，新版本的宿主环境会提供一些新的API，可以通过判断此API是否存在来做程序上的兼容。

```javascript
if (wx.openBluetoothAdapter) {
  wx.openBluetoothAdapter()
} else {
  // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
  wx.showModal({
    title: '提示',
    content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
  })
}
```

小程序还提供了wx.canIUse这个API，用于判断接口或者组件在当前宿主环境是否可用，其参数格式为: `${API}.${method}.${param}.${options}或者${component}.${attribute}.${option}`
各个段的含义如下：

- ${API} 代表 API 名字
- ${method} 代表调用方式，有效值为return, success, object, callback
- ${param} 代表参数或者返回值
- ${options} 代表参数的可选值
- ${component} 代表组件名字
- ${attribute} 代表组件属性
- ${option} 代表组件属性的可选值
  调用的示例代码如下。

```javascript
// 判断接口及其参数在宿主环境是否可用
wx.canIUse('openBluetoothAdapter')
wx.canIUse('getSystemInfoSync.return.screenWidth')
wx.canIUse('getSystemInfo.success.screenWidth')
wx.canIUse('showToast.object.image')
wx.canIUse('onCompassChange.callback.direction')
wx.canIUse('request.object.method.GET')

 // 判断组件及其属性在宿主环境是否可用
wx.canIUse('contact-button')
wx.canIUse('text.selectable')
wx.canIUse('button.open-type.contact')
```

在不得已的情况下（小程序强依赖某个新的API或者组件时），还可以通过在小程序管理后台设置“基础库最低版本设置”来达到不向前兼容的目的。例如你选择设置你的小程序只支持1.5.0版本以上的宿主环境，那么当运行着1.4.0版本宿主环境的微信用户打开你的小程序的时候，微信客户端会显示当前小程序不可用，并且提示用户应该去升级微信客户端。

# 四、场景应用

> 2019.12.10 @wsl

## 1. 基本的布局方法——Flex布局

如果小程序要求兼容到iOS8以下版本，需要开启样式自动补全。开启样式自动补全，在“设置”—“项目设置”—勾选“上传代码时样式自动补全”。

**Flex布局可以参考笔记 /front-end/02-css/01-flex.md**

emmm，小程序的flex布局有些需要注意的点，如下：

justify-content 属性，多了个space-evenly的取值。

- space-evenly：项目间间距、第一个项目离主轴起点和最后一个项目离主轴终点距离等于项目间间距。

![1575959395630](..\images\wxapp-flex-justify-content.png)

同理，align-content属性，也多了个space-evenly的取值。

- space-evenly：行间间距、以及首行离交叉轴起点和尾行离交叉轴终点距离相等。

![1575960356149](..\images\wxapp-flex-align-content.png)

![1575960417413](..\images\wxapp-flex-align-content-2.png)

**flex-basis 属性**

当容器设置flex-direction为row或row-reverse时，flex-basis和width同时存在，flex-basis优先级高于width，也就是此时flex-basis代替项目的width属性。

当容器设置flex-direction为column或column-reverse时，flex-basis和height同时存在，flex-basis优先级高于height，也就是此时flex-basis代替项目的height属性。

需要注意的是，当flex-basis和width（或height），其中一个属性值为auto时，非auto的优先级更高。

## 2. 界面常见的交互反馈

### 触摸反馈

通常页面会摆放一些button按钮或者view区域，用户触摸按钮之后会触发下一步的操作。这种情况下，我们要对触摸这个行为给予用户一些响应。比如对应的区域底色白色变成浅灰色。

![1575962644947](..\images\wxapp-touch.png)

小程序的view容器组件和button组件提供了hover-class属性，触摸时会往该组件加上对应的class改变组件的样式。

```css
/*page.wxss */
.hover{
  background-color: gray;
}
```

```html
<!--page.wxml -->
<button hover-class="hover"> 点击button </button>
<view hover-class="hover"> 点击view</view>
```

对于用户的操作及时响应是非常优秀的体验，有时候在点击button按钮处理更耗时的操作时，我们也会使用button组件的loading属性，在按钮的文字前边出现一个Loading，让用户明确的感觉到，这个操作会比较耗时，需要等待一小段时间。

![1575962694240](..\images\wxapp-loading.png)

```html
<!--page.wxml -->
<button loading="{{loading}}" bindtap="tap">操作</button>
```

```javascript
//page.js
Page({
  data: { loading: false },
  tap: function() {
    // 把按钮的loading状态显示出来
    this.setData({
      loading: true
    })
    // 接着做耗时的操作
  }
})
```

### Toast和模态对话框

小程序提供了显示隐藏Toast的接口，代码示例如下所示。

```javascript
Page({
  onLoad: function() {
    wx.showToast({ // 显示Toast
      title: '已发送',
      icon: 'success',
      duration: 1500
    })
    // wx.hideToast() // 隐藏Toast
  }
})
```

![1575962733867](..\images\wxapp-toast.png)

特别要注意，我们不应该把Toast用于错误提示，因为错误提示需要明确告知用户具体原因，因此不适合用这种一闪而过的Toast弹出式提示。一般需要用户明确知晓操作结果状态的话，会使用模态对话框来提示，同时附带下一步操作的指引。

![1575962768394](..\images\wxapp-hint.png)

```javascript
Page({
  onLoad: function() {
    wx.showModal({
      title: '标题',
      content: '告知当前状态，信息和解决方法',
      confirmText: '主操作',
      cancelText: '次要操作',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击主操作')
        } else if (res.cancel) {
          console.log('用户点击次要操作')
        }
      }
    })
  }
})
```

### 界面滚动

下拉刷新：

宿主环境提供了统一的下拉刷新交互，开发者只需要通过配置开启当前页面的下拉刷新，用户往下拉动界面触发下拉刷新操作时，Page构造器的onPullDownRefresh回调会被触发，此时开发者重新拉取新数据进行渲染，实例代码如下所示。

```json
//page.json
{"enablePullDownRefresh": true }
```

```javascript
//page.js
Page({
  onPullDownRefresh: function() {
    // 用户触发了下拉刷新操作
    // 拉取新数据重新渲染界面
    // wx.stopPullDownRefresh() // 可以停止当前页面的下拉刷新。
  }
})
```

上拉触底：

```json
//page.json
// 界面的下方距离页面底部距离小于onReachBottomDistance像素时触发onReachBottom回调
{"onReachBottomDistance": 100 }
```

```javascript
//page.js
Page({
  onReachBottom: function() {
    // 当界面的下方距离页面底部距离小于100像素时触发回调
  }
})
```

些时候并不想整个页面进行滚动，而是页面中某一小块区域需要可滚动，此时就要用到宿主环境所提供的scroll-view可滚动视图组件。可以通过组件的scroll-x和scroll-y属性决定滚动区域是否可以横向或者纵向滚动，scroll-view组件也提供了丰富的滚动回调触发事件，详见scroll-view组件的官方文档。

## 3. 发起HTTPS网络通信

小程序经常需要往服务器传递数据或者从服务器拉取信息，这个时候可以使用wx.request这个API。

```javascript
wx.request({
  url: 'https://test.com/getinfo',
  success: function(res) {
    console.log(res)// 服务器回包信息
  }
})
```

wx.request详细参数

| **参数名** | **类型**      | **必填** | **默认值** | **描述**                                                     |
| :--------- | :------------ | :------- | :--------- | :----------------------------------------------------------- |
| url        | String        | 是       |            | 开发者服务器接口地址                                         |
| data       | Object/String | 否       |            | 请求的参数                                                   |
| header     | Object        | 否       |            | 设置请求的 header，header 中不能设置 Referer，默认header['content-type'] = 'application/json' |
| method     | String        | 否       | GET        | （需大写）有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT |
| dataType   | String        | 否       | json       | 回包的内容格式，如果设为json，会尝试对返回的数据做一次 JSON解析 |
| success    | Function      | 否       |            | 收到开发者服务成功返回的回调函数，其参数是一个Object，见表4-2。 |
| fail       | Function      | 否       |            | 接口调用失败的回调函数                                       |
| complete   | Function      | 否       |            | 接口调用结束的回调函数（调用成功、失败都会执行）             |

url参数是当前发起请求的服务器接口地址，小程序宿主环境要求request发起的网络请求**必须是https协议请求**，因此开发者服务器必须提供HTTPS服务的接口，同时为了保证小程序不乱用任意域名的服务，wx.request**请求的域名需要在小程序管理平台进行配置**，如果小程序正式版使用wx.request请求未配置的域名，在控制台会有相应的报错。

一般我们在开发阶段时，处于开发阶段的服务器接口还没部署到现网的域名下，经常会通过另一个域名来进行开发调试，考虑到这一点，为了方便开发者进行开发调试，开发者工具、小程序的开发版和小程序的体验版在某些情况下允许wx.request请求任意域名。

### 返回参数

通过wx.request发送请求后，服务器处理请求并返回HTTP包，小程序端收到回包后会触发success回调，同时回调会带上一个Object信息，详细参数如下所示。

wx.request的success返回参数

| **参数名** | **类型**      | **描述**                                |
| :--------- | :------------ | :-------------------------------------- |
| data       | Object/String | 开发者服务器返回的数据                  |
| statusCode | Number        | 开发者服务器返回的 HTTP 状态码          |
| header     | Object        | 开发者服务器返回的 HTTP Response Header |

> 注意，只要成功收到服务器返回，无论HTTP状态码是多少都会进入success回调。

### 设置请求超时时间

在小程序项目根目录里边的app.json可以指定request的超时时间。

```javascript
// app.json
{
  "networkTimeout": {
    "request": 3000
  }
}
```

### 排查异常的方法

在使用wx.request接口我们会经常遇到无法发起请求或者服务器无法收到请求的情况，我们罗列排查这个问题的一般方法：

1. 检查手机网络状态以及wifi连接点是否工作正常。
2. 检查小程序是否为开发版或者体验版，因为开发版和体验版的小程序不会校验域名。
3. 检查对应请求的HTTPS证书是否有效，同时TLS的版本必须支持1.2及以上版本，可以在开发者工具的console面板输入showRequestInfo()查看相关信息。
4. 域名不要使用IP地址或者localhost，并且不能带端口号，同时域名需要经过ICP备案。
5. 检查app.json配置的超时时间配置是否太短，超时时间太短会导致还没收到回报就触发fail回调。
6. 检查发出去的请求是否302到其他域名的接口，这种302的情况会被视为请求别的域名接口导致无法发起请求。

## 4. 微信登录

微信登录的整个过程：

![1576048564579](..\images\wxapp-login.png)

## 5. 本地数据缓存

小程序提供了读写本地数据缓存的接口，通过wx.getStorage/wx.getStorageSync读取本地缓存，通过wx.setStorage/wx.setStorageSync写数据到缓存，其中Sync后缀的接口表示是同步接口，执行完毕之后会立马返回，示例代码和参数说明如下所示。

```javascript
wx.getStorage({
  key: 'key1',
  success: function(res) {
    // 异步接口在success回调才能拿到返回值
    var value1 = res.data
  },
  fail: function() {
    console.log('读取key1发生错误')
  }
})

try{
  // 同步接口立即返回值
  var value2 = wx.getStorageSync('key2')
}catch (e) {
  console.log('读取key2发生错误')
}

// 异步接口在success/fail回调才知道写入成功与否
wx.setStorage({
  key:"key",
  data:"value1"
  success: function() {
    console.log('写入value1成功')
  },
  fail: function() {
    console.log('写入value1发生错误')
  }
})

try{
  // 同步接口立即写入
  wx.setStorageSync('key', 'value2')
  console.log('写入value2成功')
}catch (e) {
  console.log('写入value2发生错误')
}
```

wx.getStorage/wx.getStorageSync详细参数

| **参数名** | **类型** | **必填** | **描述**                                                     |
| :--------- | :------- | :------- | :----------------------------------------------------------- |
| key        | String   | 是       | 本地缓存中指定的 key                                         |
| success    | Function | 否       | 异步接口调用成功的回调函数，回调参数格式: {data: key对应的内容} |
| fail       | Function | 否       | 异步接口调用失败的回调函数                                   |
| complete   | Function | 否       | 异步接口调用结束的回调函数（调用成功、失败都会执行）         |

wx.setStorage/wx.setStorageSync详细参数

| **参数名** | **类型**      | **必填** | **描述**                                             |
| :--------- | :------------ | :------- | :--------------------------------------------------- |
| key        | String        | 是       | 本地缓存中指定的 key                                 |
| data       | Object/String | 是       | 需要存储的内容                                       |
| success    | Function      | 否       | 异步接口调用成功的回调函数                           |
| fail       | Function      | 否       | 异步接口调用失败的回调函数                           |
| complete   | Function      | 否       | 异步接口调用结束的回调函数（调用成功、失败都会执行） |

### 缓存限制和隔离

小程序宿主环境会管理不同小程序的数据缓存，不同小程序的本地缓存空间是分开的，每个小程序的缓存空间上限为10MB，如果当前缓存已经达到10MB，再通过wx.setStorage写入缓存会触发fail回调。

小程序的本地缓存不仅仅通过小程序这个维度来隔离空间，考虑到同一个设备可以登录不同微信用户，宿主环境还对不同用户的缓存进行了隔离，避免用户间的数据隐私泄露。



## 参考链接

[官方简介](https://mp.weixin.qq.com/cgi-bin/wx)

[开发文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)

[官方教程](https://developers.weixin.qq.com/ebook?action=get_post_info&docid=0008aeea9a8978ab0086a685851c0a)

[菜鸟|参考合集](https://www.runoob.com/w3cnote/wx-xcx-repo.html)
