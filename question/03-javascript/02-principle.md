# 原理&实现

## EventLoop

### 1. JavaScript代码的执行机制？

参考笔记：JavaScript-异步

JavaScript是单线程的，同一时刻只能执行一段代码。代码顺序执行。

#### 单线程的优缺点？解决方案？为什么不设计成多线程？

优点：实现相对简单、执行环境相对单纯。缺点：任务耗时很长时，会出现页面卡死。

解决方案：异步。

为了避免多线程处理状态不同步的问题。单线程可以保证（DOM）状态的可靠性。

#### 如何实现异步？

回调、事件监听、发布/订阅、Promise、async/await


### 2. 详述js异步机制Event Loop，MacroTask和MicroTask

参考笔记：JavaScript-异步-Event Loop

1个主线程+n个任务队列，浏览器异步处理后推入队列，循环处理，一个macroTask后跟全部microtask

Event Loop 执行过程：
1. 一开始整个脚本 script 作为一个宏任务执行
2. 执行过程中，同步代码直接执行，宏任务进入宏任务队列，微任务进入微任务队列。
3. 当前宏任务执行完出队，检查微任务列表，有则依次执行，直到全部执行完毕。
4. 执行浏览器 UI 线程的渲染工作。
5. 检查是否有 Web Worker 任务，有则执行。
6. 执行完本轮的宏任务，回到步骤 2，依次循环，直到宏任务和微任务队列为空。

### 3. 请输出下面代码打印情况

#### 3.1 

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

打印：2 3 5 4 1

执行过程大概如下：

- 由于整个 script 也属于一个  macrotask, 所以整个script被推进 macrotask queue，由于会先执行 macrotask  queue 中的第一个任务，再加上promise 构造函数因为是同步的，所以会先打印出2和3
- 然后继续同步执行末尾的 console.log(5) 打印出5
- 此时 setTimeout 被推进到  macrotask queue中， promise.then 回调被推进到 microtask queue 中
- 由于在第一步中已经执行完了第一个 macrotask ,  所以接下来会顺序执行所有的 microtask, 也就是 promise.then 的回调函数，从而打印出4
- microtask 队列中的任务已经执行完毕，继续执行剩下的  macrotask 队列中的任务，也就是 setTimeout, 所以打印出 1

#### 3.2

```js
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('script end');
```

打印：

```
script start
script end
promise1
promise2
setTimeout
```

过程：

- 先执行同步代码，输出：`script start` -> `script end`。
- 然后调用微任务，输出 `promise1`，将 `then(promise2)` 放入微任务。
- 再次调用微任务，将 `promise2` 输出。
- 最后调用宏任务 `setTimeout`，输出 `setTimeout`。

#### 3.3

```js
setTimeout(function() {
  console.log(4);
}, 0);

const promise = new Promise((resolve) => {
  console.log(1);
  for (var i = 0; i < 10000; i++) {
    i == 9999 && resolve();
  }
  console.log(2);
}).then(function() {
  console.log(5);
});

console.log(3);
```

打印：

```
1 2 3 5 4
```

分析：

`script` 下：

- 同步任务：`console.log(1)`、`console.log(2)`、`console.log(3)`。
- 微任务：`Promise.then()`（等到 9999 再添加进来）
- 宏任务 `setTimeout`

所以先走同步任务，注意当我们 `new Promsie()` 的时候，内部的代码会执行的，跟同步任务一样的，而 `.then()` 在 `resolve()` 的情况下才会添加到微任务。

因此先输出 `1 -> 2 -> 3`。

然后推出微任务 `Promise.then()`，所以输出 5。

最后推出宏任务 `setTimeout`，输出 4。

#### 3.4

```js
setTimeout(function () {
  console.log('timeout1');
}, 1000);

console.log('start');

Promise.resolve().then(function () {
  console.log('promise1');
  Promise.resolve().then(function () {
    console.log('promise2');
  });
  setTimeout(function () {
    Promise.resolve().then(function () {
      console.log('promise3');
    });
    console.log('timeout2')
  }, 0);
});

console.log('done');
```

打印：

```
start
done
promise1
promise2
timeout2
promise3
timeout1
```

#### 3.5

```js
console.log("script start");

setTimeout(function() {
  console.log("setTimeout---0");
}, 0);

setTimeout(function() {
  console.log("setTimeout---200");
  setTimeout(function() {
    console.log("inner-setTimeout---0");
  });
  Promise.resolve().then(function() {
    console.log("promise5");
  });
}, 200);

Promise.resolve()
.then(function() {
  console.log("promise1");
})
.then(function() {
  console.log("promise2");
});

Promise.resolve().then(function() {
  console.log("promise3");
});

console.log("script end");
```

打印：

```
script start
script end
promise1
promise3
promise2
setTimeout---0
setTimeout---200
promise5
inner-setTimeout---0
```

#### 3.6

```js
console.log(1);

setTimeout(() => {
  console.log(2);

  new Promise((resolve) => {
    console.log(3);
  }).then(() => {
    console.log(4);
  });
}, 200);

new Promise((resolve) => {
  console.log(5);
  resolve();
}).then(() => {
  console.log(6);
});

setTimeout(() => {
  console.log(7);
}, 0);

setTimeout(() => {
  console.log(8);

  new Promise(function (resolve) {
    console.log(9);
    resolve();
  }).then(() => {
    console.log(10);
  });
}, 100);

new Promise(function (resolve) {
  console.log(11);
  resolve();
}).then(() => {
  console.log(12);
});

console.log(13);
```

打印：

```
1 5 11 13 6 12 7 8 9 10 2 3
```

#### 3.7

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}
```

打印：

```
3 3 3
```

分析：

1. 走同步任务，`var i` 遍历走完，`i = 3`（`var` 变量污染）。
2. `for()` 遍历的同时，将 3 个 `setTimeout` 塞进了宏任务中。
3. `script` 这个宏任务执行完毕。
4. 依次执行 3 个 `setTimeout`，因为此时 `i` 为 `3`，所以会依次输出 3 个 3。

## Promise

### 1. 请输出下面代码打印情况

#### 1.1

```js
const promise1 = new Promise((resolve, reject) => {
  console.log('promise1');
  resolve('resolve1');
})

const promise2 = promise1.then((res) => {
  console.log(res);
});

console.log('1', promise1);
console.log('2', promise2);
```

打印：

```
promise1
1 Promise {<fullfilled>: "resolve1"}
2 Promise {<pending>}
resolve1
```

分析：

1. 碰到 new Promise，输出 promise1
2. 碰到 resolve，改变 Promise 状态，并保存结果
3. 碰到 promise1.then，放进微任务队列
4. promise2 是一个新的状态为 pending 的 Promise
5. 输出 1 和 promise1，当前 promise1 的状态`[[PromiseState]]`为 fullfilled，结果`[[PromiseResult]]`为 resolve1
6. 输出 2 和 promise2，当前 promise2 的状态为 peding
7. 宏任务走完，执行微任务，输出 resolve1

#### 1.2

```js
console.log('start');

setTimeout(() => {
  console.log('time');
});

Promise.resolve().then(() => {
  console.log('resolve');
});

console.log('end');
```

打印：

```
start
end
resolve
time
```

分析：

  1. 首先执行 script
  2. 输出 'start'
  3. 碰到 setTimeout，丢进宏任务队列
  4. 碰到 Promise，然后 Promise 变成 resolve() 状态后，执行了 .then()，所以丢进微任务队列
  5. 输出 'end'
  6. 遍历本次的微任务队列，输出步骤 4 的内容，即 'resolve'
  7. 步骤 6 走完，执行下一个宏任务队列，输出 'time'

#### 1.3

```js
const promise = new Promise((resolve, reject) => {
  console.log(1);
  
  setTimeout(() => {
    console.log('timerStart');
    resolve('success');
    console.log('timerEnd');
  }, 0);

  console.log(2);
});

promise.then((res) => {
  console.log(res);
});

console.log(4);
```

打印：

```
1
2
4
timerStart
timerEnd
success
```

分析：

1. 首先执行 script 这个宏任务
2. 碰到 new Promise，输出 1
3. 碰到 setTimeout，放进宏任务队列
4. 输出 2
5. 碰到 .then()，但是没有钥匙（resolve），跳过
6. 输出 4
7. 当前没有微任务，执行下一个宏任务 setTimeout
8. 输出 'timerStart'
9. Promise 碰到 resolve，改变状态，表明 .then() 可以放进微任务了
10. 输出 'timerEnd'
11. 执行宏任务 setTimeout 下的微任务，即 Promise.then()
12. 输出 'success'

#### 1.4

```js
Promise.resolve().then(() => {
  console.log('promise1');
  const timer2 = setTimeout(() => {
    console.log('timer2');
  }, 0);
});

const timer1 = setTimeout(() => {
  console.log('timer1');
  Promise.resolve().then(() => {
    console.log('promise2');
  });
}, 0);

console.log('start');
```

打印：

```
start
promise1
timer1
promise2
timer2
```

分析：

1. 首先执行 script 这个宏任务
3. 碰到 Promise.then()，将其推进微任务队列，注意不会执行里面内容
4. 碰到 timer1，将其推进宏任务队列
5. 输出 'start'
6. 查看 script 中的微任务队列，发现 Promise.then()，将其推出执行
7. 输出 'promise1'
8. 碰到 timer2，将其推进宏任务队列
9. script 没有剩余的微任务，所以继续遍历宏任务
10. 发现队列 [timer1, timer2]，根据队列先进先出原则，推出 timer1
11. 输出 'timer1'，发现微任务 Promise.then()，将其推进 timer1 的微任务队列
12. 输出 'promise2'
13. 继续执行宏任务队列，出队 timer2，输出 'timer2'

#### 1.5

```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
  }, 0);
});

const promise2 = promise1.then(() => {
  throw new Error('error!');
});

console.log('promise1-1', promise1);
console.log('promise2-1', promise2);

setTimeout(() => {
  console.log('promise1-2', promise1);
  console.log('promise2-2', promise2);
}, 0);
```

打印：

```
promise1-1 Promise { <pending> }
promise2-1 Promise { <pending> }
promise1-2 Promise { <fullfilled>: 'success' }
promise2-2 Promise { <rejected>: Error: error! }
```

> 注意：在 Node v10.16.0 上运行结果不太相同

分析：

1. 首先执行 script 这个宏任务
3. 碰到 promise1 这边，执行 new Promise 里面内容，将带 resolve 的 setTimeout 推入宏任务队列
4. 碰到 promise2，因为还没有进入 resolve 状态，所以这里不理会
5. 连续两行输出，因为 promise1 和 promise2 都尚未处理，所以是 pending 状态
6. 碰到第二个 setTimeout，将其推入宏任务队列
7. 查看宏任务队列，推出第一个 setTimeout，将 Promise 状态改为 resolve
8. 执行 promise2，改变 promise2 的状态为 reject
9. 第一个 setTimeout 执行完毕，执行第二个 setTimeout
10. 输出步骤 8 和 步骤 9 中的 Promise 状态

#### 1.6

```js
const promise = new Promise((resolve, reject) => {
  resolve('success1');
  reject('error');
  resolve('success2');
});

promise.then((res) => {
  console.log('then1: ', res);
}).then((res) => {
  console.log('then2: ', res);
}).catch((error) => {
  console.log('catch: ', error);
});
```

打印：

```
then1: success1
then2: undefined
```

分析：

1. 执行了 resolve('success1') 后，改变了状态为 resolve，不再理会 new Promise 后面的
2. 将第 1 个 .then() 添加到微任务
3. 执行第 1 个 .then()，将第 2 个 .then() 推进微任务

#### 1.7

```js
const promise = new Promise((resolve, reject) => {
  reject('error');
  resolve('success2');
});

promise.then((res) => {
  console.log('then1: ', res);
}).then((res) => {
  console.log('then2: ' ,res);
}).catch((error) => {
  console.log('catch: ', error);
}).then((res) => {
  console.log('then3: ', res);
})

/**
  执行顺序和分析：
  顺序：
    * 'catch:  error'
    * 'then3:  undefined'
  分析：
    1. 碰到 new Promise()，将 reject('error') 执行，改变 Promise 的状态
    2. 碰到 .catch()，将其推进微任务
    3. 执行 .catch() 里面内容，输出 'catch: error'，然后 return Promise {<pending>}
    4. 执行下一个微任务 .then()，输出 then3: undefined
*/
```

#### 1.8

```js
Promise
.reject(1)
.then((res) => {
  console.log(res);
  return 2;
}).catch((err) => {
  console.log(err);
  return 3;
}).then((res) => {
  console.log(res);
});

/**
  执行顺序和分析：
  顺序：
    * 1
    * 3
  分析：
    1. reject(1) 会走 .catch，所以先输出 1
    2. return 3 会被包装成 resolve(3)
    3. 所以继续走第 2 个 .then，输出 3
*/
```

#### 1.9

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('timer');
    resolve('success');
  }, 0);
});

const start = Date.now();

promise.then((res) => {
  console.log(res, Date.now() - start);
});

promise.then((res) => {
  console.log(res, Date.now() - start);
});

/**
  执行顺序和分析：
  顺序：
    * 'timer'
    * 'success 4'
    * 'success 4'
  注释：也有 3/4 或者 4/5 的情况
  分析：
    1. new Promise 将 setTimeout 添加进宏任务
    2. 执行完宏任务 script，然后就执行 setTimeout
    3. 输出 'timer'
    4. 标记 Promise 状态为 resolve
    5. 将第一个 .then() 放进微任务
    6. 将第二个 .then() 放进微任务
    7. 因为步骤 5 和步骤 6 的时候，这两者都是相同 resolve 值，所以都是 'success'
    8. 输出 success 4
    9. 输出 success 4
    10. 如果执行比较慢，那么这两个输出的值会不一致。例如 3、4
*/
```

#### 1.10

```js
const promise = Promise.resolve().then(() => {
  return promise;
});

promise.catch((err) => {
  console.log(err);
});

/**
  执行顺序和分析：
  顺序：
    * TypeError: Chaining cycle detected for promise #<Promise>
  分析：
    不能返回 promise 本身，会造成死循环
*/
```

#### 1.11

```js
Promise
.resolve(1)
.then(2)
.then(Promise.resolve(3))
.then(console.log);

/**
  执行顺序和分析：
  顺序：
    * 1
  分析：
    1. .then 和 .catch 的参数希望是函数，传入非函数会发生值透传
    2. 值透传导致第 1 个 then 和第 2 个 then 传入的都不是函数，导致它传到最后的 1 个 then 里面
*/
```





## 隐式类型转换

### 1. 设计一个数据结构，使 `a==1 && a==2 && a==3` 为 true

隐式类型转换

#### 使`a===1 && a===2 && a===3` 为 true

Object.defineProperty

参考笔记：JavaScript-基本概念

<https://blog.csdn.net/Bule_daze/article/details/103470176>



## 参考链接

[JavaScript 异步 - jsliang](https://github.com/LiangJunrong/document-library/blob/master/系列-面试资料/JavaScript/异步系列/README.md#chapter-three)

