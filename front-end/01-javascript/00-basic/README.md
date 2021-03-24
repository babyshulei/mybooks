# JavaScript

## 历史

ECMAScript是由[网景](https://zh.wikipedia.org/wiki/网景公司)的[布兰登·艾克](https://zh.wikipedia.org/wiki/布蘭登·艾克)开发的一种脚本语言的标准化规范；最初命名为Mocha，后来改名为LiveScript，最后重命名为JavaScript。1995年12月，[升阳](https://zh.wikipedia.org/wiki/昇陽電腦公司)与网景联合发表了JavaScript。1996年11月，网景公司将JavaScript提交给欧洲计算机制造商协会进行标准化。ECMA-262的第一个版本于1997年6月被Ecma组织采纳。ECMAScript是由ECMA-262标准化的脚本语言的名称。

尽管JavaScript和JScript与ECMAScript兼容，但包含超出ECMAScript的功能。

### 版本

| 发表日期   | 与前版本的差异                                               |
| :--------- | :----------------------------------------------------------- |
| 1997年6月  | 首版                                                         |
| 1998年6月  | 格式修正，以使得其形式与ISO/IEC16262国际标准一致             |
| 1999年12月 | 强大的正则表达式，更好的词法作用域链处理，新的控制指令，异常处理，错误定义更加明确，数据输出的格式化及其它改变 |
| 放弃       | 由于关于语言的复杂性出现分歧，第4版本被放弃，其中的部分成为了第5版本及Harmony的基础 |
| 2009年12月 | 新增“严格模式（strict mode）”，一个子集用作提供更彻底的错误检查,以避免结构出错。澄清了许多第3版本的模糊规范，并适应了与规范不一致的真实世界实现的行为。增加了部分新功能，如getters及setters，支持[JSON](https://zh.wikipedia.org/wiki/JSON)以及在对象属性上更完整的[反射](https://zh.wikipedia.org/wiki/反射式编程) |
| 2011年6月  | ECMAScript标5.1版形式上完全一致于国际标准ISO/IEC 16262:2011。 |
| 2015年6月  | ECMAScript 2015（ES2015），第 6 版，最早被称作是 ECMAScript 6（ES6），添加了类和模块的语法，其他特性包括迭代器，Python风格的生成器和生成器表达式，箭头函数，二进制数据，静态类型数组，集合（maps，sets 和 weak maps），promise，reflection 和 proxies。作为最早的 ECMAScript Harmony 版本，也被叫做ES6 Harmony。 |
| 2016年6月  | ECMAScript 2016（ES2016），第 7 版，多个新的概念和语言特性   |
| 2017年6月  | ECMAScript 2017（ES2017），第 8 版，多个新的概念和语言特性   |
| 2018年6月  | ECMAScript 2018 （ES2018），第 9 版，包含了异步循环，生成器，新的正则表达式特性和 rest/spread 语法。 |
| 2019年6月  | ECMAScript 2019 （ES2019），第 10 版                         |
| 2020年6月  | ECMAScript 2020 （ES2020），第 11 版                         |



## 基本概念

### 语法

- 区分大小写
- 标识符
- 注释
- 严格模式
- 语句



关键字和保留字

变量

### 数据类型

- Undefined
- Null
- Boolean
- Number
- String
- Symbol
- BigInt
- Object



### 规范类型

- List 和 Record： 用于描述函数传参过程。
- Set：主要用于解释字符集等。
- Completion Record：用于描述异常、跳出等语句执行过程。
- Reference：用于描述对象属性访问、delete 等。
- Property Descriptor：用于描述对象的属性。
- Lexical Environment 和 Environment Record：用于描述变量和作用域。
- Data Block：用于描述二进制数据。



### 操作符

- 一元操作符
- 位操作符
- 布尔操作符
- 乘性操作符
- 指数操作符
- 加性操作符
- 关系操作符
- 相等操作符
- 条件操作符
- 赋值操作符
- 逗号操作符

#### 一元操作符

只操作一个值的操作符叫一元操作符。

##### delete

[delete操作符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/delete)，删除一个对象的属性或者一个数组中某一个键值。

通常情况下返回true，表示删除成功；当尝试删除一个不可配置的属性时，严格模式下会抛出TypeError错误，非严格模式下会返回false。

示例：

```js
let obj = {
  name: 'example',
  value: 33,
};

Object.defineProperty(obj, 'name', { configurable: false});

console.log('value' in obj); // true

let result1 = delete obj.value;

console.log(result1, 'value' in obj); // true false

// 严格模式下，下行会抛出一个错误
let result2 = delete obj.name;

console.log(result2, 'name' in obj); // false true
```

- typeof
- void
- 自增/自减操作符
  ++、--：分为前缀版、后缀版
- 一元加和减
  +：放在操作数之前，对数值没有影响，如果是非数值，则执行Number()类型转换。
  -：放在操作数之前，返回操作数的负值。



### 语句

- if
- do-while
- while
- for
- for-in
- label
- break, continue
- with
- switch



### 函数

- 参数
- 没有重载



## 参考链接

[表达式和运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators)

[《JavaScript高级程序设计》]()

[ECMAScript - wikipedia](https://zh.wikipedia.org/wiki/ECMAScript)

《 [深入理解ES6](https://book.douban.com/subject/27072230/) 》 @Nicholas C. Zakas

《 [你不知道的 JavaScript](https://book.douban.com/series/40642) 》 @Kyle Simpson

github: [You-Dont-Know-JS](https://github.com/getify/You-Dont-Know-JS/tree/1ed-zh-CN)

《[ECMAScript 6 入门](https://es6.ruanyifeng.com/)》 @阮一峰

[tc39 | GitHub](https://github.com/tc39)

<https://kangax.github.io/compat-table>

[现代javascript教程](https://zh.javascript.info/)

[practical-modern-javascript 深入理解JS特性 | GitHub](https://github.com/mjavascript/practical-modern-javascript)

JS API polyfill：https://cdn.polyfill.io/v3/
