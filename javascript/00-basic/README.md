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

- typeof
- Undefined
- Null
- Boolean
- Number
- String
- Symbol
- BigInt
- Object

### 隐式类型转换

JS有原始类型和对象类型，一些运算符可能会触发js的隐式类型转换。

- `+, ==` 运算符，存在js的隐式类型转换，转换为原始值。
- `-, *, /` 运算符，用于数学计算，存在js的隐式类型转换，转换为Number类型。

#### ToPrimitive(input, PreferredType?)

隐式类型转换涉及的JS引擎内部操作： ToPrimitive(input, PreferredType?)

##### 1. PreferredType为Number

1、如果输入的值已经是一个原始值，则直接返回它

2、否则，如果输入的值是一个对象，则调用该对象的valueOf()方法，如果valueOf()方法的返回值是一个原始值，则返回这个原始值。

3、否则，调用这个对象的toString()方法，如果toString()方法返回的是一个原始值，则返回这个原始值。

4、否则，抛出TypeError异常。

##### 2. PreferredType为String

1、如果输入的值已经是一个原始值，则直接返回它

2、否则，调用这个对象的toString()方法，如果toString()方法返回的是一个原始值，则返回这个原始值。

3、否则，如果输入的值是一个对象，则调用该对象的valueOf()方法，如果valueOf()方法的返回值是一个原始值，则返回这个原始值。

4、否则，抛出TypeError异常。

##### 3. 未传入PreferredType时

1、该对象为Date类型，则PreferredType被设置为String

2、否则，PreferredType被设置为Number

#### `==`运算符

```
比较运算 x==y, 其中 x 和 y 是值，返回 true 或者 false。这样的比较按如下方式进行：

1、若 Type(x) 与 Type(y) 相同， 则
    1* 若 Type(x) 为 Undefined， 返回 true。
    2* 若 Type(x) 为 Null， 返回 true。
    3* 若 Type(x) 为 Number， 则
        (1)、若 x 为 NaN， 返回 false。
        (2)、若 y 为 NaN， 返回 false。
        (3)、若 x 与 y 为相等数值， 返回 true。
        (4)、若 x 为 +0 且 y 为 −0， 返回 true。
        (5)、若 x 为 −0 且 y 为 +0， 返回 true。
        (6)、返回 false。
    4* 若 Type(x) 为 String, 则当 x 和 y 为完全相同的字符序列（长度相等且相同字符在相同位置）时返回 true。 否则， 返回 false。
    5* 若 Type(x) 为 Boolean, 当 x 和 y 为同为 true 或者同为 false 时返回 true。 否则， 返回 false。
    6*  当 x 和 y 为引用同一对象时返回 true。否则，返回 false。  
2、若 x 为 null 且 y 为 undefined， 返回 true。
3、若 x 为 undefined 且 y 为 null， 返回 true。
4、若 Type(x) 为 Number 且 Type(y) 为 String，返回比较 x == ToNumber(y) 的结果。
5、若 Type(x) 为 String 且 Type(y) 为 Number，返回比较 ToNumber(x) == y 的结果。
6、若 Type(x) 为 Boolean， 返回比较 ToNumber(x) == y 的结果。
7、若 Type(y) 为 Boolean， 返回比较 x == ToNumber(y) 的结果。
8、若 Type(x) 为 String 或 Number，且 Type(y) 为 Object，返回比较 x == ToPrimitive(y) 的结果。
9、若 Type(x) 为 Object 且 Type(y) 为 String 或 Number， 返回比较 ToPrimitive(x) == y 的结果。
10、返回 false。
```

主要分为两类，x、y类型相同时，和类型不相同时。

类型相同时，没有类型转换，主要注意NaN不与任何值相等，包括它自己，即NaN !== NaN。

类型不相同时，

1、x,y 为null、undefined两者中一个   // 返回true

2、x、y为Number和String类型时，则转换为Number类型比较。

3、有Boolean类型时，Boolean转化为Number类型比较。

4、一个Object类型，一个String或Number类型，将Object类型进行原始转换后，按上面流程进行原始值比较。



## 操作符

- 一元操作符
- 位操作符
- 布尔操作符
- ...



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

[你所忽略的js隐式转换- 掘金](https://juejin.im/post/5a7172d9f265da3e3245cbca)