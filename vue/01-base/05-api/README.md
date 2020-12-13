# 全局 API

## Vue.nextTick

[Vue.nextTick([callback, context])](https://cn.vuejs.org/v2/api/index.html#Vue-nextTick)

参数：

- `{Function} [callback]`：回调函数

- `{Object} [context]`：执行函数上下文

用法：

在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

```js
// 修改数据
vm.msg = 'Hello'
// DOM 还没有更新
Vue.nextTick(function () {
  // DOM 更新了
})

// 作为一个 Promise 使用 (2.1.0 起新增，详见接下来的提示)
Vue.nextTick()
  .then(function () {
    // DOM 更新了
  })
```

我们可以理解成，`Vue` 在更新 `DOM` 时是异步执行的。当数据发生变化，`Vue`将开启一个异步更新队列，视图需要等队列中所有数据变化完成之后，再统一进行更新。

### 使用场景

如果想要在修改数据后立刻得到更新后的`DOM`结构，可以使用Vue.nextTick()。

组件内部使用可以通过 `this.$nextTick()`，并且回调函数中的 `this` 将自动绑定到当前的 `Vue` 实例上。

```js
this.message = '修改后的值'
console.log(this.$el.textContent) // => '原始的值'
this.$nextTick(function () {
    console.log(this.$el.textContent) // => '修改后的值'
})
```

`$nextTick()` 会返回一个 `Promise` 对象，可以是用`async/await`完成相同作用的事情。

```js
this.message = '修改后的值'
console.log(this.$el.textContent) // => '原始的值'
await this.$nextTick()
console.log(this.$el.textContent) // => '修改后的值'
```

### 实现原理

“下次 DOM 更新周期”的意思其实是下次微任务执行时更新 DOM。调用vm.$nextTick 其实是将回调添加到微任务中。只有在特殊情况下才会降级成宏任务，默认会添加到微任务中。

在一轮事件循环中，vm.$nextTick 只会向任务队列添加一个任务，多次使用 vm.$nextTick 只会将回调添加到回调列表中缓存起来。当任务触发时，依次执行列表中的所有回调并清空列表。

vm.$nextTick和Vue.nextTick是相同的，其具体实现抽成了一个nextTick方法，放在`src/core/util/next-tick.js`中。

```typescript
const callbacks = [];
let pending = false;

export function nextTick(cb?: Function, ctx?: Object) {
  let _resolve;

  // cb 回调函数会经统一处理压入 callbacks 数组
  callbacks.push(() => {
    if (cb) {
      // 给 cb 回调函数执行加上了 try-catch 错误处理
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });

  // 执行异步延迟函数 timerFunc
  if (!pending) {
    pending = true;
    timerFunc();
  }

  // 当 nextTick 没有传入函数参数的时候，返回一个 Promise 化的调用
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve;
    });
  }
}
```

数组callbacks用来存储用户注册的回调，变量pending用来标记是否已经向任务队列中添加了一个任务。每当向任务队列中插入任务时，将pending设置为true，当任务被执行时将pending设置为false，这样就可以通过pending的值来判断是否需要向任务队列中添加任务。

`timerFunc`函数，作用是将 flushCallbacks 添加到任务队列中，分别有：`Promise.then`、`MutationObserver`、`setImmediate`、`setTimeout`。根据当前环境支持什么方法则确定调用哪个，优先加入微任务队列，环境不支持则降级为宏任务。

```ts
export let isUsingMicroTask = false
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  //判断1：是否原生支持Promise
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    if (isIOS) setTimeout(noop)
  }
  isUsingMicroTask = true
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  //判断2：是否原生支持MutationObserver
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  //判断3：是否原生支持setImmediate
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  //判断4：上面都不行，直接用setTimeout
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}
```

无论是微任务还是宏任务，都会放到`flushCallbacks`中使用。flushCallbacks函数可以理解为被注册的那个任务。当这个函数被触发时，会将 callbacks 中的所有函数依次执行，然后清空 callbacks，并将 pending 设置为 false。也就是说，一轮事件循环中 flushCallbacks 只会执行一次。

```js
function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}
```



## 参考链接

[全局API-官方文档](https://cn.vuejs.org/v2/api/index.html#%E5%85%A8%E5%B1%80-API)

[Vue中的$nextTick怎么理解?](https://mp.weixin.qq.com/s?__biz=MzU1OTgxNDQ1Nw==&mid=2247484360&idx=1&sn=d505ec934b88d7108cac139b3b047024)

[《深入浅出Vue.js》13.3节]()