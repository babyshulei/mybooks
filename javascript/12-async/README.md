# Promise与异步编程

## 异步编程的背景

- JS引擎建立在**单线程**事件循环上，同一个时刻只能执行一段代码。
- 代码会被放置到**任务队列**（job queue）中，每一段准备被执行，就添加到作业队列中，JS引擎结束当前代码的执行后，**事件循环**就会执行队列中的下一个作业。
- **事件循环**（event loop）是JS引擎的一个内部处理线程，负责监控代码执行并管理任务队列，队列中的任务会从第一个一直执行到最后一个。

### 事件模型

- 事件触发，会向任务队列添加一个新任务，事件处理程序直到事件触发时才会被执行。
- 多个分离异步调用串联在一起，处理就会比较麻烦，需要跟踪每个事件的事件对象等。

### 回调模式

- 回调函数模式类似于事件模型，异步代码会在后面的一个时间点才执行，区别在于回调模式中被调用的函数（即回调函数）是作为参数传入。
- 错误优先（error-first）的回调风格。
- 回调模式比事件模型更灵活，因为通过回调模式链接多个调用更容易。但是，嵌套多层回调函数时，会陷入回调地狱。

## Promise

[Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)是为异步操作的结果所准备的占位符。函数会返回一个Promise，而不必订阅事件或者函数传递一个回调参数。

### Promise 的生命周期

- pending：进行中，未结束的Promise状态，初始状态。
- fullfilled：已完成，已成功结束的Promise状态。
- rejected：已拒绝，已结束但失败的Promise状态。

内部的 [[PromiseState]] 属性被设置为pending、fulfilled、rejected，该属性并未在Promise对象上暴露，可以使用 then() 方法在 Promise 的状态改变时执行一些特定操作。

pending 可以转化为 fulfilled 或 rejected 并且只能**转化一次**，也就是说如果 pending 转化到 fulfilled 状态，那么就不能再转化到 rejected。并且 fulfilled 和 rejected 状态只能由 pending 转化而来，两者之间不能互相转换。

### 创建Promise

#### 未完成的Promise

用 Promise 构造函数可以创建新的Promise，语法：

```js
new Promise(executor)
```

- executor
  初始化Promise代码的执行器（executor）函数。执行器接受两个参数，分别是 resolve() 和 reject() 函数。
  执行器成功完成时调用 resolve() 函数，失败则调用 reject() 函数。

构造函数被调用时，执行器会立刻执行，然后才执行后续流程中的代码。

调用 resolve() 后会触发一个异步操作，传入 then() 与 catch() 方法的函数会被添加到任务队列中并异步执行。

示例：

```js
let promise = new Promise(function(resolve, rejected) {
    console.log('Promise');
    resolve('haha');
});

promise.then((res) => {
    console.log('success', res);
}).catch((err) => {
    console.log('err', err);
});

console.log('Hello!');
// Promise
// Hello!
// success haha
```

#### 已处理的Promise

##### Promise.resolve()

[Promise.resolve()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve) 方法接受一个参数并返回一个完成态的Promise，也就是说不会有任务编排的过程。该 Promise 不存在拒绝状态，所以其拒绝处理程序不会被调用。

##### Promise.reject()

[Promise.reject()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject) 方法接受一个参数并返回一个已拒绝的Promise，该Promise一直处于拒绝态，完成处理函数不会执行。

示例：

```js
let pro1 = Promise.resolve(233);
let pro2 = Promise.reject(7);
pro1
    .then((r) => console.log('succ', r))
    .catch((e) => console.log('err', e));
pro2
    .then((r) => console.log('succ', r))
    .catch((e) => console.log('err', e));
// succ 233
// err 7
```

> 如果向 Promise.resolve() 或 Promise.reject() 方法传入一个 Promise，那么这个 Promise 会被直接返回。

##### 非Promise的Thenable对象

Promise.resolve()与Promise.reject()都能接受非Promise的Thenbale对象作为参数，这种情况下，这些方法会创建一个新的Promise，在then()函数中被调用。

一个对象拥有一个能接受resolve和reject参数的then()方法，该对象就是一个非Promise的Thenable。

示例：

```js
// 已完成
let thenable = {
    then: function(resovle, reject) {
        console.log('hi');
        resovle(42); 
    }
};
let p1 = Promise.resolve(thenable);
p1.then(function(value) {
    console.log(value); // 42
});

// 已拒绝
let thenable2 = {
    then: function(resolve, reject) {
        console.log('reject');
        reject(30);
    }
};
let p2 = Promise.resolve(thenable2);
p2.catch(function(value) {
    console.log(value); // 30
});
```

### Promise 方法

#### Promise.prototype.then()

[then()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) 方法返回一个 Promise，当 Promise 状态改变时，调用 then() 方法对应的回调函数。

语法：

```js
p.then(onFulfilled[, onRejected]);
```

参数：

- onFulfilled
  可选参数，Promise 成功时的回调函数
- onRejected
  可选参数，Promise 被拒绝时的回调函数

> 如果一个对象实现了上述的 then() 方法，那这个对象就被称为 thenable 对象。



#### Promise.prototype.catch()

[catch()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) 方法返回一个 Promise，行为等同于只传递拒绝处理函数给 then()。

语法：

```js
p.catch(onRejected);
```

参数：

- onRejected
  Promise 被拒绝时的回调函数

如果不给 Promise 添加拒绝处理程序，那所有的失败就自动被忽略了。

每次调用then()和catch()都会创建一个新任务，它会在Promise已决议时被执行。

```js
var promise = new Promise((resolve, rejected) => {
    console.log('hi');
    resolve(42);
});
promise.then((res) => {
    console.log('success', res);
}, (err) => {
    console.log('error', err);
});
// hi
// success 42
```

其他：

- Promise.prototype.finally()
- Promise.all()
- Promise.race()

### 执行器错误

在执行器内部抛出了错误，Promise的拒绝处理函数就会被调用。

每个执行器之内并没有显式的try-catch，错误就被捕捉并传递给了拒绝处理函数。

## Async/Await

### Async/Await 简介

- async/await是写异步代码的新方式，优于回调函数和Promise。
- async/await是基于Promise实现的，它不能用于普通的回调函数。
- async/await与Promise一样，是非阻塞的。
- async/await使得异步代码看起来像同步代码，再也没有回调函数。但是改变不了JS单线程、异步的本质。

### Async/Await 语法

- 使用await，函数必须用async标识
- await后面跟的是一个Promise实例
- 需要安装babel-polyfill，安装后记得引入 `npm i --save-dev babel-polyfill`

```js
function loadImg(src) {
  const promise = new Promise(function(resolve, reject) {
    const img = document.createElement('img');
    img.onload = function() {
      resolve(img);
    };
    img.onerror = function() {
      reject('图片加载失败');
    };
    img.src = src;
  })
  return promise;
}
const src1 = 'https://www.imooc.com/static/img/index/logo_new.png';
const src2 = 'https://img1.mukewang.com/545862fe00017c2602200220-100-100.jpg';
const load = async function() {
  const result1 = await loadImg(src1);
  console.log(result1);
  const result2 = await loadImg(src2);
  console.log(result2);
}
load();
```

当函数执行的时候，一旦遇到 await 就会先返回，等到触发的异步操作完成，再接着执行函数体内后面的语句。



## 参考链接

[异步解决方案----Promise与Await](https://github.com/ljianshu/Blog/issues/13)

[Promise - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

