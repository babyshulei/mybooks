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
/pattern/flags
```

参数：

- pattern
  字符串，指定正则表达式的模式
- flags
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
new RegExp(pattern, flags)
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

> 原子表`[]`，匹配任一字符，暗含选择匹配，不用加`|`，如 `/[1234]/`表示匹配1234中任意字符。
>
> 原子组`()`，一次匹配多个元子，如果想要选择匹配需要加`|`，如`/(123|345)/`表示匹配123或345。

### 字符转义

转义用于改变字符的含义，用来对某个字符有多种语义时的处理。

语法：在字符前加上转义字符 `\` 即可。

示例：

```js
const num1 = 3344;
const num2 = 22.53;
// 字面量场景
const reg1 = /\d+\.\d+/;
// 对象场景
// 由于字符串里，\也是特殊字符，所以要再加一个转义字符，生成的正则才是/\d+\.\d+/
const reg2 = new RegExp('\\d+\\.\\d+');
console.log(reg1.test(num1), reg1.test(num2)); // false true
console.log(reg2.test(num1), reg2.test(num2)); // false true
```

### 字符边界

使用字符边界符用于控制匹配内容的开始与结束约定。

| 边界符 | 说明                         |
| ------ | ---------------------------- |
| ^      | 匹配字符串的开始             |
| $      | 匹配字符串的结束，忽略换行符 |

示例：

```js
// 输入值只匹配3-6位字母
document.querySelector('input').addEventListener('keyup', function() {
    let value = this.value;
    let reg = /^[a-z]{3,6}$/i;
    console.log(value.match(reg) ? '正确' : '错误');
});
```

## 元子字符

元子字符是正则表达式中的最小元素，只代表单一（一个）字符。

| 元字符 | 说明                                                 | 示例          |
| ------ | ---------------------------------------------------- | ------------- |
| \d     | 匹配任意一个数字                                     | [0-9]         |
| \D     | 与除了数字以外的任何一个字符匹配                     | [^0-9]        |
| \w     | 与任意一个英文字母、数字或下划线匹配                 | [a-zA-Z_]     |
| \W     | 除了字母、数字或下划线外与任何字符匹配               | [^a-zA-Z_]    |
| \s     | 任意一个空白字符匹配，如空格，制表符`\t`，换行符`\n` | [\n\f\r\t\v]  |
| \S     | 除了空白符外任意一个字符匹配                         | [^\n\f\r\t\v] |
| .      | 匹配除换行符外的任意字符                             |               |

匹配所有字符：

- `/[\s\S]+/`
- `/[\d\D]+/`
- `/[\w\W]+/`
- `/.+/s`

## 模式修饰

正则表达式有六个可选参数 (`flags`) 允许全局和不分大小写搜索等。这些参数既可以单独使用也能以任意顺序一起使用, 并且被包含在正则表达式实例中。

| 修饰符 | 说明                                                        |
| ------ | ----------------------------------------------------------- |
| i      | 不区分大小写字母的匹配                                      |
| g      | 全局搜索所有匹配内容                                        |
| m      | 视为多行                                                    |
| s      | 视为单行忽略换行符，使用`.` 可以匹配所有字符                |
| y      | 执行“粘性（sticky）”搜索，从 `regexp.lastIndex` 开始匹配    |
| u      | 使用unicode码的模式进行匹配，正确处理四个字符的 UTF-16 编码 |

示例：给定多行字符串，返回 { name, price }的数组。

```js
let hd = `
  #1 js,200元 #
  #2 php,300元 #
  #9 houdunren.com # 后盾人
  #3 node.js,180元 #
`;
let reg = /^\s*#\d+\s.+\s#$/mg;
let result = hd.match(reg).map(v => {
    let str = v.replace(/\s*#\d+\s/, '').replace(/\s#/, '');
    let [name, price] = str.split(',');
    return {name, price};
});
console.log(JSON.stringify(result, null, 2));
```

### u

每个字符都有属性，在 u 模式下，可以根据属性来进行字符匹配，如 P 代表标点符号、L 代表字母，参见：[属性的别名](https://www.unicode.org/Public/UCD/latest/ucd/PropertyValueAliases.txt)。

字符也有unicode文字系统属性，如Han代表中文字符，参见：[文字语言表](http://www.unicode.org/standard/supported.html)。

`u`模式可以正确处理4个字符的 UTF-16 字节编码。

示例：

```js
var str = 'Hello!欢迎来到新世界，^_^。𝒳𝒴';
var reg1 = /\p{P}/ug;
var reg2 = /\p{L}/ug;
var reg3 = /\p{sc=Han}/ug;
var reg4 = /[𝒳𝒴]/ug;
console.log(str.match(reg1)); // ["!", "，", "_", "。"]
console.log(str.match(reg2)); // ["H", "e", "l", "l", "o", "欢", "迎", "来", "到", "新", "世", "界", "𝒳", "𝒴"]
console.log(str.match(reg3)); // ["欢", "迎", "来", "到", "新", "世", "界"]
console.log(str.match(reg4)); // ["𝒳", "𝒴"]
```







## 参考资料

[正则表达式- 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/正则表达式)

[正则表达式- JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)

[JavaScript || 正则表达式 - segmentfault](https://segmentfault.com/a/1190000008729041)

[RegExp - 廖雪峰](http://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434499503920bb7b42ff6627420da2ceae4babf6c4f2000)

[深入浅出的javascript的正则表达式学习教程](http://www.cnblogs.com/tugenhua0707/p/5037811.html#_labe1)

[正则表达式 - 后盾人](https://houdunren.gitee.io/note/js/14%20正则表达式.html)

[正则表达式 - bilibili](https://www.bilibili.com/video/BV12J41147fC?p=1)

