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







## Promise







## 隐式类型转换

### 设计一个数据结构，使 `a==1 && a==2 && a==3` 为 true

隐式类型转换

### 使`a===1 && a===2 && a===3` 为 true

Object.defineProperty

参考笔记：JavaScript-基本概念

<https://blog.csdn.net/Bule_daze/article/details/103470176>



## 参考链接

[JavaScript 异步 - jsliang](https://github.com/LiangJunrong/document-library/blob/master/系列-面试资料/JavaScript/异步系列/README.md#chapter-three)

