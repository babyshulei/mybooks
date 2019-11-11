# 选择器

> 2019.11.11 @wsl

## 伪元素

伪元素是一个元素的子元素，并且是inline行内元素。包括 ::first-line, ::first-letter, ::before, ::after。

> 注意，img, input等单标签是没有before/after伪元素的，因为它们本身不可以有子元素。

### 优点

使用伪元素的好处有很多，主要是它可以简化HTML标签，使页面更加简洁优雅。

伪元素无法用JS获取，你可以用伪元素制造视觉上的效果，但是不会增加JS查询Dom的负担，它对JS是透明的。

同时，它不是一个实际的HTML标签，可以加快浏览器加载HTML文件，对SEO也是有帮助的。

### 清除浮动

```css
.clearfix::after {
	content: "";
	display: table;
	clear: both;
}
```

