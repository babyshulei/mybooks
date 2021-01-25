# 正则表达式

## 概念

正则表达式是用于匹配字符串中字符组合的模式，在 JavaScript中，正则表达式也是对象。

- 正则表达式是在宿主环境下运行的，如`js/php/node.js` 等

## 基础知识

### 创建正则

JavaScript中可以通过字面量和对象两种方式创建正则表达式。

#### 字面量创建

语法：

```js
/pattern/attributes
```

参数：

- pattern
  字符串，指定正则表达式的模式
- attributes
  可选参数，如g、i、m等，分别表示是进行全局匹配、不区分大小写匹配、多行匹配等

该方式较为常用，但不能在其中使用变量。虽然可以使用`eval`转换为js语法来实现，但是比较麻烦，更建议有变量时使用对象创建语法。

示例：

```js
let str = 'sdkfjdkf';
console.log(/s/.test(str)); // true
```

#### 对象创建

语法：

```js
new RegExp(pattern, attributes)
```

示例：

```js
const con = prompt('请输入要搜索的内容，支持正则表达式');
const reg = new RegExp(con, 'g');
let div = document.querySelector('#content');
div.innerHTML = div.innerHTML.replace(reg, str => {
    return `<span style="color: red">str</span>`;
})
```

### 选择符

`|` 这个符号代表选择符，左右两侧有一个匹配到即可。

示例：

```js
const str = 'hello world';
const reg = /one|hello/;
console.log(reg.test(str)); // true;
```















## 参考资料

[正则表达式- 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/正则表达式)

[正则表达式- JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)

[JavaScript || 正则表达式 - segmentfault](https://segmentfault.com/a/1190000008729041)

[RegExp - 廖雪峰](http://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434499503920bb7b42ff6627420da2ceae4babf6c4f2000)

[深入浅出的javascript的正则表达式学习教程](http://www.cnblogs.com/tugenhua0707/p/5037811.html#_labe1)

[正则表达式 - 后盾人](https://houdunren.gitee.io/note/js/14%20%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F.html)