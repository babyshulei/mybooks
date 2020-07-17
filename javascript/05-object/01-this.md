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























## 参考链接

[第一章: *this* 是什么](https://github.com/getify/You-Dont-Know-JS/blob/1ed-zh-CN/this %26 object prototypes/ch1.md)

[第二章: *this* 豁然开朗!](https://github.com/getify/You-Dont-Know-JS/blob/1ed-zh-CN/this %26 object prototypes/ch2.md)

