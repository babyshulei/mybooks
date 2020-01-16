# 函数作用域和块作用域

> 2019.12.24 @wsl

## 1. 函数中的作用域

 JavaScript 具有基于函数的作用域，意味着每声明一个函数都会为其自身创建一个气泡，属于这个函数的全部变量都可以在整个函数的范围内使用及复用（事实上在嵌套的作用域中也可以使用）。

作用：

- 封装性，隐藏内部实现
- 规避命名冲突，模块管理



> 区分函数声明和表达式最简单的方法是看 function 关键字出现在声明中的位置（不仅仅是一行代码，而是整个声明中的位置）。如果 function 是声明中的第一个词，那么就是一个函数声明，否则就是一个函数表达式。
>
> eg. function foo() {...} 是函数声明，(function foo(){}) 是函数表达式。



## 2. 块作用域

尽管函数作用域是最常见的作用域单元，当然也是现行大多数 JavaScript 中最普遍的设计方法，但其他类型的作用域单元也是存在的，并且通过使用其他类型的作用域单元甚至可以实现维护起来更加优秀、简洁的代码。

JS中的块作用域存在如下： 

### with

用 with 从对象中创建出的作用域仅在 with 声明中而非外部作用域中有效。 

### try/catch

try/catch 的 catch 分句会创建一个块作用域，其中声明的变量仅在 catch 内部有效。

```javascript
try {
    // do something
} catch(err) {
    console.log(err); // 能够正常执行
}
console.log(err); // ReferenceError: err not found
```

### let

let 关键字可以将变量绑定到所在的任意作用域中（通常是 { .. } 内部）。换句话说， let 为其声明的变量隐式地劫持了所在的块作用域。 

可以显式创建块作用域，使变量的附属关系变得更加清晰。 也有助于JS引擎进行垃圾回收。例如：

```javascript
function process(data) {
	// 在这里做点有趣的事情
}
// 在这个块中定义的内容完事可以销毁！
{
	let someReallyBigData = { .. };
	process( someReallyBigData );
}
var btn = document.getElementById( "my_button" );
btn.addEventListener( "click", function click(evt){
	console.log("button clicked");
}, /*capturingPhase=*/false );
```

### const

除了 let 以外， ES6 还引入了 const，同样可以用来创建块作用域变量，但其值是固定的（常量）。之后任何试图修改值的操作都会引起错误。 

