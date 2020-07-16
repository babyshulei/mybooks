# 闭包

> It's a tree falling in the forest with no one around to hear it.
>
> 既非风动，亦非幡动，仁者心动耳。

## 概念

当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数在当前词法作用域之外执行。

举个栗子：

```js
function foo() {
    var a = 2;
    function bar() {
        console.log(a);
    }
    return bar;
}

var fn = foo();
fn(); // 2 —— 这就是闭包
```

上面代码，foo() 函数返回内部函数 bar 的引用。因此，fn() 调用时，实际上是通过不同的标识符引用调用了内部函数 bar()，即 bar() 函数在自己定义的词法作用域以外的地方执行。

foo() 在执行完后，通常会期待垃圾回收机制将foo() 的整个内部作用域销毁，释放不再使用的内存空间。而闭包会阻止垃圾回收，由于函数 bar 是在 foo() 内部定义的，它拥有涵盖 foo() 内部作用域的闭包，使得该作用域能够一直存活，以供 bar() 在之后任何时间进行引用。

bar() 依然持有对该作用域的引用，而这个引用就叫做闭包。

这个函数在定义时的词法作用域以外的地方被调用，闭包使得函数可以继续访问定义时的词法作用域。

**无论通过何种手段将内部函数传递到所在的词法作用域以外，它都会持有对原始定义作用域的引用，无论在何处执行这个函数都会使用闭包。**



## 使用场景

代码中到处都是闭包！

例如：

```js
function wait(msg) {
    setTimeout(function timer() {
        console.log(msg)
    }, 1000);
}
wait('Hello world!');
```

本质上无论何时何地，如果将（访问它们各自词法作用域的）函数当做第一级的值类型并到处传递，就可以看到闭包在这些函数中的应用。

在定时器、事件监听器、Ajax请求、跨窗口通信、Web Workers 或者任何其他的异步（或者同步）任务中，只要使用了回调函数，实际上就是在使用闭包！

### 循环和闭包

先来看一个例子：

```js
for(var i = 1; i <= 5; i++) {
    setTimeout(function () {
        console.log(i);
    }, i * 100);
}
```

控制台会输出 5 个 6，和预期不符。这是因为循环中的 5 个函数被封闭在一个共享的全局作用域中，实际上只有一个 i，在函数运行时 i = 6。

ES5时代是采用 IIFE 来解决的，因为 IIFE 会通过声明并立即执行一个函数来创建作用域。

```js
for(var i = 1; i <= 5; i++) {
	(function (j) {
        setTimeout(function () {
            console.log(j);
        }, j * 100);
    })(i);
}
```

ES6时代有了块级作用域，可以通过 let 声明解决这个问题啦！

```js
for(let i = 1; i <= 5; i++) {
    setTimeout(function () {
        console.log(i);
    }, i * 100);
}
```

for 循环头部的 let 声明，会在每次迭代中进行 let 声明，每次迭代都会使用上一个迭代结束时的值初始化变量，而 let 声明的作用域为块级作用域，即每次循环都会有一个块级作用域。

就问你，块级作用域 + 闭包，香不香？！

### 模块

利用闭包，可以将JavaScript 代码模块化。

例如：

```js
function CoolModule() {
	var something = 'cool';
	var another = [1, 2, 3];

	function doSomething() {
		console.log(something);
	}

	function doAnother() {
		console.log(another.join(' ! '));
	}

	return {
		doSomething: doSomething,
		doAnother: doAnother
	};
}

var foo = CoolModule();

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3
```

模块模式需要具备两个必要条件：

1. 必须有一个外部的封闭函数，而且它必须至少被调用一次（每次调用都会创建一个新的模块实例）。
2. 封闭函数必须返回至少一个内部函数，这样内部函数才能在私有作用域中形成闭包，并且可以访问或者修改私有的状态。

模块也是普通的函数，可以接受参数。可以将模块返回的对象实例看作模块的公共API。

ES6 引入了 Modules，官方模块化方案，通过 import、export进行导入导出模块。



## 参考链接

[第五章：作用域闭包](https://github.com/getify/You-Dont-Know-JS/blob/1ed-zh-CN/scope %26 closures/ch5.md)

