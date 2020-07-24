# 对象

## 语法

对象可以通过两种形式定义：声明（文字）形式和构造形式。

```js
// 文字形式
var obj = {
    key: value,
    // ...
};

// 构造形式
var newObj = new Object();
newObj.key = value;
```

构造形式和文字形式生成的对象是一样的。区别是，文字声明中可以添加多个键值对，但是构造形式中必须构造后逐个添加属性。

## 类型

JavaScript中一共有八种主要类型（语言类型）：

- string
- number
- boolean
- null
- undefined
- symbol
- bigint
- object

即7个简单基本类型和1个复杂基本类型。简单基本类型本身并不是对象。null 有时会被当作一种对象类型，这其实只是语言本身的一个bug，即 typeof null 会返回"object"。实际上，null 本身是基本类型。

### 内建对象

内建对象是在JS脚本开始执行时，存在于JavaScript执行环境中的对象，所有标准对象都是内建对象。标准对象在 ES 规范中定义。

内建对象主要有：

- 基本对象：Object、Function、Boolean、Symbol
- 错误对象：Error、...
- 数字和日期对象：Number、BigInt、Math、Date
- 字符串：String、RegExp
- 可索引的集合对象：Array、...
- 使用键的集合对象：Map、Set、WeakMap、WeakSet
- 结构化数据：ArrayBuffer、JSON、...
- 控制抽象对象：Promise、Generator、...
- 反射：Reflect、Proxy
- ...

这些内置对象实际上是内置函数，这些内置函数可以当作构造函数来使用，从而可以构造一个对应子类型的新对象。

```js
var strPrimitive = "I am a string";
typeof strPrimitive;							// "string"
strPrimitive instanceof String;					// false

var strObject = new String( "I am a string" );
typeof strObject; 								// "object"
strObject instanceof String;					// true

// 考察 object 子类型
Object.prototype.toString.call( strObject );	// [object String]
```

原始值，如字符串、数字、布尔值并不是对象，只是一个字面量，如果想在这个字面量上执行一些操作，如获取长度、访问某个字符等，需要将其转换为对应的String/Number/Boolean对象。

JS引擎会进行自动”装箱“，可以自动把字面量转换成对应对象，所以可以访问属性和方法。

```js
var str = 'a string';
console.log(str.length); // 8
console.log(str.charAt(3)); // t
var num = 42.3445;
console.log(num.toFixed(2)); // 42.34
```

null 和 undefined 没有对应的构造形式，它们只有文字形式。相反，Date 只有构造，没有文字形式。

## 内容

对象的内容是由一些存储在特定命名位置的（任意类型的）值组成的，我们称之为属性。

访问对象的内容需要使用`.`操作符或者`[]`操作符。`.xx`语法通常被称为“属性访问”，`[xx]`语法通常被称为“键访问”。

这两种语法的主要区别在于`.`操作符要求属性名满足标识符的命名规范，而`[".."]`语法可以接受任意 UTF-8/Unicode 字符串作为属性名。

**在对象中，属性名永远都是字符串**。如果使用 string 以外的其他值作为属性名，那它首先会被转换为一个字符串。

```js
var myObject = { };

myObject[true] = "foo";
myObject[3] = "bar";
myObject[myObject] = "baz";

myObject["true"];				// "foo"
myObject["3"];					// "bar"
myObject["[object Object]"];	// "baz"
```

如果访问的对象属性是一个函数，这时属性通常被称为“方法”。

### 可计算属性名

可以通过 `[..]`来访问表达式计算得到的属性。如 `obj[prefix + name]`。

ES6 增加了可计算属性名，可以在文字形式中使用`[]`包裹一个表达式来当做属性名：

```js
var prefix = "foo";

var myObject = {
	[prefix + "bar"]: "hello",
	[prefix + "baz"]: "world",
    // 可对象属性名常用于Well-known Symbol属性，用于定义一些对象的内部操作
    [Symbol.Something]: "hello world",
};

myObject["foobar"]; // hello
myObject["foobaz"]; // world
```

### 数组

数组支持`[]`访问形式，数组也是对象，可以给数组添加属性。如果添加了命名属性，数组的length 值是不会发生变化的；如果添加的命名属性“看起来”像一个数字，那它会变成一个数值下标，因此会修改数组的内容而不是添加一个属性。

```js
var myArray = [ "foo", 42, "bar" ];
myArray["3"] = "baz";
myArray.length;	// 4
myArray[3];		// "baz"
```

### 复制对象

复制对象可以分为浅复制和深复制，即浅拷贝、深拷贝。

- 浅拷贝
  复制对象的属性，其值是基本类型时，复制值；其值是对象类型时，复制对象的引用。
  实现方案：Object.assign(target, origin)、展开运算符`...`、Array.prototype.slice()、Array.prototype.concat()
- 深拷贝
  复制对象的属性，其值是基本类型时，复制值；其值是对象类型时，复制整个对象。
  实现方案：JSON.parse(JSON.stringify(obj))、lodash.cloneDeep()、递归实现等

> Object.assign() 是使用`=`操作符来赋值，所以源对象属性的一些特性（比如writable）不会被复制到目标对象。
>
> JSON.parse(JSON.stringify(obj))方法深拷贝对象需要是JSON安全的对象。像拷贝循环引用、重复引用、包含正则等等的对象就会有问题。

### 属性描述符

 ES5之前，JavaScript语言本身没有提供可以直接检测属性特性的方法，ES5开始，所有的属性都具备了属性描述符。

属性描述符包括 configurable、enumerable、value、writable、get、set。

数据描述符可拥有的键值： configurable、enumerable、value、writable。

访问描述符可拥有的键值：configurable、enumerable、get、set。

如果一个描述符不具有 value、writable、get 和 set 中的任意一个键，那么它将被认为是一个数据描述符。如果一个描述符同时拥有 value 或 writable 和 get 或 set 键，则会产生一个异常。

在创建普通属性时属性描述符会使用默认值，也可以使用 Object.defineProperty(...) 来添加一个新属性或者修改一个已有属性（如果它是configurable）并对特性进行设置。

```js
var myObject = {};

Object.defineProperty( myObject, "a", {
	value: 2,
	writable: true,
	configurable: true,
	enumerable: true
} );

myObject.a; // 2
```

- writable
  是否可以修改属性的值。
  如果 writable 为 false，但修改属性的值，非严格模式下会静默失败（silently failed）；严格模式下，会抛出一个 TypeError 错误。
- configurable
  属性是否可配置。属性可配置，可以使用 defineProperty() 方法来修改属性标识符。
  如果 configurable 为 false，修改属性标识符会抛出一个 TypeError 错误。注意，有一个例外，configurable 为 false 时也可以将 writable 的状态由 true 改为 false，但是无法由 false 改为 true。
- enumerable
  是否可枚举。当为 true 时，该属性才会出现在对象的枚举属性中。

### 不变性

有时会希望属性或对象是不可改变的，ES5中可以通过很多方法来实现。

注意，所有的方法创建的都是浅不变性，即它们只会影响目标对象和它的直接属性。如果目标对象引用了其他对象，其他对象的内容不受影响，仍然是可变的。

#### 1. 对象常量

设置标识符 writable: false、configurable: false 就可以创建一个真正的常量属性。

```js
var myObject = {};

Object.defineProperty( myObject, "FAVORITE_NUMBER", {
	value: 42,
	writable: false,
	configurable: false
} );
```

#### 2. 禁止扩展

使用 Object.preventExtensions() 来禁止有个对象添加新属性并且保留已有属性。

```js
var myObject = {
	a: 2
};

Object.preventExtensions( myObject );

myObject.b = 3;
myObject.b; // undefined
```

非严格模式下，创建属性b会静默失败；严格模式下，会抛出 TypeError 错误。

#### 3.密封

使用 Object.seal() 创建一个“密封”对象，这个方法实际上会在一个现有对象上调用 Objec.preventExtensions() 并把所有现有属性标记为 configurable: false。

因此，密封后不能添加新属性，也不能配置或删除现有属性，但是可以修改属性的值（如果对象的writable为true）。

#### 4. 冻结

使用 Object.freeze() 会创建一个冻结对象，这个方法实际上会在一个现有对象上调用 Object.seal() 并把所有“数据访问”属性标记为 writable:false，这样就无法修改它们的值。

这个方法是可以应用在对象上的级别最高的不可变性，它会禁止对于对象本身以及任意直接属性的修改，不过，这个对象引用的其他对象是不受影响的。

你可以“深度冻结”一个对象，即递归调用 Object.freeze() 冻结对象的对象属性。不过，要注意是否会有副作用，很有可能会在无意中冻结其他（共享）对象。

### [[Get]] 和 [[Put]]

#### [[Get]]

当我们进行对象属性的取值时，实际上是调用了对象默认的内置 [[Get]] 操作。[[Get]] 操作首先在对象中查找是否有名称相同的属性，如果找到就会返回这个属性的值。

如果没有找到名称相同的属性，[[Get]] 操作会遍历可能存在的原型链，查找是否有名称相同的属性，找到就返回。

如果最后没有找到名称相同的属性，[[Get]] 操作会返回值 undefined。

#### [[Put]]

你可能会认为给对象属性的赋值时，会触发[[Put]]来设置或创建这个属性。但实际不完全是这样。

[[Put]] 被触发时，实际的行为取决于许多因素，最重要的因素是对象中是否已经存在这个属性。如果已经存在这个属性，[[Put]]算法大致会检查下面这些内容：

1. 属性是否是访问描述符？如果是并且存在setter就调用setter。
2. 属性的数据描述符中 writable 是否是 false？如果是，非严格模式下静默失败，在严格模式下抛出 TypeError 异常。
3. 如果都不是，将该值设置为属性的值。

如果对象中不存在这个属性，[[Put]] 操作会更加复杂。可以参考原型链部分。

### Getter 和 Setter

ES5 中可以使用 getter 和 setter 部分改写默认操作，但是只能应用在单个属性上，无法应用在整个对象上。getter 是一个隐藏函数，会在获取属性值时调用。setter 也是一个隐藏函数，会在设置属性时调用。

属性描述符包括 configurable、enumerable、value、writable、get、set。

当你给一个属性定义 getter、setter 或者两者都有时，这个属性会被定义为“访问描述符”（和“数据描述符”相对）。对于访问描述符，JS 会忽略它们的 value 和 writable特性，关注的是 set、get、configurable、enumerable特性。

可以通过 Object.defineProperty() 定义单个属性的 getter 和 setter。它们会覆盖属性默认的取值、赋值操作。通常 getter 和 setter 是成对出现的（只定义一个通常会产生意料之外的行为）。

```js
var myObject = {
	// 为 `a` 定义 getter
	get a() {
		return this._a_;
	},
	// 为 `a` 定义 setter
	set a(val) {
		this._a_ = val * 2;
	}
};

myObject.a = 2;
myObject.a; // 4
```

### 存在性

- `in` 操作符
  检查属性是否在对象及其原型链中，返回一个布尔值。
- `Object.prototype.hasOwnProperty(key)`
  检查属性是否在对象中，返回一个布尔值，不会检查原型链。
- `for..in`循环
  遍历对象的可枚举属性列表，包括原型链。
- `Object.prototype.propertyIsEnumerable(key)`
  检查给定的属性名是否直接存在于对象中并且满足 enumerable:true，返回一个布尔值，不会检查原型链。
- `Object.keys(obj)`
  返回一个数组，包含对象所有可枚举的属性，不会查找原型链。
- `Object.getOwnPropertyNames(obj)`
  返回一个数组，包含对象的所有属性，无论它们是否可枚举，不会查找原型链。

```js
function SuperObj() {
	return { ss: 24 };
}

var myObject = {};
myObject.__proto__ = new SuperObj();

Object.defineProperty(myObject, "a",
	// 使 `a` 可枚举，如一般情况
	{ enumerable: true, value: 2 }
);

Object.defineProperty(myObject, "b",
	// 使 `b` 不可枚举
	{ enumerable: false, value: 3 }
);

console.log('myObject.b', myObject.b); // 3
console.log('"b" in myObject', "b" in myObject); // true
console.log('myObject.hasOwnProperty("b") -- ', myObject.hasOwnProperty("b")); // true


for (var k in myObject) {
	console.log( k, myObject[k] );
}
// "a" 2
// "ss" 24

console.log(myObject.propertyIsEnumerable("a"), myObject.propertyIsEnumerable("b")); // true false

console.log("Object.keys -- ", Object.keys(myObject)); // ["a"]
console.log("Object.getOwnPropertyNames -- ", Object.getOwnPropertyNames(myObject)); // [a", "b"]
```

目前并没有内置的方法可以获取 `in` 操作符使用的属性列表，不过可以递归遍历对象的整条原型链并保存每一层中的 Object.getOwnPropertyNames() 数组。



## 参考链接

[第三章: 对象](https://github.com/getify/You-Dont-Know-JS/blob/1ed-zh-CN/this %26 object prototypes/ch3.md)

[JavaScript 标准内置对象- JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects)

[Object.defineProperty() - JavaScript - MDN Web Docs - Mozilla](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

