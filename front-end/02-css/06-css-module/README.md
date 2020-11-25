# CSS Module

CSS的规则都是全局的，任何一个组件的样式规则，都对整个页面有效。

产生局部作用域的唯一方法，就是使用一个独一无二的`class`的名字，不会与其他选择器重名。这就是 CSS Modules 的做法。

React示例：

```react
import React from 'react';
import style from './App.css';

export default () => {
  return (
    <h1 className={style.title}>
      Hello World
    </h1>
  );
};
```

css文件：

```css
.title {
  color: red;
}
```

上面代码中，我们将样式文件`App.css`输入到`style`对象，然后引用`style.title`代表一个`class`。

构建工具会将类名`style.title`编译成一个哈希字符串。`App.css`也会同时被编译。

这样一来，这个类名就变成独一无二了，只对`App`组件有效。

## 全局作用域

CSS Modules 允许使用`:global(.className)`的语法，声明一个全局规则。凡是这样声明的`class`，都不会被编译成哈希字符串。

CSS Modules 还提供一种显式的局部作用域语法`:local(.className)`，等同于`.className`。

```css
:local(.title) {
  color: red;
}

:global(.title) {
  color: green;
}
```

## Class 组合

在 CSS Modules 中，一个选择器可以继承另一个选择器的规则，这称为"组合"（["composition"](https://github.com/css-modules/css-modules#composition)）。

示例，`.title`继承`.className` ：

```css
.className {
  background-color: blue;
}

.title {
  composes: className;
  color: red;
}
```

## 继承其他规则

选择器也可以继承其他CSS文件里面的规则。

示例：

```css
/* another.css */
.className {
  background-color: blue;
}

/* app.css */
.title {
  composes: className from './another.css';
  color: red;
}
```

## 输入变量

CSS Modules 支持使用变量，不过需要安装相关插件。

在 `colors.css` 里面定义变量。

```css
@value blue: #0c77f8;
@value red: #ff0000;
@value green: #aaf200;
```

`App.css`可以引用这些变量。

```css
@value colors: "./colors.css";
@value blue, red, green from colors;

.title {
  color: red;
  background-color: blue;
}
```



## 参考链接

[CSS Modules 用法教程- 阮一峰](http://www.ruanyifeng.com/blog/2016/06/css_modules.html)

