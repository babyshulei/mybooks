# 块级作用域绑定

> 2018-10-24 @wsl

## 块级作用域

函数内部；块（花括号{}之间的区域）中。

### 函数作用域

 JavaScript 具有基于函数的作用域，意味着每声明一个函数都会为其自身创建一个气泡，属于这个函数的全部变量都可以在整个函数的范围内使用及复用（事实上在嵌套的作用域中也可以使用）。

作用：

- 隐藏内部实现，遵循最小特权原则
- 规避命名冲突，全局命名空间、模块管理两种方案



> 区分函数声明和表达式最简单的方法是看 function 关键字出现在声明中的位置（不仅仅是一行代码，而是整个声明中的位置）。如果 function 是声明中的第一个词，那么就是一个函数声明，否则就是一个函数表达式。
>
> eg. function foo() {...} 是函数声明，(function foo(){}) 是函数表达式。

### 块作用域

块：花括号{}之间的区域。块作用域存在于块中。

块作用域是根据最小授权原则进行扩展的，将代码从在函数中隐藏信息扩展为在块中隐藏信息。

JS中的块作用域存在如下：

- with
- try/catch
- let
- const

#### with

用 with 从对象中创建出的作用域仅在 with 声明中而非外部作用域中有效。 

#### try/catch

try/catch 的 catch 分句会创建一个块作用域，其中声明的变量仅在 catch 内部有效。

```javascript
try {
    // do something
} catch(err) {
    console.log(err); // 能够正常执行
}
console.log(err); // ReferenceError: err not found
```

#### var, const, let

- var声明

  var声明的变量存在变量提升（Hoisting）机制。作用域为函数作用域。

- let声明

  用法与var相同。let声明不会被提升。作用域为块级作用域。

  同一作用域中不能用let重复定义已经存在的标识符，否则会抛出错误。但如果当前作用域内嵌另一个作用域，便可在内嵌的作用域中用 let 声明同名变量。

- const声明

  声明的是常量。通过const声明的常量必须进行初始化，否则会抛出错误。不会被提升。作用域为块级作用域。

  同一作用域中不能用const重复定义已经存在的标识符，否则会抛出错误。

  不可以为const定义的常量再赋值，否则会抛出错误。常量如果是对象，则对象中的值可以修改。



可以显式创建块作用域，使变量的附属关系变得更加清晰。 也有助于JS引擎进行垃圾回收。例如： 

```js
function process(data) {
	// 在这里做点有趣的事情
}

var someReallyBigData = { .. };
process( someReallyBigData );

var btn = document.getElementById( "my_button" );
// click函数形成了一个覆盖整个作用域的闭包，JS引擎很可能依旧保留 someReallyBigData（取决于具体实现）
btn.addEventListener( "click", function click(evt) {
	console.log("button clicked");
}, false );

/**********************改进***********************/
// 在这个块中定义的内容完事可以销毁！
{
	let someReallyBigData = { .. };
	process( someReallyBigData );
}
```



## 提升

JS引擎在程序运行前会进行编译，编译阶段会进行声明查找，关联对应作用域的工作。期间 var声明的变量和函数声明都会被“移动”到当前作用域的最顶端，这个过程就叫做提升。

每个作用域都会进行提升操作。函数声明会被提升，但是函数表达式不会被提升。即使是具名的函数表达式，名称标识符在赋值之前也无法在所在作用域中使用：

```js
foo(); // TypeError
bar(); // ReferenceError
var foo = function bar() {};
```

代码经过提升后，实际会变为：

```js
var foo;
foo(); // TypeError
bar(); // ReferenceError
foo = function bar() {
	var bar = ...self...
};
```

函数声明和变量声明都会被提升，而函数声明会被提升到普通变量之前。

重复的var声明会被忽略掉，但出现在后面的函数声明是可以覆盖前面的函数声明的。

一个普通块内部的函数声明通常会被提升到所在作用域的顶部，例如：

```js
foo(); // TypeError: foo is not a function
var a = true;
if (a) {
    function foo() { console.log('a') };
} else {
    function foo() { console.log('b') };
}
```

注意这个行为并不可靠，在JavaScript未来的版本中有可能发生改变，因此应该尽可能避免在块内部声明函数。

测试1：

考虑下面场景的输出是什么。

```js
// 场景一
foo();
var foo;
function foo() { console.log(1) }
foo = function() { console.log(2) }
// 场景二
foo();
function foo() { console.log(1) }
var foo = function() { console.log(2) }
function foo() { console.log(3) }
```



## 临时死区（Temporal Dead Zone）

JS引擎在扫描代码发现变量声明时，var声明会提升到作用域顶部，let/const声明会放到TDZ中。访问TDZ变量会触发运行时错误。只有执行过变量声明语句后，变量才会从TDZ中移出，然后方可正常访问。

```js
let value = 10;

if (true) {
    console.log(value);
    let value = 'blue'; // Uncaught ReferenceError: Cannot access 'value' before initialization
}
```

由于let 和 const 声明的变量不会被提升，如果在声明之前访问这些变量，会触发引用错误，即“临时死区”的场景出现。



## 循环

循环中的块级作用域：可以用 let 实现。

- 循环中的函数

  var 时代，计数器变量无法直接调用保存，采用IIFE强制生成计数器变量的副本。

  有了let声明后，可以解决这个问题。for 循环、 for-in循环、for-of循环等都可以。

  例子：

  ```javascript
  var funcs = [];
  
  for(var i = 0; i < 10; i++) {
  	funcs.push(function() {
  		console.log(i);
  	});
  }
  
  funcs.forEach(function(func) {
  	func(); // 会打印10个10
  });
  
  // 采用IIFE方法强制生成计数器变量副本解决上述问题
  var funcs = [];
  
  for(var i = 0; i < 10; i++) {
  	funcs.push((function(value) {
  		return function() {
  			console.log(value);
  		}
  	})(i));
  }
  
  funcs.forEach(function(func) {
  	func(); // 会打印0,1,...9
  });
  
  // 使用let声明，let作用域为块级作用域
  var funcs = [];
  
  for(let i = 0; i < 10; i++) {
  	funcs.push(function() {
  		console.log(i);
  	});
  }
  
  funcs.forEach(function(func) {
  	func(); // 会打印0,1,...9
  });
  ```
  
  for 循环头部的 let 不仅将 i 绑定到了 for 循环的块中，事实上它将其重新绑定到了循环的每一个迭代中，确保使用上一个循环迭代结束时的值重新进行赋值。
  
  ```javascript
  for (let i=0; i<10; i++) {
  	console.log( i );
  }
  
  // 等价于
  {
  	let j;
  	for (j=0; j<10; j++) {
  		let i = j; // 每个迭代重新绑定！
  		console.log( i );
  	}
  }
  ```
  
- 循环中的const声明

  可以在初始化变量时使用，但是更改这个变量的值就会抛出错误。

  之所以能用在循环中，是因为每次迭代不会修改已有绑定，而是会创建一个新绑定。

 

## 全局作用域

当 var 被用于全局作用域时，它会创建一个新的全局变量作为全局对象（window）的属性。

当在全局作用域中使用 let 和 const 时，会在全局作用域下创建一个新的绑定，但该绑定不会添加为全局对象的属性。



## 参考链接

[第三章：函数与块儿作用域](https://github.com/getify/You-Dont-Know-JS/blob/1ed-zh-CN/scope %26 closures/ch3.md)

[第四章：提升](https://github.com/getify/You-Dont-Know-JS/blob/1ed-zh-CN/scope %26 closures/ch4.md)



## 附录

- 测试1答案：
  场景一：1
  场景二：3

