# JavaScript

### 作用域

#### 1. 详述es5 es6中的作用域和闭包

es5全局+函数级，函数化闭包，es6块级

##### 变量提升题

给出如下代码的输出并解释原因：

```javascript
var a = 1;

function f() {
    console.log(a);
    var a = 2;
}

f();
```

输出undefined，因为变量定义会提前到函数开头(hoisting)。

##### 对照题：临时死区

```js
let value = 10;

if (true) {
    console.log(value);
    let value = 'blue';
}
```

由于let 和 const 声明的变量不会被提升，如果在声明之前访问这些变量，会触发引用错误，即“临时死区”的场景出现。

#####  什么是作用域链(scope chain)？可举例说明。

几个要点：作用域的范围是函数，函数嵌套函数，查找变量从内层函数依次向外层找，最后找不到在window上找。



### 对象、原型链

#### 1. 写出让B原型继承A的代码。

```javascript
function A() {
    this.a = 1;
}
  
function B() {
    this.b = 2;
}
```

B.prototype = new A; 

#### 2. 什么是原型链(prototype chain)？可举例说明。

上一题的例子

```javascript
var b = new B;
// b.b == 2
// b.a == 1
```

b.b在b自己的属性上找，b.a自己的属性里没找到则去b的原型即b,`__proto__`也就是B.prototype里找，一层一层往上找，到null为止，`b.__proto__.__proto__`是Object.prototype，`b.__proto__.__proto__.__proto__`为null。

#### 3. 数组去重方法

1. 利用for嵌套for，然后splice去重：双层循环，外层循环元素，内层循环时比较值。值相同时，则删去这个值。NaN, {} 没有去重，null会消失。
2. indexOf()：NaN，{}没去重。
3. sort()：利用sort()排序方法，然后根据排序后的结果进行遍历及相邻元素比对。NaN、{}没有去重。
4. includes()：利用includes检测数组是否有某个值，去重。{}没有去重。
5. 利用Set()去重：代码量少，但是无法去掉重复{}。
6. 利用for嵌套for，然后splice去重（ES5中最常用）：双层循环，外层循环元素，内层循环时比较值。值相同时，则删去这个值。NaN, null, {} 的去重会出问题。
7. hasOwnProperty：利用hasOwnProperty 判断是否存在对象属性。完美去重。
8. filter()
9. 递归
10. Map()

[JavaScript数组去重（12种方法，史上最全） - 前端开发随笔 ...](https://segmentfault.com/a/1190000016418021)

[7种方法实现数组去重- 掘金](https://juejin.im/post/5aed6110518825671b026bed)





#### 4. 对象的浅拷贝、深拷贝

##### 浅拷贝

1. Object.assign()
2. Array.prototype.concat()
3. Array.prototype.slice()

##### 深拷贝

1. 递归

   思想：对于简单类型，直接复制。对于引用类型，递归复制它的每一个属性。

2. JSON.parse(JSON.stringify(obj));

   原理就是先将对象转换为字符串，再通过JSON.parse重新建立一个对象。

   但是这种方法的局限也很多：

   - 不能复制function、正则、Symbol
   - 循环引用报错
   - 相同的引用会被重复复制

3. 函数库lodash

[参考笔记](<https://babyshulei.github.io/mybooks/javascript/05-object/01-copy.html>)



### 函数

#### 1. 解释call、apply、bind的区别，可举例说明。

call和apply都是调用一个函数，并指定this和参数，call和apply第一个参数都是指定的this的值，区别在于call第二个参数开始的参数是替换的参数，而apply的第二个参数是一个数组。bind是由一个函数创建一个新函数，并绑定this和部分参数，参数形式和call类似。



#### 2. 箭头函数

##### 箭头函数与function函数有哪些不同？

- 没有this、super、arguments和new.target绑定。

  箭头函数的这些值由外围最近一层非箭头函数决定。

- 不能通过new关键字调用。

  箭头函数没有[[Construct]]方法，所以不能被用作构造函数，如果通过new关键字调用会报错。

- 没有原型。

  由于不可以通过new关键字调用，因为没有构建原型的需求，所以箭头函数不存在prototype这个属性。

- 不可以改变this的绑定。

  函数内部的this值不可被改变，在函数的生命周期内始终保持一致。

- 不支持arguments对象。

  箭头函数没有arguments绑定，只能通过命名参数和不定参数这两种形式访问函数的参数。

- 不支持重复的命名参数。

  在严格、非严格模式下，箭头函数都不支持重复的命名参数；而在传统函数的规定中，只有在严格模式下才不能有重复的命名参数。

> 箭头函数有name属性，和其他函数的规则相同。

##### 箭头函数的this绑定？

箭头函数中没有this绑定，必须通过查找作用域链来决定其值。如果箭头函数被非箭头函数包含，则this绑定的是最近一层非箭头函数的this；否则，this的值会被设置为全局对象。并且，不能通过call()、apply()、bind()方法来改变this的值。



### 事件

#### 1. 描述事件捕获和事件冒泡的顺序。

先从外向内捕获，然后从内向外冒泡。

#### 2. 描述事件委派(delegation)的原理和优点。

原理是在容器节点上绑定事件，利用冒泡，判断事件是否在匹配指定的选择器的节点上被触发。优点是只用绑定一次，不用对每个目标做绑定，还有对动态插入的节点也生效，无需重新绑定。

#### 3. 有哪些触屏事件？

touchstart，touchmove，touchend，touchcancel

####  4. 为什么老版本的webkit的click事件有300ms延迟？

为了支持双击放大，如果300ms以内有两次点击则触发放大操作，而不是click。chromium较新版本在没有双击放大的页面去掉了click事件的300ms延迟。



#### 详述js异步机制Event Loop，MacroTask和MicroTask

[参考笔记](https://babyshulei.github.io/mybooks/javascript/15-event/01-event-loop.html)



1个主线程+n个任务队列，浏览器异步处理后推入队列，循环处理，一个macroTask后跟全部microtask



每个线程（thread）都有自己的 event loop，所以每个 web worker 都有自己的 event loop，可以独立运行。

但是同域的所有 windows （多个tab打开同一个域名下的页面）共用同一个 event loop，所以它们可以 synchronously communicate。

Event loop 持续运行，它会执行任何排队的 task。



Event Loop 中的事件，分为 MacroTask（宏任务）和 MicroTask（微任务）。

MacroTask: setTimeout, setInterval, setImmediate, requestAnimationFrame, I/O, UI rendering

MicroTask: process.nextTick, Promises, Object.observe, MutationObserver



通俗来说，MacroTasks 和 MicroTasks 最大的区别在它们会被放置在不同的任务调度队列中。

每一次事件循环中，主进程都会先执行一个MacroTask 任务，这个任务就来自于所谓的MacroTask Queue队列；当该 MacroTask 执行完后，Event loop 会立马调用 MicroTask 队列的任务，直到消费完所有的 MicroTask，再继续下一个事件循环。

 

Promise中的then方法的函数会被推入microtasks队列

Macrotask queues就是我们通常说的任务队列，microtask queues会特殊说明

  

事件循环每次只会入栈一个 macrotask ，主线程执行完该任务后又会先检查 microtasks 队列并完成里面的所有任务后再执行 macrotask

  

但是，重点来了

Microtask queue has a higher priority than the macrotask queue.

也就是说js引擎会首先执行完所有microtasks，然后再执行macrotask

 简单来说代码的执行顺序：regular code（同步代码）, then promise handling, then everything else, like events etc.

##### 例题

```javascript
setTimeout(function(){
    console.log(1)
},0);

new Promise(function(resolve){
    console.log(2)
    
    for( var i=0 ; i<10000 ; i++ ){
        i==9999 && resolve()
    }
    
    console.log(3)
}).then(function(){
    console.log(4)
});
console.log(5);

//2 3 5 4 1
```

执行过程大概如下：

- 由于整个 script 也属于一个  macrotask, 所以整个script被推进 macrotask queue，由于会先执行 macrotask  queue 中的第一个任务，再加上promise 构造函数因为是同步的，所以会先打印出2和3
- 然后继续同步执行末尾的 console.log(5) 打印出5
- 此时 setTimeout 被推进到  macrotask queue中， promise.then 回调被推进到 microtask queue 中
- 由于在第一步中已经执行完了第一个 macrotask ,  所以接下来会顺序执行所有的 microtask, 也就是 promise.then 的回调函数，从而打印出4
- microtask 队列中的任务已经执行完毕，继续执行剩下的  macrotask 队列中的任务，也就是 setTimeout, 所以打印出 1



### HTML&DOM

#### classList和dataset分别是什么？

classList类似className，区别是className是空格隔开的字符串，而classList是一个类数组对象，有add、remove、toggle方法。dataset是获取以data-开头的属性的方法。

#### 描述history.pushState的作用。

无刷新的新增一个历史记录，第一个参数是记录绑定的数据，第二个参数是标题(很多浏览器都忽略了)，第三个参数是新的URL。

