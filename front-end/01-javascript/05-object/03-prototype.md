# 原型

许多面向对象语言都支持两种继承方式：接口继承和实现继承。接口继承只继承方法签名，而实现继承则继承实际的方法。

ECMAScript 没有接口的概念，只支持实现继承，实现继承主要是依靠原型链来实现的。

## 原型

几乎任何对象有一个[[Prototype]]内置属性，在标准中，这是一个隐藏属性。该属性指向的是这个对象的原型。大多数浏览器支持通过`__proto__`访问。

创建了一个新函数，就会根据一组特定的规则为该函数创建一个prototype属性，这个属性指向函数的原型对象（`Person.prototype`）。

通过函数创建的实例，包含一个指向原型对象的内部指针（`__proto__`属性）。（`person.__proto__ 指向 Person.prototype`）

例如：

```js
function Person() {}

var person = new Person();

console.log(person.__proto__ === Person.prototype); // true
console.log(person.__proto__.__proto__ === Object.prototype); // true
console.log(Person.__proto__ === Function.prototype); // true
```

### 构造函数

默认情况下，所有的原型对象都会自动获得一个constructor属性，这个属性是指向所在的函数指针，这是一个公有并且不可枚举的属性。

例如，创建了一个Person函数，那么 Person.prototype.constructor 指向 Person。

```js
function Person() {}

var person = new Person();

console.log(Person.prototype.constructor === Person); // true
console.log(person.constructor === Person); // true
```

实际上，函数本身并不是构造函数，然而在通过 new 调用时，就会把这个函数调用变成一个“构造函数调用”。new 会劫持所有普通函数并用构造对象的形式来调用它。

即使函数只是一个普通函数，但是使用 new 调用时，也会构造一个对象并返回。

```js
function Nothing() {
    console.log('The End!');
}

var a = new Nothing();
// The End!
console.log(a); // Nothing {}
```

`.constructor` 并不是一个不可变的属性。它是不可枚举的，但是它的值是可写的。也就是说开发者可以任意对其赋值，对象的 `.constructor` 属性是不可靠的。通常来说要尽量避免使用这些引用。

### 显式原型，隐式原型

1. 每个函数function都有一个prototype，即显式原型（属性）
2. 每个实例对象都有一个`__proto__`，可称为隐式原型（属性）
3. 对象的隐式原型的值为其对应构造函数的显式原型的值

区别：

`__proto__`是每个对象都有的一个属性，而prototype是函数才会有（函数也有`__proto__`）的属性。

`__proto__`指向的是当前对象的原型对象，而prototype指向它的构造函数的原型对象。

> 注意：`__proto__` 属性和 constructor 属性类似，实际上并不存在于正在使用的对象中，而是存在于内置的 Object.prototype 中，为不可枚举的属性。
>
> `__proto__` 是可设置属性，使用ES6方法 `Object.setPrototypeOf()` 可以进行设置。

### 总结

- 实例.`__proto__` === 原型
- 实例.constructor === 构造函数
- 原型.constructor === 构造函数
- 构造函数.prototype === 原型

示例：

```js
var obj = new Object();
console.log(obj.__proto__ === Object.prototype); // true
console.log(obj.constructor === Object); // true
console.log(Object.prototype.constructor === Object); // true
console.log(obj.constructor.prototype === Object.prototype); // true
```

## 原型链

基本思想：利用原型让一个引用类型继承另一个引用类型的属性和方法。

每个实例对象（ object ）都有一个私有属性（称之为 `__proto__` ）指向它的构造函数的原型对象（**prototype** ）。该原型对象也有一个自己的原型对象( `__proto__` ) ，层层向上直到一个对象的原型对象为 `null`。根据定义，`null` 没有原型，并作为这个**原型链**中的最后一个环节。

例如：

```js
function Person() {}

var person = new Person();

console.log(person.__proto__ === Person.prototype); // true
console.log(person.__proto__.__proto__ === Object.prototype); // true
console.log(person.__proto__.__proto__.__proto__ === null); // true
```

获取一个对象的原型链：[Object.getPrototypeOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/GetPrototypeOf)

```js
function Person() {}
var person = new Person();
Object.getPrototypeOf(person) === Person.prototype // true
```



### 属性设置和屏蔽

给一个对象设置属性并不仅仅是添加一个新属性或者修改已有的属性值。其具体过程如下：

```js
myObject.foo = 'bar';
```

- 如果 myObjec 对象中包含名为 foo 的普通数据访问器属性，这条赋值语句只会修改已有的属性值。

- 如果 foo 不是直接存在于 myObject 中，会遍历原型链，如果原型链上找不到 foo 属性，foo 就会被直接添加到 myObject 上。

- 如果 foo 存在于原型链上层，这时有三种情况：

  1. 如果在原型链上层存在名为 foo 的普通数据访问属性而且没有被标记为只读，那就会直接在 myObject 中添加一个名为 foo 的新属性，它是屏蔽属性。

  2. 如果在原型链上层存在 foo，但是它被标记为只读（writable: false），那么无法修改已有属性或者在 myObject 上创建屏蔽属性。如果运行在严格模式下，代码会抛出一个错误。否则，这条赋值语句会被忽略。

  3. 如果在原型链上层存在foo并且它是一个setter，那就会调用这个setter。foo不会被添加到myObject，也不会重新定义 foo 这个 setter。

     > 如果希望 2、3情况下也屏蔽 foo， 那就不能使用 = 操作符来赋值，而是使用 Object.defineProperty() 来向 myObject 添加 foo。

- 如果 foo 属性既出现在 myObject 中也出现在原型链上层，那么就会发生屏蔽。myObject 中包含的 foo 属性会屏蔽原型链上层的所有 foo 属性，因为 myObject.foo 总是会选择原型链中最底层的 foo 属性。

有些情况下会出现隐式屏蔽，例如 `myObject.a++;` 这样的语句相当于进行=赋值，就会产生隐式屏蔽。

### 原型继承

继承意味着复制操作，JavaScript（默认）并不会复制对象属性，而是在两个对象之间创建一个关联，这样一个对象就可以通过委托访问另一个对象的属性和函数。

```js
function Foo(name) {
	this.name = name;
}

Foo.prototype.myName = function() {
	return this.name;
};

function Bar(name,label) {
	Foo.call( this, name );
	this.label = label;
}

// 这里，我们创建一个新的 `Bar.prototype` 链接链到 `Foo.prototype`
Bar.prototype = Object.create( Foo.prototype );

// 注意！现在 `Bar.prototype.constructor` 不存在了，
// 如果需要这个属性的话需要手动“修复”一下。

Bar.prototype.myLabel = function() {
	return this.label;
};

var a = new Bar( "a", "obj a" );

a.myName(); // "a"
a.myLabel(); // "obj a"
```

通过语句 `Bar.prototype = Object.create( Foo.prototype );` 实现 Bar 原型关联到 Foo 原型上。

还有一种方案可以实现原型继承，但是可能会产生一些副作用：

```js
Bar.prototype = new Foo();
```

ES6 添加了辅助函数 `Object.setPrototypeOf()` 方法，可以用标准且可靠的方法来修改关联：

```js
Object.setPrototypeOf(Bar.prototype, Foo.prototype);
```

#### Object.create()

Object.create() 会创建一个新对象并把它关联到我们指定的对象。非常适合进行原型链的处理，并且避免不必要的麻烦（比如使用 new 的构造函数调用会生成 `.prototype` 和 `.constructor` 的引用）。

Object.create() 是 ES5 新增的函数，ES5之前的polyfill代码如下：

```js
if (!Object.create) {
	Object.create = function(o) {
		function F(){}
		F.prototype = o;
		return new F();
	};
}
```

此外，Object.create() 可以接收第二个参数，参数为需要添加到新对象的属性名以及这些属性的属性描述符。

```js
var anotherObject = {
	a: 2
};

var myObject = Object.create( anotherObject, {
	b: {
		enumerable: false,
		writable: true,
		configurable: false,
		value: 3
	},
	c: {
		enumerable: true,
		writable: false,
		configurable: false,
		value: 4
	}
} );

myObject.hasOwnProperty( "a" ); // false
myObject.hasOwnProperty( "b" ); // true
myObject.hasOwnProperty( "c" ); // true

myObject.a; // 2
myObject.b; // 3
myObject.c; // 4
```

> Object.create(null) 会创建一个拥有空原型链的对象，这个对象无法进行委托。由于这个对象没有原型链，所以 instanceof 操作符无法进行判断，会返回false。这种对象不会受到原型链的干扰，非常适合用来存储数据。

### 检查“类”关系

在面向类的语言中，检查一个实例的继承祖先通常被称为内省或反射。

在JavaScript中，如何检查一个对象的“祖先”（委托关联）呢？

方案一：使用 [`instanceof` 运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)。

`instanceof` 运算符用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

```js
function Foo() {
	// ...
}

Foo.prototype.blah = ...;

var a = new Foo();

a instanceof Foo; // true
```

方案二：使用 [`Object.prototype.isPrototypeOf()`方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf)。

`isPrototypeOf()` 方法用于测试一个对象是否存在于另一个对象的原型链上。

```js
Foo.prototype.isPrototypeOf(a); // true
```



## 参考链接

[继承与原型链- JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

[显示原型和隐式原型，手绘原型链，原型链是什么？为什么要有 ...](https://blog.csdn.net/weixin_40387601/article/details/80327955)

