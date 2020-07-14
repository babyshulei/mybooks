# Promise与异步编程

## 异步编程的背景

- JS引擎建立在单线程事件循环上，同一个时刻只能执行一段代码。
- 代码会被放置到作业队列里（job queue），每一段准备被执行，就添加到作业队列中，JS引擎结束当前代码的执行后，事件循环就会执行队列中的下一个作业。
- 事件循环（event loop）是JS引擎的一个内部处理线程，能监视代码的执行并管理作业队列，作业会从队列的第一个开始，依次运行到最后一个。

### 事件模型

- 事件触发，新的作业会被添加到作业尾部，事件处理代码直到事件发生后才会被执行。
- 多个分离异步调用串联在一起，处理就会比较麻烦，需要最终每个事件的事件对象等。

### 回调模式

- 回调函数模式类似于事件模型，异步代码会在后面的一个时间点才执行，不同处在于需要调用的函数（即回调函数）作为参数传入。
- 错误优先（error-first）的回调风格。
- 嵌套多层回调函数时，会陷入回调地狱。

## Promise

Promise是为异步操作的结果所准备的占位符。函数可以返回一个Promise，而不必订阅事件或者函数传递一个回调参数。

### Promise 的生命周期

- pending: 挂起，未结束的Promise状态，初期状态
- fullfilled: 已完成，已成功结束的Promise状态
- rejected: 已拒绝，已结束但失败的Promise状态

内部的[[PromiseState]]属性被设置为pending、fulfilled、rejected，该属性并未在Promise对象上暴露，可以使用 then() 方法在 Promise 的状态改变时执行一些特定操作。

pending 可以转化为 fulfilled 或 rejected 并且只能**转化一次**，也就是说如果 pending 转化到 fulfilled 状态，那么就不能再转化到 rejected。并且 fulfilled 和 rejected 状态只能由 pending 转化而来，两者之间不能互相转换。

### Promise 语法

**then()方法**：

在所有的Promise上存在，并且接受两个参数，成功时的回调函数以及被拒绝时的回调函数，均可选。用这种方式实现的then()方法的任何对象都被称为一个thenable。

**catch()方法**：

行为等同于只传递拒绝处理函数给then()。

每次调用then()和catch()都会创建一个新的作业，它会在Promise已决议时被执行

```js
var promise = new Promise((resolve, rejected) => {
    console.log('hi');
    resolve(42);
});
promise.then((res) => {
    console.log(res);
}, (err) => {
    console.log(err);
});
// hi
// 42
```

- Promise.resolve()
- Promise.reject()
- 链式调用
- Promise.all()
- Promise.race()



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