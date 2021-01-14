# Promise、Await

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

#### Promise.prototype.finally()

[finally() 方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally)返回一个Promise。在Promise结束时，无论结果是fulfilled或者是rejected，都会执行指定的回调函数。

finally() 方法的回调函数不接受任何的参数，也就是说在 finally() 函数中是没法知道 Promise 最终的状态是 resolved 还是 rejected 的。

它最终返回的默认会是一个上一次的 Promise 对象值。

#### Promise.all()

[Promise.all()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) 方法接受一个参数并返回一个 Promise，常用于等待多个异步并发任务完成。

语法：

```js
Promise.all(iterable);
```

参数：

- iterable
  含有多个Promise的可迭代对象。

当 iterable 参数内所有的 Promise 都被完成（resolved） 时，返回的Promise才会被完成，返回的Promise传入的结果是一个包含每个解决值的数组，按照传入参数数组中的Promise顺序存储。

iterable 参数中只要有一个 Promise 被拒绝（rejected），那么返回的Promise会立即被拒绝，失败的原因是第一个失败 Promise 的结果。

#### Promise.race()

[Promise.race()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/race) 方法接受一个迭代器参数并返回一个 Promise，一旦迭代器中的某个Promise被解决或拒绝，返回的 promise 就会被解决或拒绝。

实际上，传给 Promise.race() 方法的 Promise 会进行竞选，以决出哪一个先被解决，如果先解决的是已完成的 Promise，则返回已完成的 Promise；如果先解决的是已拒绝的 Promise，则返回已拒绝的 Promise。

### 执行器错误

在执行器内部抛出了错误，Promise的拒绝处理函数就会被调用。

每个执行器之内并没有显式的try-catch，错误就被捕捉并传递给了拒绝处理函数。

### 全局的Promise拒绝处理

Promise 被拒绝时若缺少拒绝处理函数，就会静默失败。

Promise的特性决定了很难检测一个Promise是否被处理过。

#### Node.js的拒绝处理

在 Node.js 中，处理Promise拒绝时会触发 process 对象上的两个事件：

- unhandledRejection
  在一个**事件循环中**，当 Promise 被拒绝，并且**没有提供拒绝处理程序**时，触发该事件。
  事件处理函数接受两个参数：错误对象、被拒绝的Promise
- rejectionHandled
  在一个**事件循环后**，当 Promise 被拒绝时，若**拒绝处理程序被调用**，触发该事件。
  事件处理函数接受一个参数：被拒绝的Promise

示例：

```js
let rejected;

process.on('unhandledRejection', (reason, promise) => {
    console.log('unhandled', reason.message);
    console.log(rejected === promise);
});

process.on('rejectionHandled', (promise) => {
    console.log('handled', rejected === promise);
});

rejected = Promise.reject(new Error('Node test'));

setTimeout(() => {
    rejected.catch(() => {
        console.log('reject handler');
    });
}, 3000);
// unhandled Node test
// true
/*** 3000ms后 ***/
// reject handler
// handled true
```

利用这两个事件编写的简单的未处理拒绝跟踪器：

```js
let possiblyUnhandledRejections = new Map();

// 未处理的被拒绝Promise加入列表
process.on('unhandledRejection', (reason, promise) => {
    possiblyUnhandledRejections.set(promise, reason);
});

// 已处理的被拒绝Promise移出列表
process.on('rejectionHandled', (promise) => {
    possiblyUnhandledRejections.delete(promise);
});

setInterval(() => {
    possiblyUnhandledRejections.forEach((reason, promise) => {
        console.log(reason.message ? reason.message : reason);
        // 处理未处理的被拒绝Promise
        handleRejection(promise, reason);
    });
    possiblyUnhandledRejections.clear();
}, 60000);
```

#### 浏览器环境的拒绝处理

浏览器也是通过触发两个事件来识别未处理的拒绝的，和 Node.js 等效，但是在 window 对象上触发的。

- [unhandledrejection](https://developer.mozilla.org/zh-CN/docs/Web/Events/unhandledrejection)
  在一个**事件循环中**，当 Promise 被拒绝，并且**没有提供拒绝处理程序**时，触发该事件。
- [rejectionhandled](https://developer.mozilla.org/en-US/docs/Web/API/Window/rejectionhandled_event)
  在一个**事件循环后**，当 Promise 被拒绝时，若**拒绝处理程序被调用**，触发该事件。

浏览器中，事件处理函数接受一个事件对象，这两个事件的事件对象上有如下属性：

- type：事件名称（unhandledrejection、rejectionhandled）
- promise：被拒绝的Promise对象
- reason：来着Promise的拒绝值

### 串联Promise

每次调用 then() 方法或 catch() 方法时实际上创建并返回了另一个 Promise，只有当第一个 Promise 完成或被拒绝后，第二个才会被解决。

Promise链可以用来捕获前一个Promise的完成或拒绝处理程序中发生的错误。

Promise链可以给下游的Promise传递数据，如果在处理程序中返回一个值，这个值会被传递。如果返回的是 Promise 对象，会根据这个Promise的处理来确定后续的程序执行。

示例：

```js
let pp1 = new Promise((resolve, reject) => {
    resolve(22);
});

let pp2 = new Promise((resolve, reject) => {
    reject(new Error('rejected!'));
});

pp1.then((val) => {
    console.log(1, val);
    return pp2;
}).then((v) => {
    console.log(2, v);
}).catch((e) => {
    console.log(3, e.message);
});

// 1 22
// 3 rejected!
```



## Async/Await

### Async/Await 简介

- async/await是写异步代码的新方式，优于回调函数和Promise。
- async/await是基于Promise实现的，它不能用于普通的回调函数。
- async/await与Promise一样，是非阻塞的。
- async/await使得异步代码看起来像同步代码，再也没有回调函数。但是改变不了JS单线程、异步的本质。

### Async/Await 语法

- 使用[await](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await)，函数必须用[async](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)标识
- await后面跟的是一个Promise实例
- 在 function() 里面碰到 await 直接走里面内容。如果 function() 里的 await 后面还有其他代码，将其当做 Promise.then() 一样，视为微任务。
- 需要安装babel-polyfill，安装后记得引入 `npm i --save-dev babel-polyfill`

语法：

```js
async function 函数名() {
  [返回值] = await 表达式;
}
```

参数：
- 表达式
一个 Promise 对象或者任何要等待的值。
- 返回值
返回 Promise 对象的处理结果。如果等待的不是 Promise 对象，则返回该值本身。

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

