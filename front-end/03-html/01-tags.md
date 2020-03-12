# HTML 标签

> 2020.03.11 @wsl

## 按功能分类

### 主根元素

```html
<html>  HTML文档的根
```

### 文档元数据

元数据（Metadata）含有页面的相关信息，包括样式、脚本及数据，能帮助一些软件（如搜索引擎， 浏览器等等）更好地运用和渲染页面。对于样式和脚本的元数据，可以直接在网页里定义，也可以链接到包含相关信息的外部文件。

```html
<base> 指定用于一个文档中包含的所有相对 URL 的根 URL。一份中只能有一个 <base> 元素。
<head> 规定文档相关的配置信息（元数据），包括文档的标题，引用的文档样式和脚本等。
<link> 外部资源链接元素。
<meta> 元数据信息，（<base>, <link>, <script>, <style> 或 <title>不能表示的元数据信息）。 
<style> 样式信息。
<title> 文档标题。
```

### 分区根元素

```html
<body> 文档的内容，可以通过 document.body 属性访问body元素的脚本。
```

### 内容分区

内容分区元素允许你将文档内容从逻辑上进行组织划分。使用包括页眉(header)、页脚(footer)、导航(nav)和标题(h1~h6)等分区元素，来为页面内容创建明确的大纲，以便区分各个章节的内容。

```html
<header> 表示一组引导性的帮助，如标题、logo、搜索、作者等。
<nav>  导航。
<main> 文档<body>或应用的主体部分
<aside> 表示与其余页面无关的内容部分。
<footer> 表示最近一个章节内容或者根节点元素的页脚
<section> 表示文档中的一个区域（或节），一般会包含一个标题。
<hgroup> 代表一个段的标题
<h1>~<h6> 标题
<article> 表示文档、页面、应用或网站中的独立结构
<address> 地址信息
```

### 文本内容

使用 HTML 文本内容元素来组织在开标签`<body>`  和闭标签` </body>` 里的块或章节的内容。这些元素能标识内容的宗旨或结构，而这对于 accessibility 和 SEO 很重要。

```html
<div> 文档分区元素，通用型流内容容器
<p> 段落
<pre> 预定义格式文本
<ol> 有序列表
<ul> 无序列表
<li> 列表条目元素
<dl> 描述列表元素
<dt> 术语定义元素
<dd> 描述元素，描述列表  (<dl>) 的子元素，<dd>与 <dt> 一起用。
<figure> 代表一段独立的内容, 经常与说明(caption) <figcaption> 配合使用
<figcaption> 图片说明/标题，于描述其父节点 <figure> 元素里的其他数据
<blockquote> HTML块级引用元素
<hr>表示段落级元素之间的主题转换，视觉上看是水平线
<main> 文档<body>或应用的主体部分
<dir> 已废弃的HTML目录元素
```

### 内联文本语义

使用 HTML 内联文本语义（Inline text semantics）定义一个单词、一行内容，或任意文字的语义、结构或样式。

例如：`<a>, <b>, <br>, <code>, <em>, <q>, <s>, <span>`

### 图片和多媒体

HTML 支持各种多媒体资源，例如图像、音频和视频。

包括：`<area>, <audio>, <img>, <map>, <track>, <video>`

### 内嵌内容

除了常规的多媒体内容，HTML 可以包括各种其他的内容，即使它并不容易交互。

例如：`<iframe>, <picture>, <source>`

### 脚本

为了创建动态内容和 Web 应用程序，HTML 支持使用脚本语言，最突出的就是 JavaScript。某些元素用于支持此功能。

包括：`<canvas>, <noscript>, <script>`

### 编辑标识

这些元素能标示出某个文本被更改过的部分。

包括： `<del>, <ins>`

### 表格内容

这里的元素用于创建和处理表格数据。

包括：`<table>, <caption>, <tbody>, <th>, <tr>, <td>, <thead>, <tfoot>, <col>, <colgroup> `

### 表单

HTML 提供了许多可一起使用的元素，这些元素能用来创建一个用户可以填写并提交到网站或应用程序的表单。详情请参阅 [HTML 表单指南](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/Forms)。

例如：`<button>, <form>, <input>, <label>, <option>, <optgroup>, <select>, <textarea>`

### 交互元素

HTML 提供了一系列有助于创建交互式用户界面对象的元素。

例如：`<dialog>, <menu>, <menuitem>, <summary>`

### Web组件

Web 组件是一种与 HTML 相关联（HTML-related）的技术，简单来说，它允许开发者创建自定义元素，并如同普通的 HTML 一样使用它们。另外，也可以创建经过自定义的标准 HTML 元素。

例如：`<element>, <slot>, <template>`

### 过时的和弃用的元素

例如：`<big>, <blink>, <dir>,<font>, <shadow> ` 等等。



## 按闭合特征分类

### 闭合标签

闭合标签是指由开始标签和结束标签组成的一对标签，这种标签允许嵌套和承载内容，例如`<html>、<p>`等。

### 空标签

空标签是指没有内容的标签，在开始标签中自动闭合。常见的空标签有：`<br>、<hr>、 <img>、 <input>、 <link> <meta>`。

## 按样式分类

根据css显示分类，HTML元素可被分为三种类型：块状元素，内联元素，可变元素。

### 块级元素

块级元素是指本身的属性为`display:block`的元素。因为他自身的特点，我们通常使用块级元素来进行大布局（大结构）的搭建。

**块级元素的特点**： 

1. 每个块级元素独占一行，每个块级元素都会从新的一行开始，从上到下排布。
2. 块级元素可以直接控制宽度、高度以及盒子模型的相关css属性。
3. 在不设置宽度的情况下，块级元素的宽度是他父级元素内容的宽度。
4. 在不设置高度的情况下，块级元素的高度是他本身内容的高度。



常见的有：`<div>、<p>、<h1>...<h6>、<ol>、<ul>、<dl>、<table>、<address>、<blockquote> 、<form>`



### 内联元素

内联元素是指本身属性为`display:inline`的元素，其宽度随元素的内容而变化。因为他自身的特点，我们通常使用内联元素来进行文字、小图片（小结构）的搭建。

**内联元素的特点**： 

1. 内联元素会和其他元素从左到右显示在一行。
2. 内联元素不能直接控制宽度、高度以及盒子模型的相关css属性，但是可以设置内外边距的水平方向的值。也就是说对于内联元素的margin和padding，只有margin-left/margin-right和padding-left/padding-right是有效的，但是竖直方向的margin和padding无效果。
3. 内联元素的宽高是由内容本身的大小决定的（文字、图片等）。
4. 内联元素只能容纳文本或者其他内联元素（不要在内联元素中嵌套块级元素）。



常见的有：`<a>、<span>、<br>、<i>、<em>、<strong>、<label>、<q>、<var>、<cite>、<code>`



### 内联块级元素

内联块状元素（inline-block）就是同时具备内联元素、块状元素的特点，`display:inline-block`就是将元素设置为内联块状元素（css2.1新增）。

**内联块级元素特点**：

1、和其他元素都在一行上；

2、元素的高度、宽度、行高以及顶和底边距都可设置

常见的有：`<img>、<input>`



## 按元素本身的特点分类

### 可替换元素

可替换元素就是浏览器根据元素的标签和属性，来决定元素的具体显示内容，在其显示中生成了框。
HTML中的`<img>、<video>、<input>、<textarea>、<iframe>、<select>、<object>`都是替换元素。这些元素往往没有实际的内容，即是一个空元素。

**可替换元素**（**replaced element**）的展现效果不是由 CSS 来控制的。这些元素是一种外部对象，它们外观的渲染，是独立于 CSS 的。

简单来说，它们的内容不受当前文档的样式的影响。CSS 可以影响可替换元素的位置，但不会影响到可替换元素自身的内容。某些可替换元素，例如 [`<iframe>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe) 元素，可能具有自己的样式表，但它们不会继承父文档的样式。

Example：

```html
<img src="path/to/picture.jpg"/>
```

浏览器根据`<img>`标签的src属性的值来读取图片信息并显示出来，而如果查看HTML代码，则看不到图片的实际内容。

```html
<input type="submit" name="submit" value="提交"/>
```

浏览器根据`<input>`标签的type属性来决定是显示输入框，还是按钮。

### 不可替换元素

HTML的大多数元素是不可替换元素，即其内容直接表现在浏览器。



## 总结

- 按功能分类
  - 主根元素：`<html>`
  - 文档元数据：`<base>, <head>, <meta>, <link>, <style>, <title>`
  - 分区根元素：`<body>`
  - 内容分区：`<nav>, <header>, <main>, <footer>, <aside>, <session>, <article>, <address>,... `
  - 文本内容：`<div>, <p>, <ul>, <ol>, <li>, <dl>, <dt>, <dd>, <blockquote>...`
  - 内联文本语义：`<a>, <b>, <br>, <span>, <em>, <s>...`
  - 图片和多媒体：`<img>, <audio>, <video>, <map>...`
  - 内嵌内容：`<iframe>, <picture>, <source>...`
  - 脚本：`<canvas>, <script>, <noscript>`
  - 表格内容：`<table>, <tr>, <th>, <td>, <thead>, <tbody>, <tfoot>, <caption>...`
  - 表单：`<form>, <select>, <option>, <button>, <input>, <textarea>...`
  - 交互：`<dialog>, <menu>...`
  - web组件：`<element>, <slot>, <template>`
- 按样式分类
  - 块级元素：`<div>, <p>, <h1>~<h6>, <ul>, <ol>, <li>, <table>...`
  - 内联元素：`<a>, <b>, <em>, <s>, <span>, <br>...`
  - 内联块级元素：`<img>, <input>`
- 按闭合特征分类
  - 闭合标签：`<html>, <body>, <div>, <p>, <span>...`
  - 空标签：`<img>, <br>, <input>, <hr>, <link>, <meta>... `

- 按元素本身的特点分类
  - 可替换元素：`<img>, <video>, <input>, <textarea>...`
  - 不可替换元素：大部分都是



## 参考链接

[MDN|HTML 元素参考](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)

[html标签分类- 掘金](https://juejin.im/post/5ae412fef265da0ba266bd77)

[HTML标签分类总结- 简书](https://www.jianshu.com/p/5a78a19f18bf)

[HTML标签元素的分类（块级元素、行内元素、内联块状元素） - 简书](https://www.jianshu.com/p/3ce96819fc47)

[可替换元素- CSS（层叠样式表）| MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Replaced_element)

[替换元素和不可替换元素，块级元素和行内元素](https://www.cnblogs.com/hzj680539/p/5093702.html)