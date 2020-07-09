# 数据类型

## Undefined 类型

表示未定义。有一个值，为undefined。

变量在赋值前是Undefined类型，值为undefined。一般可以用全局变量undefined来表达这个值，或者通过void运算来吧任意一个表达式变成 undefined 值。

JavaScript中，undefined是一个变量，为了避免无意中被篡改，常用void 0 来获取undefined 值。



## Null 类型

定义了但是为空。有一个值，为null，是JavaScript关键字。



## Boolean 类型

用于表示逻辑上的真和假。有两个值，true, false，都是关键字。



## Number 类型

数字。

有 18437736874454810627(即 2^64-2^53+3) 个值，基本符合 IEEE 754-2008 规定的双精度浮点数规则，除了以下例外情况：

- NaN：9007199254740990（即2^53-2），表示非数字
- +Infinity：正无穷，计算值得到超额值 2^1024（即+1×2^53×2^971）时替换
- -Infinity：负无穷，计算值得到超额值 -2^1024（即-1×2^53×2^971）时替换

其他 18437736874454810624（即 2^64-2^53）个值就是有限数值，正负数一半一半。具体包括：

- 一个+0，一个-0

- normalized numbers：18428729675200069632（即2^64 - 2^54） 个，形如：

  ```
  s×m×2^e
  s：+1或-1；m：范围在[2^52, 2^53)的正整数；e：范围在[-1074, 971]的整数
  ```

- denormalized numbers：9007199254740990（即2^53 - 2）个，形如：

  ```
  s×m×2^e
  s：+1或-1；m：范围在(0, 2^52)的正整数；e：-1074
  ```




## String 类型

字符串。理论最大长度是2^53-1（即js中可表达的最大安全整数），单个为16bit无符号整数值。

JS字符串基于UTF16编码，UTF16编码有两种字符，一种是16位的基本多文种平面（BMP）字符，一种是32位的辅助平面字符。因此，字符串的长度和字符的个数不一定相等。

```js
var ss = "𠮷"; 
console.log(ss.length); // 2
```



## Symbol 类型

一切非字符串的对象 key 的集合。

Symbol 可以具有字符串类型的描述，但是即使描述相同，Symbol 也不相等。

可以通过 `Symbol([description])`创建symbol值，每个从`Symbol()`返回的symbol值都是唯一的。symbol值能作为对象属性的标识符。

## BigInt 类型

BigInt 表示任意大的整数。可以超过 2^53 - 1（Number能表示的最大数字）。

可以通过整数字面量后面加 `n` 的方式定义一个 `BigInt`，或者调用函数`BigInt()`。

```js
const theBiggestInt = 9007199254740991n;

const alsoHuge = BigInt(9007199254740991); // 9007199254740991n

const hugeString = BigInt("9007199254740991"); // 9007199254740991n

const hugeHex = BigInt("0x1fffffffffffff"); // 9007199254740991n

const hugeBin = BigInt("0b11111111111111111111111111111111111111111111111111111"); // 9007199254740991n
```

> BigInt 类似于Number，但有几个不同点：
>
> 不能用于Math对象中的方法；
>
> 不能和Number实例混合运算，需要转换成其中一种类型；
>
> 出于兼容性原因，不支持一元加号 + 运算符；



## Object 类型

对象。对象是属性的集合。属性分为数据属性和访问器属性，二者都是 key-value 结构，key 可以是字符串或者 Symbol 类型。

上面的基本类型，也有对应的内置对象，包括：

- Boolean
- Number
- String
- Symbol
- BigInt

Number、String 和 Boolean，它们的构造器是两用的，当跟 new 搭配时，它们产生对象，当直接调用时，它们表示强制类型转换。

Symbol、BigInt 函数比较特殊，直接用 new 调用它们会抛出错误，但仍然是Symbol 对象、BigInt对象的构造器。

JavaScript 语言设计上试图模糊对象和基本类型之间的关系，我们日常代码可以把对象的方法在基本类型上使用；甚至我们在原型上添加方法，都可以应用于基本类型，例如：

```js
console.log('xyz'.charAt(0)); // x

Symbol.prototype.hello = () => console.log('hello world');

const mySymbol = Symbol('a test');

console.log(typeof mySymbol); // symbol，而不是Object
mySymbol.hello(); // hello world
```

原理是`. `运算符提供了装箱操作，它会根据基础类型构造一个临时对象，使得我们能在基础类型上调用对应对象的方法。



## 类型转换

### 显式类型转换

- 使用构造函数进行类型转换，如Number、String、Boolean等
- 调用方法进行类型转换，如toString()、parseInt()、parseFloat()
- 通过运算符进行类型转换，如一元运算符 +, -、按位非运算符 ~、一元运算符!

```js
var a = 42;
var b = String(a); // toString()负责处理非字符串到字符串的强制类型转换
var c = a.toString(); // 显式转换，其中涉及到隐式转换，因为a为基本类型，所以会进行装箱转换为Number对象，然后调用toString方法

var o = '2.45';
var p = +o; // 一元加运算符将操作转换为Number类型，一元减运算符将操作转换为Number类型并取反
var q = parseInt(o); // 2
var r = ~x; // 按位非运算符会先将值强制转换为32位数字，然后执行位操作“非”
var s = !!x; // 一元运算符!显式地将值强制类型转换为布尔值，同时将真值反转为假值；常用!!达到和Boolean()一样的效果

console.log(a, b, c, o, p, q, r, s)
```

> 注：字符串转数字支持十进制、二进制、八进制、十六进制语法，正负号科学计数法。
>
> 例如： 30；0b111；0o13；0xff；1e3；-1e-2
>
> 需要注意的是，parseInt 和 parseFloat 并不使用这个转换，所以支持的语法跟这里不尽相同。在不传入第二个参数的情况下，parseInt 只支持 16 进制前缀“0x”，而且会忽略非数字字符，也不支持科学计数法。
>
> 多数情况下，Number 是比 parseInt 和 parseFloat 更好的选择。



### 隐式类型转换

JS有原始类型和对象类型，一些运算符可能会触发js的隐式类型转换。

- `+, ==` 运算符，存在js的隐式类型转换，转换为原始值。
- `-, *, /` 运算符，用于数学计算，存在js的隐式类型转换，转换为Number类型。
- 隐式转换为布尔值
  - if()语句中的条件判断表达式
  - for(..; ..; ..)语句中的条件判断表达式
  - while()和do .. while()
  - ? : 中的条件判断表达式
  - 逻辑运算符||和&&左边的操作数



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

##### 显式指定toPrimitive行为

ES6 之后，允许对象通过显式指定 toPrimitive Symbol 来覆盖原有的行为。

```js
var o = {
    valueOf : () => {console.log("valueOf"); return {}},
    toString : () => {console.log("toString"); return {}}
}

o[Symbol.toPrimitive] = () => {console.log("toPrimitive"); return "hello"}

console.log(o + "")
// toPrimitive
// hello
```



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



### 思考题

1、



## 参考链接

[JavaScript类型：关于类型，有哪些你不知道的细节？| 极客时间](https://time.geekbang.org/column/article/78884)

[String - JavaScript - MDN - Mozilla](https://developer.mozilla.org/cn/docs/Web/JavaScript/Reference/Global_Objects/String)

[Is there a limit on length of the key (string) in JS object? - Stack ...](https://stackoverflow.com/questions/13367391/is-there-a-limit-on-length-of-the-key-string-in-js-object)

[JavaScript 的Number 对象 - MDN - Mozilla](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)

[Symbol - JavaScript - MDN Web Docs - Mozilla](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

[BigInt - JavaScript - MDN - Mozilla](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

[JS最新基本数据类型：BigInt - 掘金](https://juejin.im/post/5d3f8402f265da039e129574)

[你所忽略的js隐式转换- 掘金](https://juejin.im/post/5a7172d9f265da3e3245cbca)

[Standard ECMA-262 - Ecma International](https://www.ecma-international.org/publications/standards/Ecma-262.htm)

[ECMA-262 | latest draft](https://tc39.es/ecma262/)

[Denormal Number | wikipedia](https://en.wikipedia.org/wiki/Denormal_number)

[JavaScript中的强制类型转换- 掘金](https://juejin.im/post/5b3b76de5188251afc25567f)