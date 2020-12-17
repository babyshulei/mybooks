# 基本概念

## 语法

- 区分大小写
- 标识符
- 注释
- 严格模式
- 语句



关键字和保留字

变量

## 数据类型

- Undefined
- Null
- Boolean
- Number
- String
- Symbol
- BigInt
- Object



## 规范类型

- List 和 Record： 用于描述函数传参过程。
- Set：主要用于解释字符集等。
- Completion Record：用于描述异常、跳出等语句执行过程。
- Reference：用于描述对象属性访问、delete 等。
- Property Descriptor：用于描述对象的属性。
- Lexical Environment 和 Environment Record：用于描述变量和作用域。
- Data Block：用于描述二进制数据。



## 操作符

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

### 一元操作符

只操作一个值的操作符叫一元操作符。

#### delete

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



## 语句

- if
- do-while
- while
- for
- for-in
- label
- break, continue
- with
- switch



## 函数

- 参数
- 没有重载



## 参考链接

[表达式和运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators)

[《JavaScript高级程序设计》]()

