# HTML

> 2019-01-16 @wsl

HTML（HyperText Markup Language，超文本标记语言）是为了发送 Web 上的超文本（Hypertext）而开发的标记语言。超文本是一种文档系统，可将文档中任意位置的信息与其他信息（文本或图片等）建立关联，即超链接文本。标记语言是指通过在文档的某部分穿插特别的字符串标签，用来修饰文档的语言。我们把出现在HTML文档内的这种特殊字符串叫做 HTML标签（Tag）。

平时我们浏览的 Web 页面几乎全是使用 HTML写成的。 由 HTML构成的文档经过浏览器的解析、 渲染后， 呈现出来的结果就是 Web 页面。

以下就是用 HTML编写的文档的例子。而这份 HTML文档内这种被 < > 包围着的文字就是标签。在标签的作用下， 文档会改变样式，或插入图片、链接。

```html
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>hackr.jp</title>
<style type="text/css">
.logo {
	padding: 20px;
	text-align: center;
}
</style>
</head>
<body>
<div class="logo">
	<p><img src="photo.jpg" alt="photo" width="240" height="127" /></p>
	<p><img src="hackr.gif" alt="hackr.jp" width="240" height="84" /></p
	<p><a href="http://hackr.jp/">hackr.jp</a> </p>
</div>
</body>
</html>
```



## 1. HTML 的版本

2014年10月28日，HTML5 标准作为W3C推荐标准发布，这是目前最新的版本。

HTML5 标准不仅解决了浏览器之间的兼容性问题，并且可把文本作为数据对待，更容易复用，动画等效果也变得更生动。



## 2. 设计应用CSS

CSS（Cascading Style Sheets，层叠样式表）可以指定如何展现 HTML 内的各种元素，属于样式表标准之一。即使是相同的 HTML文档，通过改变应用的 CSS，用浏览器看到的页面外观也会随之改变。CSS 的理念就是让文档的结构和设计分离，达到解耦的目的。

可通过指定 HTML元素或特定的 class、 ID 等作为选择器来限定样式的应用范围。 

