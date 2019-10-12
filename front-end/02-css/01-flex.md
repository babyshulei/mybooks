# Flex 布局

> 2019.10.11 @wsl

标准：[CSS Flexible Box Layout Module Level 1](https://www.w3.org/TR/css-flexbox-1/)

为 CSS display 属性增加了 flexbox layout(伸缩盒布局) 及多个新 CSS 属性来控制它：flex，flex-align，flex-direction，flex-flow，flex-item-align，flex-line-pack，flex-order，flex-pack 和 flex-wrap。

教程：

[阮一峰|Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

[阮一峰|Flex 布局教程：实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)

## 1. Flex 布局

Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。

任何一个容器都可以指定为 Flex 布局。

```css
.box {
  display: flex;
}
```

>  注意，设为 Flex 布局以后，子元素的`float`、`clear`和`vertical-align`属性将失效。

采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。

![1570865540835](.\images\flex-box.png)

 





















