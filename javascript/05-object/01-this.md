# this

## this 概念

1. 为什么要用 `this`？
   `this` 提供了一种更优雅的方式来隐式“传递”一个对象引用，因此可以将 API 设计得更加简洁并且易于复用。

2. 明确：
   `this` 既不指向函数自身，也不指向函数的词法作用域。
   `this` 是在运行时进行绑定的，它的上下文取决于函数调用时的各种条件。`this` 的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。

3. this 概念：
   当一个函数被调用时，会创建一个活动记录（有时也称为可执行上下文）。这个记录会包含函数在哪里被调用（调用栈）、函数的调用方式、传入的参数等信息。`this` 就是这个记录的一个属性，会在函数执行的过程中用到。



## this 绑定过程

this 绑定和函数的调用位置、调用方式直接相关。

调用位置：函数在代码中被调用的位置。需要分析调用栈，调用位置就在当前正在执行的函数的前一个调用中。

找到调用位置后，就可以顺序应用下面四条规则来判断 this 的绑定对象：

1. 由 new 调用？绑定到新创建的对象。（new 绑定）
2. 由 call 或者 apply（或者 bind）调用？绑定到指定的对象。（显式绑定）
3. 由上下文对象调用？绑定到那个上下文对象。（隐式绑定）
4. 默认：在严格模式下绑定到undefined，否则绑定到全局对象。（默认绑定）

绑定例外：

- 被忽略的this
- 间接引用
- 软绑定
- 箭头函数

### 默认绑定

默认绑定规则可以看作是无法应用其他规则时的默认规则。

最常见的，独立函数调用，即直接使用不带任何修饰的函数引用进行调用的，使用默认绑定规则。在非严格模式下，this绑定到全局对象；在严格模式下，this绑定到undefined。

```js
function foo() {
    console.log(this.a, this.b);
}

// 全局作用域下使用 var 声明的变量会绑定到全局对象上
var a = 25;
const b = 33;
foo(); // 25 undefined
```

### 隐式绑定

隐式绑定规则是看调用位置是否有上下文对象，当函数引用有上下文对象时，隐式绑定规则会把函数调用中的this绑定到这个上下文对象。

```js
function foo() {
	console.log( this.a );
}

var obj = {
	a: 2,
	foo: foo
};

obj.foo(); // 2
```

### 显式绑定

函数通过call, apply, bind 进行调用时，会触发显式绑定规则，this 绑定到第一个参数对象上，如果传入的参数是一个原始值，这个原始值会被转换成它的对象形式（分别是 `new String(..)`，`new Boolean(..)`，或 `new Number(..)`，通常被称为“装箱”）。

```js
function foo() {
	console.log( this.a );
}

var obj = {
	a: 2
};

foo.call( obj ); // 2
```

其中，bind 方法可以避免回调函数导致的绑定丢失问题，它被称为“硬绑定”。

```js
function foo() {
	console.log( this.a );
}

var obj = {
	a: 2
};

var bar = function() {
	foo.call( obj );
};

bar(); // 2
setTimeout( bar, 100 ); // 2

// `bar` 将 `foo` 的 `this` 硬绑定到 `obj`
// 所以它不可以被覆盖
bar.call( window ); // 2
```

### new 绑定

使用 new 来调用函数时，会触发 new 绑定。

函数可以用 new 来调用，这种函数调用被称为构造函数调用。使用 new 调用函数时，会自动执行以下操作：

1. 创建（或者说构造）一个全新的对象。
2. 这个新对象会被执行 [[Prototype]] 连接。
3. 这个新对象会绑定到函数调用的 `this`。
4. 如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象。

```js
// new F();
var obj = new Object(); // 创建一个空对象
obj.__proto__ = F.prototype; // obj的__proto__指向构造函数的prototype
var result = F.call(obj); // 把构造函数的this指向obj，并执行构造函数把结果赋值给result
if (typeof(result) === 'object') {
    objB = result; // 构造函数F的执行结果是对象，就把这个引用类型的对象返回给objB
} else {
    objB = obj; // 构造函数F的执行结果不是对象，就返回obj这个对象给objB
}
```

### 优先级

this 绑定的优先级如下：

1. 函数是通过 new 被调用的吗（**new 绑定**）？如果是，this 绑定的是新创建的对象。

   `var bar = new foo()`

2. 函数是否通过 call 、 apply（**显式绑定**）或者 bind 硬绑定调用？如果是，this 绑定的是指定的对象。

   `var bar = foo.call( obj2 )`

3. 函数是否在某个上下文对象中调用（**隐含绑定**）？如果是，this 绑定的是那个上下文对象。

   `var bar = obj1.foo()`

4. 如果都不是的话，使用**默认绑定**。如果在严格模式下，就绑定到 undefined，否则绑定到全局对象。

   `var bar = foo()`

### 绑定例外

#### 被忽略的this

如果把 null 或者 undefined 作为 this 的绑定对象传入 call、apply 或者 bind，这些值在调用时会被忽略，实际应用的是默认绑定规则。

```js
function foo() {
	console.log( this.a );
}

var a = 2;
foo.call( null ); // 2
```

传入 null 的常见场景： 使用 apply() 来展开一个数组（ES6 可以用展开运算符...替代）；使用 bind 对参数进行柯里化（预先设置一些参数）。

```js
function foo(a,b) {
	console.log( "a:" + a + ", b:" + b );
}

// 将数组散开作为参数
foo.apply( null, [2, 3] ); // a:2, b:3

// 用 `bind(..)` 进行柯里化
var bar = foo.bind( null, 2 );
bar( 3 ); // a:2, b:3
```

> 通过 null 来忽略 this 绑定可能产生一些副作用。如果某个函数确实使用了 this，那默认绑定规则会把 this 绑定到全局对象，这将导致不可预计的后果（比如修改全局对象）。
>
> 为了避免这种情况，我们可以创建一个“DMZ”（demilitarized zone，非军事区）对象——一个空的非委托对象，来替代 null 作为第一个对象传入 call、apply、bind 方法中。

#### 间接引用

如果函数是“间接引用”的，这种情况下，调用这个函数会应用默认绑定规则。

```js
function foo() {
	console.log( this.a );
}

var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };

o.foo(); // 3
(p.foo = o.foo)(); // 2
```

#### 软绑定

硬绑定可以把this强制绑定到指定的对象，防止函数调用应用默认绑定规则。但是，它会大大降低函数的灵活性，使用硬绑定后无法使用隐式绑定或显式绑定来修改this。

如果可以给默认绑定指定一个全局对象和undefined以外的值，那就可以实现和硬绑定相同的效果，同时保留隐式绑定或者显式绑定修改this的能力。

软绑定就是要实现这样的效果：

```js
if (!Function.prototype.softBind) {
	Function.prototype.softBind = function(obj) {
		var fn = this,
			curried = [].slice.call( arguments, 1 ),
			bound = function bound() {
				return fn.apply(
					(!this || this === (window || global)) ?
                    	obj : this,
					curried.concat.apply(curried, arguments)
				);
			};
		bound.prototype = Object.create(fn.prototype);
		return bound;
	};
}
```

#### 箭头函数

ES6 定义了一种特殊函数类型：箭头函数。箭头函数不使用 this 的四种标准规则，而是根据外层（函数或者全局）作用域来决定 this。

箭头函数的this绑定无法被修改。箭头函数可以调用 call、apply、bind方法，但是 this 不受影响。



## 参考链接

[第一章: *this* 是什么](https://github.com/getify/You-Dont-Know-JS/blob/1ed-zh-CN/this %26 object prototypes/ch1.md)

[第二章: *this* 豁然开朗!](https://github.com/getify/You-Dont-Know-JS/blob/1ed-zh-CN/this %26 object prototypes/ch2.md)

[Object.create()、new Object()和{}的区别- 掘金](https://juejin.im/post/5d578bacf265da03ee6a548a)