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
| \w     | 与任意一个英文字母、数字或下划线匹配                 | [0-9a-zA-Z_]  |
| \W     | 除了字母、数字或下划线外与任何字符匹配               | [^a-zA-Z_]    |
| \s     | 任意一个空白字符匹配，如空格，制表符`\t`，换行符`\n` | [\n\f\r\t\v]  |
| \S     | 除了空白符外任意一个字符匹配                         | [^\n\f\r\t\v] |
| .      | 匹配除换行符外的任意字符                             |               |

### 匹配所有字符

有以下方式可以匹配所有字符：

- `/[\s\S]+/`
- `/[\d\D]+/`
- `/[\w\W]+/`
- `/.+/s`
- `/[^]+/`

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

### g

全局匹配。

示例：

```js
let str = 'hello';
let reg = /\w/g;
console.log(str.match(reg)); // ["h", "e", "l", "l", "o"]
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

### y

粘性匹配，从lastIndex处开始匹配，需要一直符合匹配条件才能继续搜索。

```js
var str = 'testhhhaha';
var reg = /h/y;
var res;
console.log(reg.exec(str), reg.lastIndex);
reg.lastIndex = 4;
while((res = reg.exec(str))) {
    console.log(res[0], reg.lastIndex);
}

// null 0
// h 5
// h 6
// h 7
```

用途：

y 模式比较适用连续且知晓位置的大文件搜索，相比于 g 模式，可以提升效率，不用查找整个文件即得到匹配结果。

### lastIndex

RegExp对象的lastIndex属性可以返回或设置开始匹配的索引。

- 必须结合 `g`修饰符使用
- 对 `reg.exec()` 方法有效
- 匹配完成时，`lastIndex` 会置为 0

示例：

```js
var str = 'test';
var reg = /\w/g;
var res;
while((res = reg.exec(str))) {
    console.log(res[0], reg.lastIndex);
}
console.log(res, reg.lastIndex);
// "t" 1
// "e" 2
// "s" 3
// "t" 4
// null 0
```

## 原子表

在一组字符中匹配某个元字符，在正则表达式中通过元字符表来完成，即放到 `[]` 中。

### 使用语法

| 原子表 | 说明                               |
| ------ | ---------------------------------- |
| []     | 只匹配其中的一个原子               |
| [^]    | 只匹配"除了"其中字符的任意一个原子 |
| [0-9]  | 匹配0-9任何一个数字                |
| [a-z]  | 匹配小写a-z任何一个字母            |
| [A-Z]  | 匹配大写A-Z任何一个字母            |

示例：

```js
var str = 'testhhaha';
var reg1 = /[hs]/g;
var reg2 = /[^a-e]/g;
console.log(str.match(reg1)); // ["s", "h", "h", "h"]
console.log(str.match(reg2)); // ["t", "s", "t", "h", "h", "h"]
```

示例，匹配日期：

```js
var date1 = '2004-12-20';
var date2 = '2004/12-20';
var reg = /^\d{4}([\/-])\d{2}\1\d{2}$/;
console.log(reg.test(date1), reg.test(date2)); // true false
// 注意：正则表达式中的\1是用了原子组的方式，保证前后两个符号一致
```

### 区间匹配

区间匹配就是`[0-9]`这种，匹配一个范围内的任一字符，注意，必须是升序区间，降序区间会报错。

示例：

```js
const str = "e";
console.log(/[a-f]/.test(str)); //true
```

### 排除匹配

排除匹配是 `[^]` 这种语法，表示匹配除了表中字符的任一字符。

示例，匹配中文：

```js
var str = '真好:16353-3848347,天天:3483784-2837';
console.log(str.match(/[^\d:\-,]/g)); // ["真", "好", "天", "天"]
// 注意，此时-字符需要转义，因为这个-可能表示区间，如a-z
```

### 字符不解析

注意，原子表中，一些特殊字符并没有特殊含义，而是为字符本身，不需要进行转义。例如，`.`只匹配字符`.`，而不是匹配除换行外所有字符。

示例：

```js
var str = '(ss).ww.co';
console.log(str.match(/[().\w]/g)); //  ["(", "s", "s", ")", ".", "w", "w", ".", "c", "o"]
```

## 原子组

- 如果一次性匹配多个元子，可以使用原子组
- 将元子字符用`()`包裹，形成一个原子组
- 原子组和原子表的区别是，原子组一次匹配多个元子，而原子表是匹配任意一个字符

### 基本使用

原子组默认按照左括号位置从左到右组名为1/2/3……，也可以起组的别名。

示例：

```js
const str = `hola<h1>测试</h1><p></p>`;
const reg = /<(h[1-6]+)>[\s\S]*<\/(\1)>/i;

console.log(str.match(reg));
// ["<h1>测试</h1>", "h1", "h1", index: 4, input: "<h1>测试</h1><p></p>", groups: undefined]
```

使用 `match` 非全局匹配时，会返回一个数组，包含如下内容：

| 变量         | 说明                           |
| ------------ | ------------------------------ |
| 索引0        | 匹配到的完整内容               |
| 索引1、2.... | 匹配到的原子组                 |
| index        | 匹配的开始位置（在原字符串中） |
| input        | 原字符串                       |
| groups       | 命名分组，组别名               |

全局匹配示例：

```js
const str1 = `hola<h1>测试</h1><p></p><h2>标题二</h2><p>lalala</p>`;
const reg1 = /<(h[1-6]+)>[\s\S]*<\/(\1)>/ig;

console.log(str1.match(reg1));
// [ '<h1>测试</h1>', '<h2>标题二</h2>' ]
```

匹配邮箱示例：

```js
const regEmail = /^[\w-]+@([\w-]+\.)+(com|org|cn|net)$/i;
const email = 'sdfkj@aaa.hh.com';
console.log(regEmail.test(email)); // true
```

替换文本示例：

```js
const strRep = `hola<h1>测试</h1>中间内容<h2>标题二</h2>有趣吗`;
const regRep = /<(h[1-6])>([\s\S]*)<\/\1>/ig;
// 方案一：传入字符串直接替换
const result = strRep.replace(regRep, '<p>$2</p>');

// 方案二：也可以使用函数
// 入参：p0为匹配的字符串，p1,p2...为匹配的原子组
// offset为匹配到的子串在原字符串中的偏移量，string为原字符串
const result = strRep.replace(regRep, (p0, p1, p2, offset, string) => `<p>${p2}</p>`);

console.log(result);
// hola<p>测试</p>中间内容<p>标题二</p>有趣吗
```

### 不记录组

在原子组的左括号后面添加 `?:`可以不记录组。

示例，匹配网站，获取网站host：

```js
const webStr = `
  开始 https://www.test.com
  http://another.test.cn
  第三个 https://www.example.com小意思
`;
const webReg = /(?:https?):\/\/((?:\w+\.)+(?:com|cn|org))/ig;
let webArr = [];

while(res = webReg.exec(webStr)) {
  // host所在原子组实际为第2个，但是前面的原子组不记录，所以对应的原子组为1
  webArr.push(res[1]);
}
console.log(webArr);
// [ 'www.test.com', 'another.test.cn', 'www.example.com' ]
```



### 原子组别名

如果希望返回的组数据更清晰，可以为原子组编号，结果将保存在返回的 `groups`字段中。

组别名使用 `?<>` 形式定义。

示例：

```js
const sstr = '(010)99999999';
const rreg = /\((?<zone>\d{3,4})\)(?<tel>\d{7,8})/;

console.log(sstr.replace(rreg, '$<zone>-$<tel>'));
// 010-99999999
console.log(sstr.match(rreg));
//[
//  '(010)99999999',
//  '010',
//  '99999999',
//  index: 0,
//  input: '(010)99999999',
//  groups: { zone: '010', tel: '99999999' }
//]
```

使用组别名可以优化代码，便于取到特定含义的值。



## 重复匹配

如果要重复匹配一些内容时我们要使用重复匹配修饰符，包括以下几种。

| 符号  | 说明             |
| ----- | ---------------- |
| *     | 重复零次或更多次 |
| +     | 重复一次或更多次 |
| ?     | 重复零次或一次   |
| {n}   | 重复n次          |
| {n,}  | 重复n次或更多次  |
| {n,m} | 重复n到m次       |

默认情况下，会进行贪婪匹配。

示例，对电话号进行匹配：

```js
const tel = '010-2938888';
const reg = /^0\d{2,3}-\d{7,8}$/;
console.log(reg.test(tel)); // true
```

### 同时匹配多条正则

可以利用数组的every方法实现。

示例，匹配密码符合数字、字母大小写、5-10位。

```js
const password1 = 'aaaA345';
const password2 = 'sdfjdj';
const regs = [/^[a-z0-9]{5,10}$/i, /[a-z]/, /[A-Z]/, /[0-9]/];
const res1 = regs.every(r => r.test(password1));
const res2 = regs.every(r => r.test(password2));

console.log(res1, res2); // true false
```

### 禁止贪婪

正则表达式在进行重复匹配时，默认是贪婪模式；通过`?`进行修饰，可以禁止贪婪匹配。

| 使用   | 说明                            |
| ------ | ------------------------------- |
| *?     | 重复任意次，但尽可能少重复      |
| +?     | 重复1次或更多次，但尽可能少重复 |
| ??     | 重复0次或1次，但尽可能少重复    |
| {n,m}? | 重复n到m次，但尽可能少重复      |
| {n,}?  | 重复n次以上，但尽可能少重复     |

示例，修改DOM元素：

```js
const domStr = `
  <span>hello</span>
  <span>world</span>
  <span>mini</span>
`;
const domReg = /<span>([\s\S]+?)<\/span>/ig;
const newDom = domStr.replace(domReg, (p0, p1) => {
  return `<h4>h4-${p1}</h4>`;
});

console.log(newDom);
```



## 全局匹配

String的[match方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/match)，在常规匹配时，会返回匹配的详细信息，如匹配组、index、input等；在全局匹配时，返回的数组是匹配字符串的数组，缺少详细信息。

新版浏览器支持了String的[matchAll方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll)，可以在全局匹配时，返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器。

示例：

```js
const allStr = `
  <span>hello</span>
  <span>world</span>
  <span>mini</span>
`;
const allReg = /<span>([\s\S]+?)<\/span>/ig;
const allRes = allStr.matchAll(allReg);
for(const v of allRes) {
  console.log(v);
}
```

定义原型方法matchAll，兼容旧版浏览器：

```js
let testStr = 'thisisatest';
// 旧版浏览器兼容
// 方案一：使用exec()
String.prototype.matchAll = function(reg) {
  const ret = [];
  let res;
  while(res = reg.exec(this)) {
    ret.push(res);
  }

  return ret;
};

console.dir(testStr.matchAll(/s/ig));

// 方案二：使用replace+递归，注意此时全局匹配不用带g，而且会把目标内容替换。
String.prototype.matchAll = function(reg) {
  let res = this.match(reg);
  if (res) {
    let str = this.replace(res[0], "^".repeat(res[0].length));
    let match = str.matchAll(reg) || [];
    return [res, ...match];
  }
};

console.dir(testStr.matchAll(/s/i));
```

## 字符方法

定义在String.prototype上，正则表达式相关的方法，参见[String](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)：

- search
- match
- matchAll
- split
- replace

### search

[search() 方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/search)用于检索字符串中指定的子字符串，返回值为索引位置。

```
str.search(regexp)
```

参数：

- regexp：一个正则表达式对象，
  如果传入一个非正则表达式对象，则会使用 `new RegExp(regexp)` 隐式地将其转换为正则表达式对象。

示例：

```js
var str = 'hello world';
console.log(str.search('o')); // 4
console.log(str.search(/o/)); // 4
```



### match

[match() 方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/match)检索返回一个字符串匹配正则表达式的结果。

```
str.match(regexp)
```

参数同search方法。

示例：

```js
var str = 'hello world';
// 传入字符串
console.log(str.match('o')); // [ 'o', index: 4, input: 'hello world', groups: undefined ]
// 传入正则
console.log(str.match(/o/)); // [ 'o', index: 4, input: 'hello world', groups: undefined ]
// 传入全局匹配的正则
console.log(str.match(/o/g)); // [ 'o', 'o' ]
```



### matchAll

[matchAll() 方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll)返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器。

语法、参数类似match方法。

示例：

```js
var str = 'hello world';
var res = str.matchAll(/o/g);
for (const v of res) {
  console.log(v);
}
// [ 'o', index: 4, input: 'hello world', groups: undefined ]
// [ 'o', index: 7, input: 'hello world', groups: undefined ]

var res2 = [ ...str.matchAll(/o/g) ];
console.log(res2);
// [
//  [ 'o', index: 4, input: 'hello world', groups: undefined ],
//  [ 'o', index: 7, input: 'hello world', groups: undefined ]
// ]
```



### split

[split() 方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split)使用指定的分隔符字符串将一个String对象分割成子字符串数组，以一个指定的分割字串来决定每个拆分的位置。 

语法：

```
str.split([separator[, limit]])
```

参数：

- separator：指定表示每个拆分应发生的点的字符串
  separator可以是一个字符串或正则表达式。
- limit：一个整数，限定返回的分割片段数量。

示例：

```js
var date1 = '2001-10-12';
var date2 = '2021/11/02';

console.log(date1.split('-'), date2.split('-'));
// [ '2001', '10', '12' ] [ '2021/11/02' ]
console.log(date1.split(/[-/]/g), date2.split(/[-/]/g));
// [ '2001', '10', '12' ] [ '2021', '11', '02' ]
```



### replace

[replace() 方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace)返回一个由替换值（replacement）替换部分或所有的模式（pattern）匹配项后的新字符串。

模式可以是一个字符串或正则表达式；替换值可以是一个字符串或者每次匹配都调用的回调函数。

语法：

```
str.replace(regexp|substr, newSubStr|function)
```

参数：

- pattern：regexp|substr
  匹配模式，可以是正则表达式或字符串
- replacement：newSubstr|function
  用于替换的值，可以是字符串，或者是回调函数的返回结果。

替换字符串可以插入下面的特殊变量名：

| 变量名    | 代表的值                                                     |
| --------- | ------------------------------------------------------------ |
| $$        | 插入一个 "$"。                                               |
| $&        | 插入匹配的子串。                                             |
| $`        | 插入当前匹配的子串左边的内容。                               |
| $'        | 插入当前匹配的子串右边的内容。                               |
| $n        | 假如第一个参数是 [`RegExp`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/RegExp)对象，并且 n 是个小于100的非负整数，那么插入第 n 个括号匹配的字符串。提示：索引是从1开始。 |
| `$<Name>` | 这里 Name 是一个分组名称。如果在正则表达式中并不存在分组（或者没有匹配），这个变量将被处理为空字符串。只有在支持命名分组捕获的浏览器中才能使用。 |

示例，使用`$n`：

```js
var str = '(010)99999999 (020)8888888';
var newStr = str.replace(/\((\d{3,4})\)(\d{7,8})/g, '$1-$2');
console.log(newStr);
// 010-99999999 020-8888888
```

示例，使用$`, $', $&（分别表示匹配内容左边、右边、本身）：

```js
var str = '%aaaa=%bbbb';
var newStr = str.replace(/\w{4}/g, "$` $& $', ");
console.log(newStr);
// %% aaaa =%bbbb, =%%aaaa=% bbbb ,
```

示例，使用回调函数：

```js
var str = `
  hola
  <h1>测试</h1>
  中间内容
  <h2>标题二</h2>
  有趣吗
`;
var reg = /<(h[1-6])>(.*?)<\/\1>/ig;
// 回调函数入参：p0为匹配的字符串，p1,p2...为匹配的原子组
// offset为匹配到的子串在原字符串中的偏移量，string为原字符串
var result = str.replace(reg, (v, p1, p2, offset, string) => {
  return `<span>${p2}</span>`;
});

console.log(result);
//  hola
//  <span>测试</span>
//  中间内容
//  <span>标题二</span>
//  有趣吗
```

示例，使用`$<name>`：

```js
const sstr = '(010)99999999';
const rreg = /\((?<zone>\d{3,4})\)(?<tel>\d{7,8})/;

console.log(sstr.replace(rreg, '$<zone>-$<tel>'));
// 010-99999999
console.log(sstr.match(rreg));
//[
//  '(010)99999999',
//  '010',
//  '99999999',
//  index: 0,
//  input: '(010)99999999',
//  groups: { zone: '010', tel: '99999999' }
//]
```



## 正则方法

定义在RegExp.prototype上的相关方法，参见[RegExp(正则表达式)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp)：

- test
- exec

### test

[test() 方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)执行一个检索，用来查看正则表达式与指定的字符串是否匹配。返回 true 或 false。

语法：

```
regexObj.test(str)
```

参数：

- str：用来与正则表达式匹配的字符串

示例：

```js
var str = '021-39489999';
var reg = /\d{3,4}-\d{7,8}/;

console.log(reg.test(str)); // true
```

### exec

exec() 方法在一个指定字符串中执行一个搜索匹配。返回一个结果数组或 null。

在设置了 [`global`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/global) 或 [`sticky`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky) 标志位的情况下（如 `/foo/g` or `/foo/y`），JavaScript [`RegExp`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/RegExp) 对象是**有状态**的。他们会将上次成功匹配后的位置记录在 [`lastIndex`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex) 属性中。使用此特性，`exec()` 可用来对单个字符串中的多次匹配结果进行逐条的遍历（包括捕获到的匹配），而相比之下， [`String.prototype.match()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/match) 只会返回匹配到的结果。

```
regexObj.exec(str)
```

示例：

```js
var str = '021-39489999 010-88883333';
var reg = /\d{3,4}-\d{7,8}/;
var regg = /\d{3,4}-\d{7,8}/g;

console.log('normal:', reg.exec(str));
// 注意：这种场景下，如果匹配会一直有返回，且匹配到的是第一个满足正则的子字符串
// normal: [ '021-39489999',
//   index: 0,
//   input: '021-39489999 010-88883333',
//   groups: undefined ]

while(res = regg.exec(str)) {
    console.log('global:', res[0])
}
// global: 021-39489999
// global: 010-88883333
```

## 断言匹配

[断言](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)写在括号中，不过不是组，不会在匹配结果中保存，可以将断言理解为正则中的条件。

### (?=exp)

**零宽先行断言** `?=exp` 匹配后面为 `exp` 的内容。

示例，将金额格式统一规范为带小数点：

```js
var lessons = `
  js： 300元，200次；
  python：200.00元，100次；
  java：400元，300次；
`;
var reg = /(\d+)(.00)*(?=元)/g;

lessons = lessons.replace(reg, (v, ...args) => {
  args[1] = args[1] || '.00';
  return args.slice(0, 2).join('');
});

console.log(lessons);
// js： 300.00元，200次；
// python：200.00元，100次；
// java：400.00元，300次；
```

### (?<=exp)

**零宽后行断言** `?<=exp` 匹配前面为 `exp` 的内容。

示例，使用断言模糊电话号：

```js
var tels = `
  小红：13039480002
  小明：18822228889
`;
var reg = /(?<=\d{7})\d{4}/g;
tels = tels.replace(reg, '*'.repeat(4));

console.log(tels);
// 小红：1303948****
// 小明：1882222****
```

### (?!exp)

**零宽负向先行断言**，后面不能出现 `exp` 指定的内容。

示例，断言限制用户名关键词：

```js
var user1 = 'hello';
var user2 = 'atesth';
// 用户名中不能含test，5-6位
var reg = /^(?!.*test.*)[a-z]{5,6}$/;

console.log(reg.test(user1), reg.test(user2)); // true false
```

### (?<!exp)

**零宽负向后行断言**，前面不能出现`exp`指定的内容。

示例，匹配前面不是数字的字母：

```js
var str = 'sdkfjk112kdj';
var reg = /(?<!\d+)[a-z]+/;

console.log(reg.exec(str));
// [ 'sdkfjk', index: 0, input: 'sdkfjk112kdj', groups: undefined ]
```



## 参考资料

[正则表达式- 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/正则表达式)

[正则表达式- JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)

[Assertions - JavaScript | MDN - Mozilla](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)

[JavaScript || 正则表达式 - segmentfault](https://segmentfault.com/a/1190000008729041)

[RegExp - 廖雪峰](http://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434499503920bb7b42ff6627420da2ceae4babf6c4f2000)

[深入浅出的javascript的正则表达式学习教程](http://www.cnblogs.com/tugenhua0707/p/5037811.html#_labe1)

[正则表达式 - 后盾人](https://houdunren.gitee.io/note/js/14%20正则表达式.html)

[正则表达式 - bilibili](https://www.bilibili.com/video/BV12J41147fC?p=1)

[String.prototype.replace() - JavaScript | MDN - Mozilla](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace)

