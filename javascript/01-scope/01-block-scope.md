# 块级作用域绑定

> 2018-10-24 @wsl

## 1. var, const, let

- 块级作用域（词法作用域）

  函数内部；块（花括号{}之间的区域）中。

- var声明

  var声明的变量存在变量提升（Hoisting）机制。作用域为函数作用域。


- let声明

  用法与var相同。let声明不会被提升。作用域为块级作用域。

  同一作用域中不能用let重复定义已经存在的标识符，否则会抛出错误。但如果当前作用域内嵌另一个作用域，便可在内嵌的作用域中用 let 声明同名变量。

- const声明

  声明的是常量。通过const声明的常量必须进行初始化，否则会抛出错误。不会被提升。作用域为块级作用域。

  同一作用域中不能用const重复定义已经存在的标识符，否则会抛出错误。

  不可以为const定义的常量再赋值，否则会抛出错误。常量如果是对象，则对象中的值可以修改。

 

## 2. 临时死区（Temporal Dead Zone）

由于let 和 const 声明的变量不会被提升，会有“临时死区”的场景出现。 

 ```js
let value = 10;

if (true) {
    console.log(value); // 报错
    let value = 'blue';
}
 ```



## 3. 循环

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

 

## 4. 全局作用域

当 var 被用于全局作用域时，它会创建一个新的全局变量作为全局对象（window）的属性。

当在全局作用域中使用 let 和 const 时，会在全局作用域下创建一个新的绑定，但该绑定不会添加为全局对象的属性。

