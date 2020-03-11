# HTML

#### 1. 写出你了解的 HTML 标签，并把他们分一下类。

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



#### 2. i vs em？strong vs b？

**HTML元素 `<i>`** 用于表现因某些原因需要区分普通文本的一系列文本。例如技术术语、外文短语或是小说中人物的思想活动等，它的内容通常以斜体显示。

**HTML 着重元素 `<em>`** 标记出需要用户着重阅读的内容， `<em>` 元素是可以嵌套的，嵌套层次越深，则其包含的内容被认定为越需要着重阅读。



**Strong 元素 （`<strong>`）**表示文本十分重要，一般用粗体显示。

**HTML提醒注意（Bring Attention To）元素（`<b>`）**用于吸引读者的注意到该元素的内容上（如果没有另加特别强调）。这个元素过去被认为是**粗体（Boldface）元素**，并且大多数浏览器仍然将文字显示为粗体。尽管如此，你不应将 `<b>` 元素用于显示粗体文字；替代方案是使用 CSS [`font-weight`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-weight) 属性来创建粗体文字。



#### 3. 什么是 DOCTYPE，DOCTYPE 有什么用？浏览器渲染模式？

文档类型，一个文档类型标记是一种标准通用标记语言的文档类型声明，它的目的是要告诉标准通用标记语言解析器，它应该使用什么样的文档类型定义（DTD）来解析文档。Doctype还会对浏览器的渲染模式产生影响，不同的渲染模式会影响到浏览器对于 CSS 代码甚至 JavaScript 脚本的解析，所以Doctype是非常关键的，尤其是在 IE 系列浏览器中，由DOCTYPE 所决定的 HTML 页面的渲染模式至关重要。

浏览器解析HTML有三种解析方式:

- 非怪异（标准）模式
- 怪异模式
- 部分怪异（近乎标准）模式

在“标准模式”(standards mode) 页面按照 HTML 与 CSS 的定义渲染，而在“怪异模式(quirks mode) 模式”中则尝试模拟更旧的浏览器的行为。 一些浏览器（例如，那些基于 Mozilla 的 Gecko 渲染引擎的，或者 Internet Explorer 8 在 strict mode 下）也使用一种尝试于这两者之间妥协的“近乎标准”(almost standards) 模式，实施了一种表单元格尺寸的怪异行为，除此之外符合标准定义。

一个不含任何 DOCTYPE 的网页将会以 怪异(quirks) 模式渲染。

HTML5提供的`<DOCTYPE html>`是标准模式，向后兼容的, 等同于开启了标准模式，那么浏览器就得老老实实的按照W3C的 标准解析渲染页面，这样一来，你的页面在所有的浏览器里显示的就都是一个样子了。

[怪异模式和标准模式- HTML（超文本标记语言） | MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Quirks_Mode_and_Standards_Mode)



#### 4. h5新特性







#### 5. 你对 HTML DOM 是怎么理解的？





#### 6. HTML语义化

语义化的含义就是用正确的标签做正确的事情，html语义化就是让页面的内容结构化，便于对浏览器、搜索引擎解析；在没有样式CCS情况下也以一种文档格式显示，并且是容易阅读的。搜索引擎的爬虫依赖于标记来确定上下文和各个关键字的权重，利于 SEO。使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解。









#### 从哪里了解 Web 标准的？

- [WHATWG: Opera, Mozilla, Chrome 和 Safari](https://whatwg.org/)
- [W3C: 微软](https://www.w3.org/)













