# Vue 组件通信

- props
- vuex
- $emit, $on
- provide, inject
- $attrs, $listeners
- $parent, $child, ref
- eventBus

## Event Bus

在Vue中的使用：

```js
// eventBus.js
import Vue from 'vue';

export default new Vue();
```

组件中引入：

```js
import eventBus from eventBus.js;

// ...
eventBus.$on(name, fn);
// 当前组件or其他组件触发
eventBus.$emit(name);
```

简单实现：

```js
class EventBus {
    constructor() {
        this.event = Object.create(null);
    }
    // 注册事件
    on(name, fn) {
        if (!this.event[name]) {
            this.event[name] = [];
        }
        this.event[name].push(fn);
    }
   	// 触发事件
    emit(name, ...args) {
        this.event[name]?.forEach((fn) => {
            fn && fn(...args);
        });
    }
    // 只被触发一次的事件
    once(name, fn) {
        const cb = (...args) => {
            fn(...args);
            this.off(name, cb);
        }
        this.on(name, cb);
    }
    // 关闭事件
    off(name, fn) {
        if (this.event[name]) {
            const idx = this.event[name].indexOf(fn);
            if (idx > -1) {
                this.event[name].splice(idx, 1);
            }
            if (!this.event[name].length) {
                delete this.event[name];
            }
        }
    }
}
```



## 参考链接

[vue通信方法EventBus的实现- 掘金](https://juejin.im/post/5cfcf29ef265da1ba647df38)

[详解Object.create(null)](https://juejin.im/post/5acd8ced6fb9a028d444ee4e)

