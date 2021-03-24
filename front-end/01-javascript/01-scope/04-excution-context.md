# 执行上下文

JavaScript 标准把一段代码（包括函数），执行所需的所有信息定义为：“执行上下文”。

## 演进

执行上下文在 ES3 中，包含三个部分。

- scope：作用域，也常常被叫做作用域链。
- variable object：变量对象，用于存储变量的对象。
- this value：this 值。

在 ES5 中，我们改进了命名方式，把执行上下文最初的三个部分改为下面这个样子。

- lexical environment：词法环境，当获取变量时使用。
- variable environment：变量环境，当声明变量时使用。
- this value：this 值。

在 ES2018 中，执行上下文又变成了这个样子，this 值被归入 lexical environment，但是增加了不少内容。

- lexical environment：词法环境，当获取变量或者 this 值时使用。
- variable environment：变量环境，当声明变量时使用。
- code evaluation state：用于恢复代码执行位置。
- Function：执行的任务是函数时使用，表示正在被执行的函数。
- ScriptOrModule：执行的任务是脚本或者模块时使用，表示正在被执行的代码。
- Realm：使用的基础库和内置对象实例。
- Generator：仅生成器上下文有这个属性，表示当前生成器。

### Realm

Realm 中包含一组完整的内置对象，而且是复制关系。

对不同 Realm 中的对象操作，会有一些需要格外注意的问题，比如 instanceOf 几乎是失效的。

```js
var iframe = document.createElement('iframe')
document.documentElement.appendChild(iframe)
iframe.src="javascript:var b = {};"

var b1 = iframe.contentWindow.b;
var b2 = {};

console.log(typeof b1, typeof b2); //object object
console.log(b1 instanceof Object, b2 instanceof Object); //false true
```

可以看到，由于 b1、 b2 由同样的代码“ {} ”在不同的 Realm 中执行，所以表现出了不同的行为。

## 执行上下文的类型

JS 中有三种执行上下文类型。

- **全局执行上下文**
  默认的、最基础的执行上下文。只有一个，浏览器中全局对象为window对象，this指向这个全局对象。
- **函数执行上下文**
  每当一个函数被调用时，都会为该函数创建一个新的上下文。每个函数都拥有自己的执行上下文，但是只有**在函数被调用时才会被创建**。
- **eval 函数执行上下文**
  运行在 `eval` 函数中的代码也获得了自己的执行上下文。



## 执行栈

执行栈，也叫调用栈，具有 LIFO（后进先出）结构，用于存储在代码执行期间创建的所有执行上下文。

首次运行JS代码时，会创建一个**全局**执行上下文并Push到当前的执行栈中。每当发生函数调用，引擎都会为该函数创建一个**新的函数**执行上下文并Push到当前执行栈的栈顶。

根据执行栈LIFO规则，当栈顶函数运行完成后，其对应的**函数**执行上下文将会从执行栈中Pop出，上下文控制权将移到当前执行栈的**下一个**执行上下文。



## 生命周期

执行上下文的生命周期包括三个阶段：创建阶段 → 执行阶段 → 回收阶段

### 创建阶段

创建阶段即当函数被调用，但未执行任何其内部代码之前

创建阶段做了三件事：

- 确定 this 的值，也被称为 `This Binding`
- LexicalEnvironment（词法环境） 组件被创建
- VariableEnvironment（变量环境） 组件被创建

```js
ExecutionContext = {  
  ThisBinding = <this value>,     // 确定this 
  LexicalEnvironment = { ... },   // 词法环境
  VariableEnvironment = { ... },  // 变量环境
}
```

#### This Binding

确定`this`的值我们前面讲到，`this`的值是在执行的时候才能确认，定义的时候不能确认

#### 词法环境

词法环境有两个组成部分：

- 全局环境：是一个没有外部环境的词法环境，其外部环境引用为`null`，有一个全局对象，`this` 的值指向这个全局对象
- 函数环境：用户在函数中定义的变量被存储在环境记录中，包含了`arguments` 对象，外部环境的引用可以是全局环境，也可以是包含内部函数的外部函数环境

伪代码：

```js
GlobalExectionContext = {  // 全局执行上下文
  LexicalEnvironment: {       // 词法环境
    EnvironmentRecord: {     // 环境记录
      Type: "Object",           // 全局环境
      // 标识符绑定在这里 
      outer: <null>           // 对外部环境的引用
  }  
}

FunctionExectionContext = { // 函数执行上下文
  LexicalEnvironment: {     // 词法环境
    EnvironmentRecord: {    // 环境记录
      Type: "Declarative",      // 函数环境
      // 标识符绑定在这里      // 对外部环境的引用
      outer: <Global or outer function environment reference>  
  }  
}
```

#### 变量环境

变量环境也是一个词法环境，因此它具有上面定义的词法环境的所有属性。

在 ES6 中，词法环境和变量环境的区别在于前者用于存储函数声明和变量（ `let` 和 `const` ）绑定，而后者仅用于存储变量（ `var` ）绑定。

> 词法环境和变量环境的区别：
>
> 在 ES5中，词法环境和变量环境的区别在于前者是会根据代码执行上下文变化，而变量环境主要是用来存储var声明和函数声明的绑定。可以理解为词法环境是动态的，而变量环境是静态的，通常两种环境是相同的，但是某些情况会有差别，如try-catch语句。
>
> 在 ES6 中，词法环境和变量环境的区别在于前者用于存储函数声明和变量（ `let` 和 `const` ）绑定，而后者仅用于存储变量（ `var` ）绑定。同样，词法环境是跟随代码动态更新的，变量环境仍然为静态的绑定。
>
> 词法环境是标识用于解析代码执行上下文标识符引用。如 let、const等声明在这里，会有块级作用域的概念。
>
> 变量环境是标识执行上下文中用来存储var声明的绑定，其作用域为函数作用域。
>
> 参见：
>
> [Variable Environment vs lexical environment - stackoverflow](https://stackoverflow.com/questions/23948198/variable-environment-vs-lexical-environment)
>
> [Clarity on the difference between “LexicalEnvironment” and “VariableEnvironment” in ECMAScript/JavaScript - stackoverflow](https://stackoverflow.com/questions/15031667/clarity-on-the-difference-between-lexicalenvironment-and-variableenvironment)

示例：

```js
let a = 20;  
const b = 30;  
var c;

function multiply(e, f) {  
 var g = 20;  
 return e * f * g;  
}

c = multiply(20, 30);
```

执行上下文如下：

```js
GlobalExectionContext = {

  ThisBinding: <Global Object>,

  LexicalEnvironment: {  // 词法环境
    EnvironmentRecord: {  
      Type: "Object",  
      // 标识符绑定在这里  
      a: < uninitialized >,  
      b: < uninitialized >,  
      multiply: < func >  
    }  
    outer: <null>  
  },

  VariableEnvironment: {  // 变量环境
    EnvironmentRecord: {  
      Type: "Object",  
      // 标识符绑定在这里  
      c: undefined,  
    }  
    outer: <null>  
  }  
}

FunctionExectionContext = {  
   
  ThisBinding: <Global Object>,

  LexicalEnvironment: {  
    EnvironmentRecord: {  
      Type: "Declarative",  
      // 标识符绑定在这里  
      Arguments: {0: 20, 1: 30, length: 2},  
    },  
    outer: <GlobalLexicalEnvironment>  
  },

  VariableEnvironment: {  
    EnvironmentRecord: {  
      Type: "Declarative",  
      // 标识符绑定在这里  
      g: undefined  
    },  
    outer: <GlobalLexicalEnvironment>  
  }  
}
```

留意上面的代码，`let`和`const`定义的变量`a`和`b`在创建阶段没有被赋值，但`var`声明的变量从在创建阶段被赋值为`undefined`。

这是因为，创建阶段，会在代码中扫描变量和函数声明，然后将函数声明存储在环境中。

但变量会被初始化为`undefined`(`var`声明的情况下)和保持`uninitialized`(未初始化状态)(使用`let`和`const`声明的情况下)。

这就是变量提升的实际原因。

通过 `outer` 属性，进行作用域链的查找。

### 执行阶段

在这阶段，执行变量赋值、代码执行

如果 `Javascript` 引擎在源代码中声明的实际位置找不到变量的值，那么将为其分配 `undefined` 值

### 回收阶段

执行上下文出栈等待虚拟机回收执行上下文



## 参考链接

[JavaScript执行（二）：闭包和执行上下文到底是怎么回事？-  极客时间](https://time.geekbang.org/column/article/83302)

[JavaScript 执行上下文（ES3版 与 ES5版）](https://juejin.cn/post/6844904105832382477)

[JS：深入理解JavaScript-执行上下文](https://limeii.github.io/2019/05/js-execution-context/)

[[译] 理解 JavaScript 中的执行上下文和执行栈](https://juejin.cn/post/6844903682283143181)

[理解Javascript中的执行上下文和执行栈](https://zhuanlan.zhihu.com/p/107552264)

